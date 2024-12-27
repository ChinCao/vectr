import {CUSTOMIZED_DEPARTMENT_EMAIL, DepartmentsAbbreviation, EMAIL_SUBJECT, FULL_DEPARTMENT_TITLE} from "@/app/recruit/_constants/constants";
import EMAIL_TEMPLATE from "@/app/recruit/_constants/email";
import {FormDataStructure} from "@/app/recruit/_types/RecruitTypes";
import {lowercaseFirstLetter} from "@/lib/utils";
import {NextResponse} from "next/server";
import nodemailer from "nodemailer";

interface RequestFromServer {
  data: FormDataStructure;
  department: DepartmentsAbbreviation;
}

export async function POST(req: Request) {
  const body: RequestFromServer = await req.json();
  const private_email = body.data.personal_info.private_email;
  const school_email = body.data.personal_info.school_email;
  const department = body.department;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const htmlContent = EMAIL_TEMPLATE(
    body.data.personal_info.name.toUpperCase(),
    lowercaseFirstLetter(FULL_DEPARTMENT_TITLE(department)!),
    CUSTOMIZED_DEPARTMENT_EMAIL[department]
  );

  const mailOptionsPrivate = {
    from: process.env.GMAIL_USER,
    to: private_email,
    subject: EMAIL_SUBJECT,
    html: htmlContent,
  };

  const mailOptionsSchool = {
    from: process.env.GMAIL_USER,
    to: school_email,
    subject: EMAIL_SUBJECT,
    html: htmlContent,
  };

  try {
    try {
      await transporter.sendMail(mailOptionsPrivate);
    } catch (error) {
      return NextResponse.json({message: error}, {status: 200});
    }
    try {
      await transporter.sendMail(mailOptionsSchool);
    } catch (error) {
      return NextResponse.json({message: error}, {status: 200});
    }
    return NextResponse.json({message: "Email sent successfully!"}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: error}, {status: 500});
  }
}
