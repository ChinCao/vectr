import {INFO_MAX_CHARACTER} from "@/app/recruit/_constants/constants";
import {z} from "zod";
import {PersonalInfoType} from "../_types/FormTypes";
import {BasePersonalInfoSchema} from "@/schema/PersonalInfoSchema";

export const PersonalInfoSchema = BasePersonalInfoSchema.merge(
  z.object({
    facebook: z
      .string()
      .max(INFO_MAX_CHARACTER * 5, {
        message: `Link Facebook của bạn không được vượt quá ${INFO_MAX_CHARACTER * 5} ký tự`,
      })
      .nonempty({message: "Link profile Facebook không được để trống."}),
    instagram: z
      .string()
      .max(INFO_MAX_CHARACTER * 5, {
        message: `Link Instagram của bạn không được vượt quá ${INFO_MAX_CHARACTER * 5} ký tự`,
      })
      .optional(),

    class: z
      .string()
      .nonempty({message: "Tên lớp không được để trống."})
      .max(INFO_MAX_CHARACTER, {
        message: `Tên lớp của bạn không được vượt quá ${INFO_MAX_CHARACTER} ký tự`,
      })
      .regex(/^([8-9]|1[0-2])[ABab]?[0-9]{1,2}$/, {
        message: "Tên lớp không hợp lệ, chỉ lớp 8-12 được apply",
      }),
  })
);

export const PersonalInfoSchemaDefault: PersonalInfoType = {
  name: "",
  school_email: "@stu.vinschool.edu.vn",
  student_id: "VS",
  facebook: "",
  private_email: "",
  class: "",
  instagram: "",
};
