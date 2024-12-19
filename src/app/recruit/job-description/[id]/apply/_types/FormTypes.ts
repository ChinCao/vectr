import { z } from "zod";
import { PersonalInfoSchema } from "../_schema/PersonalInfoSchema";
import { DynamicQuestionsSchema } from "../_schema/DynamicQuestionsSchema";
import { UseFormReturn } from "react-hook-form";

export type FormTabs =
  | "general-questions"
  | "department-questions"
  | "personal-info";

export type PersonalInfoType = z.infer<typeof PersonalInfoSchema>;

export type DynamicQuestionsType = z.infer<
  ReturnType<typeof DynamicQuestionsSchema>
>;

export type FormType = PersonalInfoType & DynamicQuestionsType;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Tform = UseFormReturn<any>;
