import { NextApiRequest } from "next";
import RecruitResponse from "@/app/recruit/job-description/[id]/apply/_schema/RecruitSchema";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const body = await req.json();
    console.log(body);
    await RecruitResponse.create(body);
    return NextResponse.json({ message: "Ticket created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
