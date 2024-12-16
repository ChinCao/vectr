import { INFO_MAX_CHARACTER } from "@/constants/constants";
import { z } from "zod";

export const PersonalInfoSchema = z.object({
  name: z
    .string()
    .max(INFO_MAX_CHARACTER, {
      message: `Họ và tên của bạn không được vượt quá ${INFO_MAX_CHARACTER} ký tự`,
    })
    .nonempty({ message: "Họ và tên của bạn không được để trống." }),
  school_email: z
    .string()
    .email({ message: "Vui lòng nhập email trường hợp lệ." })
    .max(INFO_MAX_CHARACTER, {
      message: `Email trường của bạn không được vượt quá ${INFO_MAX_CHARACTER} ký tự.`,
    })
    .nonempty({ message: "Email trường không được để trống." })
    .regex(/^[a-zA-Z]+[0-9]{6,}@stu\.vinschool\.edu\.vn$/, {
      message: "Vui lòng nhập email trường hợp lệ",
    }),

  private_email: z
    .string()
    .email({ message: "Vui lòng nhập email cá nhân hợp lệ." })
    .max(INFO_MAX_CHARACTER, {
      message: `Email cá nhân của bạn không được vượt quá ${INFO_MAX_CHARACTER} ký tự`,
    })
    .nonempty({ message: "Email cá nhân không được để trống." })
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

    .regex(/^vs\d{6}$/i, { message: "Vui lòng nhập mã số HS hợp lệ." }),
  class: z
    .string()
    .nonempty({ message: "Tên lớp không được để trống." })
    .max(INFO_MAX_CHARACTER, {
      message: `Tên lớp của bạn không được vượt quá ${INFO_MAX_CHARACTER} ký tự`,
    })
    .regex(/^([8-9]|1[0-2])[ABab]?[0-9]{1,2}$/, {
      message: "Tên lớp không hợp lệ, chỉ lớp 8-12 được apply",
    }),
  facebook: z
    .string()
    .max(INFO_MAX_CHARACTER * 5, {
      message: `Link Facebook của bạn không được vượt quá ${
        INFO_MAX_CHARACTER * 5
      } ký tự`,
    })
    .nonempty({ message: "Link profile Facebook không được để trống." }),
  instagram: z
    .string()
    .max(INFO_MAX_CHARACTER * 5, {
      message: `Link Instagram của bạn không được vượt quá ${
        INFO_MAX_CHARACTER * 5
      } ký tự`,
    })
    .optional(),
});

export type PersonalInfoType = z.infer<typeof PersonalInfoSchema>;

export const PersonalInfoSchemaDefault: PersonalInfoType = {
  name: "",
  school_email: "",
  student_id: "",
  facebook: "",
  private_email: "",
  class: "",
  instagram: "",
};
