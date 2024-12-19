/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

import useSound from "use-sound";
import {
  CLICK_SOUND_URL,
  CLICK_SOUND_VOLUME,
  DepartmentsAbbreviation,
} from "@/app/recruit/_constants/constants";
import { Progress } from "@/components/ui/progress";
import PersonalInfo from "./PersonalInfoTab";
import GeneralQuestions from "./GeneralQuestionsTab";
import DepartmentQuestions from "./DepartmentQuestionTab";
import ApplyTabTrigger from "./FormTabTrigger";
import {
  PersonalInfoSchema,
  PersonalInfoSchemaDefault,
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
import { useRouter } from "next/navigation";
import SubmitSuccess from "./SubmitSuccess";
import {
  DynamicQuestionsDefaults,
  DynamicQuestionsSchema,
} from "../_schema/DynamicQuestionsSchema";
import { FormTabs, FormType } from "../_types/FormTypes";
import SubmitComfirmDialog from "./SubmitComfirmDialog";
import SubmittingDialog from "./SubmittingDialog";
import { SaveToDatabase } from "../_lib/SaveToDatabase";
import { FormDataStructure } from "@/app/recruit/_types/RecruitTypes";
import FormatResponse from "../_lib/FormatResponse";

const ApplyForm = ({
  department_questions,
  general_questions,
  department,
}: {
  department_questions: string[][];
  general_questions: string[][];
  department: DepartmentsAbbreviation;
}) => {
  const router = useRouter();
  useEffect(() => router.refresh(), [router]);

  const [activeTab, setActiveTab] = useState<FormTabs>("personal-info");
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
  const questions_id = useMemo(
    () => [...department_questions[0], ...general_questions[0]],
    [department_questions, general_questions]
  );

  const DynamicSchema = DynamicQuestionsSchema(questions_id);
  const DynamicQuestionsDefault = DynamicQuestionsDefaults(questions_id);

  const formSchema = z.object({
    ...PersonalInfoSchema.shape,
    ...DynamicSchema.shape,
  });

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...PersonalInfoSchemaDefault,
      ...DynamicQuestionsDefault,
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
      interface Recruit {
        recruit: FormDataStructure;
      }
      const data: Recruit = await res.json();
      if (!res.ok) {
        const errorMessage = await res.text();
        return NextResponse.json({ error: errorMessage }, { status: 200 });
      }
      if (data.recruit) {
        if (
          data["recruit"]["department_questions"]["response"][department][
            "hasSubmitted"
          ]
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

        for (const question of questions_id) {
          if (department_questions[0].includes(question)) {
            if (
              data.recruit.department_questions.response[department][
                "questions"
              ]
            ) {
              form.setValue(
                question as any,
                data.recruit.department_questions.response[department][
                  "questions"
                ][question]["answer"]
              );
            }
          } else if (general_questions[0].includes(question)) {
            if (data.recruit.general_questions.response) {
              form.setValue(
                question as any,
                data.recruit.general_questions.response[question]["answer"]
              );
            }
          }
        }
      } else {
        setNewUser(true);
      }

      setIsFetching(false);
    }
    if (user?.id) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, hasSubmit, isFetching]);

  const onSubmit = async (values: FormType) => {
    if (!isSubmitting) {
      const sanitized_data = FormatResponse(
        user!.id,
        values,
        department_questions,
        general_questions,
        department
      );
      await SaveToDatabase(sanitized_data, true, department);
    }
  };
  const [isSaved, setIsSaved] = useState(true);
  const watchedValues = useMemo(() => form.watch(), [form]);
  const debouncedValues = useDebounce(watchedValues, 2000, setIsSaved);
  useEffect(() => {
    async function save() {
      if (debouncedValues && !isFetching && !hasSubmit && !isSubmitting) {
        const sanitized_data = FormatResponse(
          user!.id,
          watchedValues,
          department_questions,
          general_questions,
          department
        );
        await SaveToDatabase(sanitized_data, false, department);
      } else if (hasSubmit) {
        setIsSaved(true);
      }
    }
    if (user?.id) {
      save();
    }
  }, [user?.id, debouncedValues, hasSubmit, newUser, isSubmitting]);

  const navGuard = useNavigationGuard({
    enabled: !isSaved && !hasSubmit,
  });

  useEffect(() => {
    async function check() {
      if (navGuard.active) {
        const sanitized_data = FormatResponse(
          user!.id,
          watchedValues,
          department_questions,
          general_questions,
          department
        );
        await SaveToDatabase(sanitized_data, false, department);
        navGuard.accept();
      }
    }
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navGuard, isSaved]);

  useEffect(() => {
    const hasPersonalInfoErrors = Object.keys(formState.errors).some((key) =>
      Object.keys(PersonalInfoSchemaDefault).includes(key)
    );
    const hasDepartmentErrors = Object.keys(formState.errors).some((key) =>
      department_questions[0].includes(key)
    );
    const hasGeneralErrors = Object.keys(formState.errors).some((key) =>
      general_questions[0].includes(key)
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
            Đóng
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
    questions_id,
    formState.errors,
    playClick,
    toast,
    department_questions,
    general_questions,
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
            className="space-y-8 w-full flex items-center justify-center"
          >
            <Tabs
              defaultValue="personal-info"
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as FormTabs)}
              className="px-2 lg:px-12 py-8 mt-8 w-full lg:w-[80%]"
            >
              {isSaved && !isFetching ? (
                <div className="flex items-center justify-start gap-4 mb-4 text-green-900 flex-col sm:flex-row">
                  <MdOutlineCloudDone /> Mọi dữ liệu đã được lưu
                </div>
              ) : isFetching ? (
                <div className="flex items-center justify-start gap-4 mb-4 text-primary flex-col sm:flex-row">
                  <MdOutlineCloudDownload />
                  <p className="text-center">
                    Đang lấy thông tin từ cơ sở dữ liệu
                  </p>
                </div>
              ) : !isSaved ? (
                <div className="flex items-center justify-start gap-4 mb-4 text-red-600 flex-col sm:flex-row">
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
                className="flex flex-col gap-4 rounded"
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

                <TabsList className="w-full bg-[transparent]">
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
                  general_questions={general_questions}
                  isFetching={isFetching}
                />
                <TabsList className="w-full flex flex-col gap-5 mt-4 bg-[transparent]">
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
                className="flex flex-col gap-4"
              >
                <DepartmentQuestions
                  form={form}
                  isFetching={isFetching}
                  department_questions={department_questions}
                />
                <TabsList className="w-full flex flex-col gap-5 my-4 bg-[transparent]">
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
                <SubmittingDialog isSubmitting={isSubmitting} />
                <SubmitComfirmDialog onSubmit={onSubmit} form={form} />
              </TabsContent>
            </Tabs>
            <Toaster />
          </form>
        </Form>
      ) : (
        <SubmitSuccess department={department} />
      )}
    </>
  );
};

export default ApplyForm;
