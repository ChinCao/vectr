import RecruitResponse from "@/app/recruit/job-description/[id]/apply/_schema/RecruitSchema";
import ConnectDB from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const user_id = body.user_id;
  const department = body.department;

  await ConnectDB();
  try {
    const projection = {
      [`department_questions.response.${department}`]: 1,
      general_questions: 1,
      personal_info: 1,
    };
    const recruit = await RecruitResponse.findOne({ user_id: user_id }).select(
      projection
    );

    return NextResponse.json({ recruit }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
