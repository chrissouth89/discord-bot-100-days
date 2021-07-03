import { Document, model, Schema } from "mongoose";

export interface CoderInt {
  discordId: string;
  round: number;
  day: number;
  timestamp: number;
}

export const Coder = new Schema({
  discordId: String,
  round: Number,
  day: Number,
  timestamp: Number,
});

export default model<CoderInt>("coder", Coder);
