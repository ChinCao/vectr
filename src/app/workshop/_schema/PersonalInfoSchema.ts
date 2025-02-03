import {INFO_MAX_CHARACTER} from "@/app/recruit/_constants/constants";
import {BasePersonalInfoSchema} from "@/schema/PersonalInfoSchema";
import {z} from "zod";

export const PersonalInfoSchema = BasePersonalInfoSchema.merge(
  z.object({
    phone: z
      .string()
      .nonempty({message: "Số điện thoại không được để trống."})
      .regex(/[^0-9]*$/)
      .max(15, "Số điện thoại không hợp lệ!"),
    class: z
      .string()
      .nonempty({message: "Tên lớp không được để trống."})
      .max(INFO_MAX_CHARACTER, {
        message: `Tên lớp của bạn không được vượt quá ${INFO_MAX_CHARACTER} ký tự`,
      })
      .regex(/^([6-9]|1[0-2])[ABab]?[0-9]{1,2}$/, {
        message: "Tên lớp không hợp lệ, chỉ lớp 6-12 được đăng ký workshop",
      }),
  })
);

export const PersonalInfoSchemaDefault = {class: "", private_email: "", school_email: "@stu.vinschool.edu.vn", name: "", phone: "", student_id: "VS"};
