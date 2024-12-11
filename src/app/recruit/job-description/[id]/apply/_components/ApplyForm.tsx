/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const ApplyForm = ({ questions }: { questions: string[] }) => {
  const formSchema = z.object({
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      school_email: "",
      student_id: "",
      facebook: "",
      private_email: "",
      class: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const [studentID, setStudentID] = useState("VS");
  const [schoolEmail, setSchoolEmail] = useState("@stu.vinschool.edu.vn");
  const [manual, setManual] = useState(false);
  return (
    <Card className="px-4 sm:px-12 py-8 mt-8 w-full lg:w-[70%]">
      <h1 className="font-bold text-2xl mb-1">Thông tin cá nhân</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="student_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mã số học sinh</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e: any) => {
                      field.onChange(e);
                      if (!manual) {
                        setSchoolEmail(
                          (e.target.value.match(/\d+/)
                            ? e.target.value.match(/\d+/)
                            : "") + "@stu.vinschool.edu.vn"
                        );
                      }
                      setStudentID(e.target.value);
                    }}
                    value={studentID}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="class"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lớp</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="school_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email trường</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={schoolEmail}
                    onChange={(e: any) => {
                      field.onChange(e);
                      if (!manual) {
                        setManual(!manual);
                      }
                      setSchoolEmail(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="private_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email riêng {`(để làm việc)`}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Profile <span className="text-[#0966ff]">Facebook</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default ApplyForm;
