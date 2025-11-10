import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  txId: string;
  from: string;
  to: string;
  amount: number;
  status: string;
  note?: string;
  confirmedRound?: number;
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  txId: { type: String, required: true, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "pending" },
  note: String,
  confirmedRound: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
