import mongoose, { Schema, model } from "mongoose";

// Interface for Spell
export interface Spell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string[];
  duration: string;
  description: string;
}

// Schema
const spellSchema = new Schema<Spell>({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  school: { type: String, required: true },
  castingTime: { type: String, required: true },
  range: { type: String, required: true },
  components: { type: [String], required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

// `SpellModel` will have `name: string`, etc.
export const SpellModel = model<Spell>('Spell', spellSchema);