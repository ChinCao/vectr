import { NextResponse } from "next/server";
import ConnectDB from "@/db/db";
import RecruitResponse from "@/app/recruit/_schema/DBRecruitSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user_id = body.user_id;
    await ConnectDB();
    const existingUser = await RecruitResponse.findOne({
      user_id,
    });
    const department = Object.keys(body.department_questions.response)[0];
    if (existingUser) {
      const updatedResponse = await RecruitResponse.findOneAndUpdate(
        { user_id },
        {
          $set: {
            [`department_questions.response.${department}`]:
              body.department_questions.response[department],
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
