import RecruitResponse from "@/app/recruit/job-description/[id]/apply/_schema/RecruitSchema";
import { NextResponse } from "next/server";
import ConnectDB from "@/db/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await ConnectDB();
    await RecruitResponse.create(body);
    return NextResponse.json(
      { message: "Response saved to database" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
