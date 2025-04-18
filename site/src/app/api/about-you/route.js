import { GoogleSpreadsheet } from "google-spreadsheet";
import { GoogleAuth } from "google-auth-library";
import { NextResponse } from "next/server";

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;
const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY = (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n");

export async function POST(req) {
  try {
    const body = await req.json();

    const auth = new GoogleAuth({
      credentials: {
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(SHEET_ID, auth);
    await doc.loadInfo();

    const sheet = doc.sheetsByTitle["Sheet3"]; //  this targets Sheet2 specifically

    await sheet.addRow({
      Email: body.email,
      Personality: body.personality,
      Superpower: body.superpower,
      TeamSpirit: body.teamSpirit,
      Snack: body.snack,
      Meme: body.meme,
      Mascot: body.mascot,
      Song: body.song,
      DeadlineReaction: body.deadlineReaction,
      Badge: body.badge,
    });

    return NextResponse.json({ message: "Follow-up data saved successfully!" }, { status: 201 });

  } catch (error) {
    console.error("Error saving follow-up data:", error);
    return NextResponse.json({ error: "Failed to save follow-up data." }, { status: 500 });
  }
}
