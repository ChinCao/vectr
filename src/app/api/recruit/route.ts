import RecruitResponse from "@/app/recruit/job-description/[id]/apply/_schema/RecruitSchema";
import { NextResponse } from "next/server";
import ConnectDB from "@/db/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await ConnectDB();
    const existingUser = await RecruitResponse.findOne({
      user_id: body.user_id,
    });
    const responseKeys = Object.keys(body.department_questions.response)[0];
    const user_id = body.user_id;
    if (existingUser) {
      const updatedResponse = await RecruitResponse.findOneAndUpdate(
        { user_id },
        {
          $set: {
            [`department_questions.response.${responseKeys}`]:
              body.department_questions.response[responseKeys],
            general_questions: body.general_questions,
            personal_info: body.personal_info,
          },
        },
        { new: true }
      );
      return NextResponse.json({ updatedResponse }, { status: 200 });
    } else {
      await RecruitResponse.create(body);
      return NextResponse.json(
        { message: "Successfully created reponse" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
