import { z } from "zod";

export const PersonalInfoSchemaDefaults = {
  name: "",
  school_email: "",
  student_id: "",
  facebook: "",
  private_email: "",
  class: "",
};

export const PersonalInfoSchema = z.object({
  name: z
    .string()
    .max(100, { message: "Họ và tên của bạn không được vượt quá 100 ký tự" })
    .nonempty({ message: "Họ và tên của bạn không được để trống." }),
  school_email: z
    .string()
    .email({ message: "Vui lòng nhập email trường hợp lệ." })
    .max(100, {
      message: "Email trường của bạn không được vượt quá 100 ký tự.",
    })
    .nonempty({ message: "Email trường không được để trống." })
    .regex(/^[a-zA-Z]+[0-9]{6,}@stu\.vinschool\.edu\.vn$/, {
      message: "Vui lòng nhập email trường hợp lệ",
    }),

  private_email: z
    .string()
    .email({ message: "Vui lòng nhập email cá nhân hợp lệ." })
    .max(100, {
      message: "Email cá nhân của bạn không được vượt quá 100 ký tự",
    })
    .nonempty({ message: "Email cá nhân không được để trống." }),
  student_id: z
    .string()
    .nonempty({
      message: "Mã số HS không được để trống.",
    })
    .regex(/^VS\d{6}$/, { message: "Vui lòng nhập mã số HS hợp lệ." }),
  class: z
    .string()
    .nonempty({ message: "Tên lớp không được để trống." })
    .regex(/^([8-9]|1[0-2])[ABab]?[0-9]{1,2}$/, {
      message: "Tên lớp không hợp lệ, chỉ lớp 8-12 được apply",
    }),
  facebook: z
    .string()
    .nonempty({ message: "Link profile Facebook không được để trống." }),
});
