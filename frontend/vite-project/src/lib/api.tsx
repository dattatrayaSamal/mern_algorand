import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export interface SendAlgoPayload {
  senderMnemonic: string;
  to: string;
  amount: number;
  note?: string;
}

export interface Transaction {
  txId: string;
  from: string;
  to: string;
  amount: number;
  status: string;
  note?: string;
  createdAt: string;
  confirmedRound?: number;
}

export const sendAlgo = async (data: SendAlgoPayload) => {
  const res = await API.post<{ txId: string }>("/algorand/send", data);
  return res.data;
};

export const getTxStatus = async (txId: string) => {
  const res = await API.get<{ status: string; confirmedRound?: number }>(`/status/${txId}`);
  return res.data;
};

export const listTransactions = async () => {
  const res = await API.get<Transaction[]>("/transactions");
  return res.data;
};
