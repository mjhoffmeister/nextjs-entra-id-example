import mongoose, { Schema, model } from "mongoose";

// Interface for ISpell
export interface ISpell {
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
const spellSchema = new Schema<ISpell>({
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
export const SpellModel = model<ISpell>('Spell', spellSchema);