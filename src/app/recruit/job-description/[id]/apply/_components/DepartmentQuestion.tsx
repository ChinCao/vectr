"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import QuestionFallBack from "./QuestionFallBack";
import { useEffect, useRef } from "react";
import { RESPONSE_MAX_CHARACTER } from "@/constants/constants";

const DepartmentQuestions = ({
  form,
  modified_department_questions,
  department_questions,
  isFetching,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  modified_department_questions: string[];
  department_questions: string[];
  isFetching: boolean;
}) => {
  const refs = useRef<(HTMLTextAreaElement | null)[]>([]);

  useEffect(() => {
    if (!isFetching) {
      refs.current.forEach((textarea) => {
        if (textarea) {
          textarea.style.height = "inherit";
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      });
    }
  }, [isFetching]);

  return (
    <>
      <h1 className="font-bold text-2xl text-primary ">Câu hỏi chuyên môn</h1>
      {modified_department_questions.map((question, index) => (
        <FormField
          key={question}
          control={form.control}
          name={question}
          render={({ field: { onChange, value } }) => (
            <FormItem className="bg-white rounded p-4">
              <FormLabel className="text-md">
                {index + 1}. {department_questions[index]}
              </FormLabel>
              <FormControl>
                {isFetching ? (
                  <QuestionFallBack />
                ) : (
                  <Textarea
                    className="resize-none scrollbar-hide overflow-hidden"
                    value={value}
                    maxLength={RESPONSE_MAX_CHARACTER + 1}
                    ref={(el) => {
                      refs.current[index] = el;
                    }}
                    onChange={(e) => {
                      onChange(e.target.value);
                      refs.current[index]!.style.height = "inherit";

                      refs.current[index]!.style.height = `${
                        refs.current[index]!.scrollHeight
                      }px`;
                    }}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
};

export default DepartmentQuestions;
