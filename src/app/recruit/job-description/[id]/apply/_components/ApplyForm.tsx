"use client";
import { z, ZodOptional, ZodString } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  CLICK_SOUND_URL,
  CLICK_SOUND_VOLUME,
  FULL_CORE_TITLE,
  lowercaseFirstLetter,
  Response,
  RESPONSE_MAX_CHARACTER,
  strToBool,
} from "@/constants/constants";
import { Progress } from "@/components/ui/progress";
import PersonalInfo from "./PersonalInfo";
import GeneralQuestions from "./GeneralQuestions";
import DepartmentQuestions from "./DepartmentQuestion";
import ApplyTabTrigger from "./ApplyTabTrigger";
import {
  PersonalInfoSchema,
  PersonalInfoSchemaDefault,
  PersonalInfoType,
} from "../_schema/PersonalInfoSchema";
import { useUser } from "@clerk/clerk-react";
import { NextResponse } from "next/server";
import { useDebounce } from "../_hook/useDebounce";
import { useNavigationGuard } from "next-navigation-guard";
import {
  MdOutlineCloudDone,
  MdOutlineCloudDownload,
  MdOutlineCloudUpload,
} from "react-icons/md";
import LoadingSpinner from "@/components/LoadingSpinner";
import { IoMdCheckmarkCircle } from "react-icons/io";
import NavigationButton from "@/app/recruit/_components/NavigationButton";

