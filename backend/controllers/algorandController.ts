import type { Request, Response } from "express";
import algosdk from "algosdk";
import Transaction from "../models/Transaction.js";

const ALGOD_SERVER = process.env.ALGOD_SERVER!;
const ALGOD_PORT = Number(process.env.ALGOD_PORT!) || 443;
const ALGOD_TOKEN = process.env.ALGOD_TOKEN ?? "";

const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT);

export const sendAlgo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { senderMnemonic, to, amount, note } = req.body as {
      senderMnemonic: string;
      to: string;
      amount: number;
      note?: string;
    };

    if (!senderMnemonic || !to || !amount) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const senderAccount = algosdk.mnemonicToSecretKey(senderMnemonic);

    const params = await algodClient.getTransactionParams().do();

    const txnParams: algosdk.PaymentTransactionParams & algosdk.CommonTransactionParams = {
      sender: senderAccount.addr,
      receiver: to,
      amount: Math.floor(amount * 1e6),
      suggestedParams: params,
    };

    if (note) txnParams.note = new TextEncoder().encode(note);

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject(txnParams);
    const signedTxn = txn.signTxn(senderAccount.sk);

    const sendResult: algosdk.modelsv2.PostTransactionsResponse = await algodClient.sendRawTransaction(signedTxn).do();

    const txId: string = sendResult.txid;

    if (!txId) {
      throw new Error("Transaction failed: no txid returned");
    }

    const record = await Transaction.create({
      txId,
      from: senderAccount.addr,
      to,
      amount,
      status: "pending",
      note,
    });


    res.status(200).json({ txId, record });
    
  } catch (error: unknown) {
    console.error("sendAlgo error:", error);
    if (error instanceof Error) res.status(500).json({ error: error.message });
    else res.status(500).json({ error: "Unexpected error" });
  }
};

export const getTxStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { txId } = req.params as { txId: string };

    const info = await algodClient.pendingTransactionInformation(txId).do();

    if (info.confirmedRound) {
      await Transaction.findOneAndUpdate(
        { txId },
        { status: "confirmed", confirmedRound: info.confirmedRound }
      );
    }

    res.status(200).json(info);
  } catch (error: unknown) {
    console.error(" getTxStatus error:", error);
    if (error instanceof Error) res.status(500).json({ error: error.message });
    else res.status(500).json({ error: "Unexpected error" });
  }
};

export const listTransactions = async (_req: Request, res: Response): Promise<void> => {
  try {
    const txs = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json(txs);
  } catch (error: unknown) {
    console.error("listTransactions error:", error);
    if (error instanceof Error) res.status(500).json({ error: error.message });
    else res.status(500).json({ error: "Unexpected error" });
  }
};
