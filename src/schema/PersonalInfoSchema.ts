import {INFO_MAX_CHARACTER} from "@/app/recruit/_constants/constants";
import {z} from "zod";

export const BasePersonalInfoSchema = z.object({
  name: z
    .string()
    .max(INFO_MAX_CHARACTER, {
      message: `Họ và tên của bạn không được vượt quá ${INFO_MAX_CHARACTER} ký tự`,
    })
    .nonempty({message: "Họ và tên của bạn không được để trống."}),
  school_email: z
    .string()
    .email({message: "Vui lòng nhập email trường hợp lệ."})
    .max(INFO_MAX_CHARACTER, {
      message: `Email trường của bạn không được vượt quá ${INFO_MAX_CHARACTER} ký tự.`,
    })
    .nonempty({message: "Email trường không được để trống."})
    .regex(/^[a-zA-Z]+[0-9]{6,}@stu\.vinschool\.edu\.vn$/, {
      message: "Vui lòng nhập email trường hợp lệ",
    }),

  private_email: z
    .string()
    .email({message: "Vui lòng nhập email cá nhân hợp lệ."})
    .max(INFO_MAX_CHARACTER, {
      message: `Email cá nhân của bạn không được vượt quá ${INFO_MAX_CHARACTER} ký tự`,
    })
    .nonempty({message: "Email cá nhân không được để trống."})
    .refine((email) => !email.endsWith("@stu.vinschool.edu.vn"), {
      message: "Không được sử dụng email trường cho email cá nhân.",
    }),
  student_id: z
    .string()
    .nonempty({
      message: "Mã số HS không được để trống.",
    })
    .max(INFO_MAX_CHARACTER, {
      message: `Mã số HS của bạn không được vượt quá ${INFO_MAX_CHARACTER} ký tự`,
    })

    .regex(/^vs\d{6}$/i, {message: "Vui lòng nhập mã số HS hợp lệ."}),
});
