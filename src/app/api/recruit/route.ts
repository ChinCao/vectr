import type { NextApiRequest, NextApiResponse } from "next";
import RecruitResponse from "@/app/recruit/job-description/[id]/apply/_schema/RecruitSchema";
import { NextResponse } from "next/server";
import ConnectDB from "@/db/db";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = await req.json();
    console.log(body);
    await ConnectDB();
    await RecruitResponse.create(body);
    return NextResponse.json({ message: "Ticket created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
