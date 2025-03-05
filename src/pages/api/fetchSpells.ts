// filepath: c:\source\nextjs-entra-id-example\app\nextjs-entra-id-example\src\pages\api\fetchSpells.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { SpellModel } from '../../models/spellSchema';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect("mongodb+srv://"+process.env.NEXT_PUBLIC_COSMOSDB_HOST+"/"+process.env.NEXT_PUBLIC_COSMOSDB_DBNAME+"?ssl=true", {
        auth: {
            username: process.env.NEXT_PUBLIC_COSMOSDB_USER,
            password: process.env.NEXT_PUBLIC_COSMOSDB_PASSWORD
        },
        retryWrites: false
    })
    .then(() => console.log('Connection to CosmosDB successful'))
    .catch((err) => console.error(err));
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    const spells = await SpellModel.find();
    res.status(200).json(spells);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch spells' });
  }
}