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
import { useEffect, useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useSound from "use-sound";
import { CLICK_SOUND_URL, CLICK_SOUND_VOLUME } from "@/constants/constants";
import { Progress } from "@/components/ui/progress";

const ApplyForm = ({
  department_questions,
  general_questions,
}: {
  department_questions: string[];
  general_questions: string[];
}) => {
  const modified_department_questions = useMemo(
    () => department_questions.map((str: string) => str.replace(/["'`.]/g, "")),
    [department_questions]
  );
  const modified_general_questions = useMemo(
    () => general_questions.map((str: string) => str.replace(/["'`.]/g, "")),
    [general_questions]
  );
  const sanitizedData = useMemo(
    () => [...modified_department_questions, ...modified_general_questions],
    [modified_department_questions, modified_general_questions]
  );

  const dynamicQuestionSchema = z.object(
    sanitizedData.reduce((acc, item) => {
      acc[item] = z
        .string()
        .max(3000, { message: "Không được vượt quá 3000 ký tự" })
        .nonempty({ message: "Không được để trống, hãy viết gì đó nhé!" });
      return acc;
    }, {} as Record<string, z.ZodString>)
  );

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
    ...dynamicQuestionSchema.shape,
  });

  const dynamicQuestions = sanitizedData.reduce((acc, item) => {
    acc[item] = "";
    return acc;
  }, {} as Record<string, string>);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      school_email: "",
      student_id: "",
      facebook: "",
      private_email: "",
      class: "",
      ...dynamicQuestions,
    },
  });
  type FormsanitizedData = z.infer<typeof formSchema>;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const [studentID, setStudentID] = useState("VS");
  const [schoolEmail, setSchoolEmail] = useState("@stu.vinschool.edu.vn");
  const [manual, setManual] = useState(false);
  const { formState } = form;
  const [activeTab, setActiveTab] = useState("personal-info");
  const { toast } = useToast();
  const [playClick] = useSound(CLICK_SOUND_URL, { volume: CLICK_SOUND_VOLUME });

  useEffect(() => {
    const hasPersonalInfoErrors = Object.keys(formState.errors).some((key) =>
      [
        "name",
        "student_id",
        "class",
        "school_email",
        "private_email",
        "facebook",
      ].includes(key)
    );
    const hasDepartmentErrors = Object.keys(formState.errors).some((key) =>
      modified_department_questions.includes(key)
    );
    const hasGeneralErrors = Object.keys(formState.errors).some((key) =>
      modified_general_questions.includes(key)
    );
    if (hasPersonalInfoErrors) {
      setActiveTab("personal-info");
    } else if (hasDepartmentErrors || hasGeneralErrors) {
      setActiveTab(activeTab);
    }
    const errorText = hasPersonalInfoErrors
      ? "thông tin cá nhân"
      : hasGeneralErrors
      ? "câu trả lời chung"
      : hasDepartmentErrors
      ? "câu trả lời chuyên môn"
      : null;
    if (hasDepartmentErrors || hasPersonalInfoErrors || hasGeneralErrors) {
      toast({
        title: "Lưu ý!",
        description: `Vui lòng kiểm tra lại ${errorText}.`,
        action: (
          <ToastAction altText="close" onClick={() => playClick()}>
            Close
          </ToastAction>
        ),
      });
    }
    window.scrollTo({
      top: 0,
    });
  }, [
    activeTab,
    sanitizedData,
    formState.errors,
    modified_department_questions,
    modified_general_questions,
    playClick,
    toast,
  ]);

  const tabs = ["personal-info", "general-questions", "department-questions"];

  const increment = 100 / tabs.length;

  const getValue = () => {
    switch (activeTab) {
      case "personal-info":
        return increment * 1;
      case "general-questions":
        return increment * 2;
      case "department-questions":
        return increment * 3;
      default:
        return 0;
    }
  };

  return (
    <Form {...form}>
      <Progress
        value={getValue()}
        className="w-full top-[0] z-[1000] h-[3px] fixed"
      />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full flex items-center justify-center "
      >
        <Tabs
          defaultValue="personal-info"
          value={activeTab}
          onValueChange={setActiveTab}
          className="px-4 sm:px-12 py-8 mt-8 w-full sm:w-[80%]"
        >
          <TabsList className="flex items-center h-[max-content] justify-center flex-wrap flex-row p-2 mb-8">
            <TabsTrigger value="personal-info" className="flex-1 py-2">
              Thông tin cá nhân
            </TabsTrigger>
            <TabsTrigger value="general-questions" className="flex-1 py-2">
              Câu hỏi chung
            </TabsTrigger>
            <TabsTrigger value="department-questions" className="flex-1 py-2">
              Câu hỏi chuyên môn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal-info" className="flex flex-col gap-8">
            <h1 className="font-bold text-2xl">Thông tin cá nhân</h1>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">1. Họ và tên</FormLabel>
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
                  <FormLabel className="text-md">2. Mã số học sinh</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                  <FormLabel className="text-md">3. Lớp</FormLabel>
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
                  <FormLabel className="text-md">4. Email trường</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={schoolEmail}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                  <FormLabel className="text-md">
                    5. Email riêng {`(để làm việc)`}
                  </FormLabel>
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
                  <FormLabel className="text-md">
                    6. Link profile{" "}
                    <span className="text-[#0966ff]">Facebook</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TabsList className="w-full">
              <TabsTrigger
                value="general-questions"
                className="flex flex-row gap-2 bg-[#f7c325] text-white w-full py-2 hover:opacity-90"
              >
                Câu hỏi chung <FaLongArrowAltRight />
              </TabsTrigger>
            </TabsList>
          </TabsContent>
          <TabsContent
            value="general-questions"
            className="flex flex-col gap-8"
          >
            <h1 className="font-bold text-2xl text-primary ">Câu hỏi chung</h1>
            {modified_general_questions.map((question, index) => (
              <FormField
                key={question}
                control={form.control}
                name={question as keyof FormsanitizedData}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">
                      {index + 1}. {general_questions[index]}
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <TabsList className="w-full flex flex-col gap-5 mt-4">
              <TabsTrigger
                value="department-questions"
                className="flex flex-row gap-2 bg-[#f7c325] text-white w-full py-2 hover:opacity-90"
                onClick={() => playClick()}
              >
                Câu hỏi chuyên môn <FaLongArrowAltRight />
              </TabsTrigger>
              <TabsTrigger
                value="personal-info"
                className="flex flex-row gap-2 bg-[#f7c325] text-white w-full py-2 hover:opacity-90"
                onClick={() => playClick()}
              >
                <FaLongArrowAltLeft /> Thông tin cá nhân
              </TabsTrigger>
            </TabsList>
          </TabsContent>
          <TabsContent
            value="department-questions"
            className="flex flex-col gap-8"
          >
            <h1 className="font-bold text-2xl text-primary ">
              Câu hỏi chuyên môn
            </h1>
            {modified_department_questions.map((question, index) => (
              <FormField
                key={question}
                control={form.control}
                name={question as keyof FormsanitizedData}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">
                      {index + 1}. {department_questions[index]}
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <TabsList className="w-full flex flex-col gap-5 my-4">
              <TabsTrigger
                value="general-questions"
                className="flex flex-row gap-2 bg-[#f7c325] text-white w-full py-2 hover:opacity-90"
                onClick={() => playClick()}
              >
                <FaLongArrowAltLeft /> Câu hỏi chung
              </TabsTrigger>
              <TabsTrigger
                value="personal-info"
                className="flex flex-row gap-2 bg-[#f7c325] text-white w-full py-2 hover:opacity-90"
                onClick={() => playClick()}
              >
                <FaLongArrowAltLeft /> Thông tin cá nhân
              </TabsTrigger>
            </TabsList>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-full"
                  type="button"
                  onClick={() => playClick()}
                >
                  Gửi đơn
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Bạn có chắc chắn chưa?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Không thể hoàn tác hành động này và thông tin của bạn sẽ
                    được ghi nhận.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => playClick()}>
                    Hủy
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      playClick();
                      form.handleSubmit(onSubmit)();
                    }}
                  >
                    Tiếp tục
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TabsContent>
        </Tabs>
        <Toaster />
      </form>
    </Form>
  );
};

export default ApplyForm;