const ApplyForm = ({
  department_questions,
  general_questions,
  department,
}: {
  department_questions: string[];
  general_questions: string[];
  department: string;
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

  const [activeTab, setActiveTab] = useState("personal-info");
  const { toast } = useToast();
  const [playClick] = useSound(CLICK_SOUND_URL, { volume: CLICK_SOUND_VOLUME });
  const [studentID, setStudentID] = useState("VS");
  const [schoolEmail, setSchoolEmail] = useState("@stu.vinschool.edu.vn");
  const [manual, setManual] = useState(false);
  const { user } = useUser();
  const [isFetching, setIsFetching] = useState(true);
  const [hasSubmit, setHasSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newUser, setNewUser] = useState(false);

  const dynamicQuestionSchema = z.object(
    sanitizedData.reduce((acc, item) => {
      acc[item] = item.includes("(optional)")
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
            .nonempty({ message: "Không được để trống, hãy viết gì đó nhé!" });
      return acc;
    }, {} as Record<string, ZodOptional<ZodString> | ZodString>)
  );

  const formSchema = z.object({
    ...PersonalInfoSchema.shape,
    ...dynamicQuestionSchema.shape,
  });

  const dynamicQuestionsDefault = sanitizedData.reduce((acc, item) => {
    acc[item] = "";
    return acc;
  }, {} as Record<string, string>);

  type FormSanitizedData = z.infer<typeof formSchema>;
  type DynamicQuestionType = z.infer<typeof dynamicQuestionSchema>;
  type CombinedType = FormSanitizedData & DynamicQuestionType;
  const form = useForm<FormSanitizedData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...PersonalInfoSchemaDefault,
      ...dynamicQuestionsDefault,
    },
    mode: "onChange",
  });
  const { formState } = form;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/recruit/get", {
        method: "POST",
        body: JSON.stringify({ user_id: user?.id, department: department }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: any = await res.json();
      // console.log(data);
      if (!res.ok) {
        const errorMessage = await res.text();
        return NextResponse.json({ error: errorMessage }, { status: 200 });
      }
      if (data.recruit) {
        if (
          strToBool(
            data["recruit"]["department_questions"]["response"][department][
              "hasSubmitted"
            ]
          )
        ) {
          setHasSubmit(true);
          setIsFetching(false);
          return;
        }
        const personalInfo = data.recruit.personal_info;

        if (personalInfo) {
          if (personalInfo.name) {
            form.setValue("name", personalInfo.name);
          }
          if (personalInfo.school_email) {
            form.setValue("school_email", personalInfo.school_email);
            setSchoolEmail(personalInfo.school_email);
            setManual(true);
          }
          if (personalInfo.student_id) {
            form.setValue("student_id", personalInfo.student_id);
            setStudentID(personalInfo.student_id);
          }
          if (personalInfo.facebook) {
            form.setValue("facebook", personalInfo.facebook);
          }
          if (personalInfo.private_email) {
            form.setValue("private_email", personalInfo.private_email);
          }
          if (personalInfo.class) {
            form.setValue("class", personalInfo.class);
          }
        }

        for (const question of sanitizedData) {
          if (modified_department_questions.includes(question)) {
            if (data.recruit.department_questions.response[department]) {
              form.setValue(
                question,
                data.recruit.department_questions.response[department][question]
              );
            }
          } else if (modified_general_questions.includes(question)) {
            if (data.recruit.general_questions.response) {
              form.setValue(
                question,
                data.recruit.general_questions.response[question]
              );
            }
          }
        }
      } else {
        console.log("new user");
        setNewUser(true);
      }

      setIsFetching(false);
    }
    if (user?.id) {
      fetchData();
    }
  }, [user?.id, hasSubmit, isFetching]);

  async function saveToDatabase(values: CombinedType, submit?: boolean) {
    if (submit) {
      setIsSubmitting(true);
    }
    const response: Response = {
      user_id: user?.id,
      personal_info: {},
      department_questions: { response: {} },
      general_questions: { response: {} },
    };
    response["department_questions"]["response"][department] = {
      hasSubmitted: submit ? true : false,
    };
    Object.keys(values).forEach((key: string) => {
      if (modified_department_questions.includes(key)) {
        response["department_questions"]["response"][department][key] =
          values[key];
      } else if (modified_general_questions.includes(key)) {
        response["general_questions"]["response"][key] = values[key];
      } else {
        response["personal_info"][key as keyof PersonalInfoType] =
          values[key as keyof PersonalInfoType];
      }
    });
    console.log(response);
    const res = await fetch("/api/recruit/save", {
      method: "POST",
      body: JSON.stringify(response),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (submit) {
      console.log("submit success");
      setHasSubmit(true);
    }
    setIsSavedRef(true);
    setIsSubmitting(false);
    if (!res.ok) {
      throw new Error("Failed to create response.");
    }
  }
  const onSubmit = async (values: CombinedType) => {
    await saveToDatabase(values, true);
  };
  const [isSavedRef, setIsSavedRef] = useState(true);
  const watchedValues = useMemo(() => form.watch(), [form]);
  const debouncedValues = useDebounce(watchedValues, 2000, setIsSavedRef);
  useEffect(() => {
    async function bruh() {
      console.log(isFetching, hasSubmit);
      if (debouncedValues && !isFetching && !hasSubmit) {
        await saveToDatabase(watchedValues);
      } else if (hasSubmit) {
        setIsSavedRef(true);
      }
    }
    if (user?.id) {
      bruh();
    }
    // console.log(form.formState.dirtyFields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, debouncedValues, hasSubmit, newUser]);

  const navGuard = useNavigationGuard({
    enabled: !isSavedRef && !hasSubmit,
  });

  useEffect(() => {
    if (navGuard.active) {
      saveToDatabase(watchedValues);
      navGuard.accept();
    }
  }, [navGuard, isSavedRef]);

  useEffect(() => {
    const hasPersonalInfoErrors = Object.keys(formState.errors).some((key) =>
      Object.keys(PersonalInfoSchemaDefault).includes(key)
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
    } else {
      window.scrollTo({
        top: 0,
      });
    }
  }, [
    activeTab,
    sanitizedData,
    formState.errors,
    modified_department_questions,
    modified_general_questions,
    playClick,
    toast,
  ]);

  return (
    <>
      {!hasSubmit ? (
        <Form {...form}>
          <Progress
            value={
              activeTab === "personal-info"
                ? (100 / 3) * 1
                : activeTab === "general-questions"
                ? (100 / 3) * 2
                : activeTab === "department-questions"
                ? (100 / 3) * 3
                : 0
            }
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
              className="px-2 lg:px-12 py-8 mt-8 w-full lg:w-[80%]"
            >
              {isSavedRef && !isFetching ? (
                <div className="flex items-center justify-start gap-4 mb-4 text-green-900">
                  <MdOutlineCloudDone /> Mọi dữ liệu đã được lưu
                </div>
              ) : isFetching ? (
                <div className="flex items-center justify-start gap-4 mb-4 text-primary flex-col sm:flex-row">
                  <MdOutlineCloudDownload />
                  <p className="text-center">
                    Đang lấy thông tin từ cơ sở dữ liệu
                  </p>
                </div>
              ) : !isSavedRef ? (
                <div className="flex items-center justify-start gap-4 mb-4 text-red-600">
                  <MdOutlineCloudUpload />
                  Đang lưu câu trả lời của bạn
                </div>
              ) : null}
              <TabsList className="flex items-center h-[max-content] justify-center flex-wrap flex-row p-2 mb-8">
                <TabsTrigger value="personal-info" className="flex-1 py-2">
                  Thông tin cá nhân
                </TabsTrigger>
                <TabsTrigger value="general-questions" className="flex-1 py-2">
                  Câu hỏi chung
                </TabsTrigger>
                <TabsTrigger
                  value="department-questions"
                  className="flex-1 py-2 text-primary"
                >
                  Câu hỏi chuyên môn
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="personal-info"
                className="flex flex-col gap-8"
              >
                <PersonalInfo
                  form={form}
                  isFetching={isFetching}
                  studentID={studentID}
                  schoolEmail={schoolEmail}
                  setSchoolEmail={setSchoolEmail}
                  manual={manual}
                  setManual={setManual}
                  setStudentID={setStudentID}
                />

                <TabsList className="w-full">
                  <ApplyTabTrigger
                    direction="right"
                    value="general-questions"
                    text="Câu hỏi chung"
                  />
                </TabsList>
              </TabsContent>
              <TabsContent
                value="general-questions"
                className="flex flex-col gap-8"
              >
                <GeneralQuestions
                  form={form}
                  modified_general_questions={modified_general_questions}
                  general_questions={general_questions}
                  isFetching={isFetching}
                />
                <TabsList className="w-full flex flex-col gap-5 mt-4">
                  <ApplyTabTrigger
                    direction="right"
                    value="department-questions"
                    text="Câu hỏi chuyên môn"
                  />
                  <ApplyTabTrigger
                    direction="left"
                    value="personal-info"
                    text="Thông tin cá nhân"
                  />
                </TabsList>
              </TabsContent>
              <TabsContent
                value="department-questions"
                className="flex flex-col gap-8"
              >
                <DepartmentQuestions
                  form={form}
                  isFetching={isFetching}
                  department_questions={department_questions}
                  modified_department_questions={modified_department_questions}
                />
                <TabsList className="w-full flex flex-col gap-5 my-4">
                  <ApplyTabTrigger
                    direction="left"
                    value="general-questions"
                    text="Câu hỏi chung"
                  />
                  <ApplyTabTrigger
                    direction="left"
                    value="personal-info"
                    text="Thông tin cá nhân"
                  />
                </TabsList>
                <AlertDialog open={isSubmitting}>
                  <AlertDialogContent className="flex flex-col items-center justify-center">
                    <AlertDialogTitle>
                      Đang ghi nhận thông tin của bạn
                    </AlertDialogTitle>
                    <LoadingSpinner />
                  </AlertDialogContent>
                </AlertDialog>
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
                      <AlertDialogTitle>
                        Bạn có chắc chắn chưa?
                      </AlertDialogTitle>
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
      ) : (
        <div className="flex flex-col items-center justify-between mt-3 gap-3">
          <IoMdCheckmarkCircle fill="green" size={69} />
          <h1 className="font-semibold text-xl text-green-700 text-center">
            Xin chúc mừng! Bạn đã gửi đơn thành công đến{" "}
            {lowercaseFirstLetter(FULL_CORE_TITLE(department)!)}.
          </h1>
          <p className="text-green-700 text-center">
            Hãy kiểm tra email của bạn để biết thêm thông tin chi tiết!
          </p>
          <NavigationButton
            noArrow={true}
            text="Xem các ban khác"
            href="/recruit/job-description"
            button_className="bg-green-700"
          />
        </div>
      )}
    </>
  );
};

export default ApplyForm;
