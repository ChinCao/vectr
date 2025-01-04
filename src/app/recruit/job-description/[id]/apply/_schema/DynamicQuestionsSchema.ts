import {RESPONSE_MAX_CHARACTER} from "@/app/recruit/_constants/constants";
import {z, ZodOptional, ZodString} from "zod";

export const DynamicQuestionsSchema = (department_questions: string[][]) => {
  const dynamicQuestionSchema = z.object(
    department_questions[0].reduce(
      (acc, item, index) => {
        acc[item] = department_questions[1][index].includes("(optional)")
          ? z
              .string()
              .max(RESPONSE_MAX_CHARACTER, {
                message: `Không được vượt quá ${RESPONSE_MAX_CHARACTER} ký tự`,
              })
              .optional()
          : z
              .string()
              .max(RESPONSE_MAX_CHARACTER, {
                message: `Không được vượt quá ${RESPONSE_MAX_CHARACTER} ký tự`,
              })
              .nonempty({
                message: "Không được để trống, hãy viết gì đó nhé!",
              });
        return acc;
      },
      {} as Record<string, ZodOptional<ZodString> | ZodString>
    )
  );
  return dynamicQuestionSchema;
};

export const DynamicQuestionsDefaults = (department_questions: string[][]) => {
  const dynamicQuestionsDefault = department_questions[0].reduce(
    (acc, item) => {
      acc[item] = "";
      return acc;
    },
    {} as Record<string, string>
  );

  return dynamicQuestionsDefault;
};
