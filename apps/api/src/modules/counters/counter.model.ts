import { model, Schema } from 'mongoose';

export interface Counter {
  key: string;
  value: number;
}

const counterSchema = new Schema<Counter>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    value: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const CounterCollection = model<Counter>('counters', counterSchema);
