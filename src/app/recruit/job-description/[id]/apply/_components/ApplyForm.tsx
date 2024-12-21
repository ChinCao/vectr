"use client";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form} from "@/components/ui/form";
import {useEffect, useMemo, useState} from "react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useToast} from "@/hooks/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {Toaster} from "@/components/ui/toaster";
import useSound from "use-sound";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME, DepartmentsAbbreviation} from "@/app/recruit/_constants/constants";
import {PersonalInfoSchema, PersonalInfoSchemaDefault} from "../_schema/PersonalInfoSchema";
import {useUser} from "@clerk/clerk-react";
import {NextResponse} from "next/server";
import {useDebounce} from "../_hook/useDebounce";
import {useNavigationGuard} from "next-navigation-guard";
import {useRouter} from "next/navigation";
import SubmitSuccess from "./SubmitSuccess";
import {DynamicQuestionsDefaults, DynamicQuestionsSchema} from "../_schema/DynamicQuestionsSchema";
import {FormTabs, FormType} from "../_types/FormTypes";
import SubmitComfirmDialog from "./SubmitComfirmDialog";
import SubmittingDialog from "./SubmittingDialog";
import {SaveToDatabase} from "../_lib/SaveToDatabase";
import {PersonalInfo, Recruit} from "@/app/recruit/_types/RecruitTypes";
import DataState from "./DataState";
import ProgressBar from "./ProgressBar";
import PersonalInfoTabContent from "./Tabs/Personal/PersonalInfoTabContent";
import GeneralQuestionsTabContent from "./Tabs/General/GeneralQuestionsTabContent";
import DepartmentQuestionsTabContent from "./Tabs/Department/DepartmentQuestionsTabContent";
import CreateFormatResponse from "../_lib/FormatFormData";
import CheckError from "../_lib/CheckError";
import Image from "next/image";

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
  const {toast} = useToast();
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});
  const {user} = useUser();

  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [initialData, setInitialData] = useState<Recruit | undefined>(undefined);
  const [studentID, setStudentID] = useState("VS");
  const [schoolEmail, setSchoolEmail] = useState("@stu.vinschool.edu.vn");
  const [manual, setManual] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // const [error, setError] = useState(false);

  const questions_id = useMemo(() => [...department_questions[0], ...general_questions[0]], [department_questions, general_questions]);

  const formattedFormData = useMemo(
    () => CreateFormatResponse(user?.id, department_questions, general_questions, department),
    [department, department_questions, general_questions, user?.id]
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
  const {formState, setValue} = form;

  useEffect(() => {
    if (!hasInteracted && form.formState.isDirty) {
      setHasInteracted(true);
    }
  }, [form.formState.isDirty, hasInteracted]);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      const res = await fetch("/api/recruit/get", {
        method: "POST",
        body: JSON.stringify({user_id: user?.id, department: department}),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: Recruit = await res.json();
      if (!res.ok) {
        const errorMessage = await res.text();
        return NextResponse.json({error: errorMessage}, {status: 200});
      }
      if (data.recruit) {
        if (data["recruit"]["department_questions"]["response"][department]["hasSubmitted"]) {
          setisSubmitted(true);
          setIsFetching(false);
          return;
        }
        setInitialData(data);
      } else {
        setIsFetching(false);
      }
    }
    if (isFetching && user?.id) {
      fetchData();
    }
  }, [department, isFetching, user?.id]);

  useEffect(() => {
    if (initialData && isFetching) {
      const personalInfo = initialData.recruit.personal_info;

      Object.keys(PersonalInfoSchemaDefault).forEach((field) => {
        if (personalInfo[field as keyof PersonalInfo]) {
          setValue(field, personalInfo[field as keyof PersonalInfo]);
        }
      });
      setManual(personalInfo.school_email == "@stu.vinschool.edu.vn" && personalInfo.student_id == "VS" ? false : true);
      setSchoolEmail(personalInfo.school_email);
      setStudentID(personalInfo.student_id);

      for (const question of questions_id) {
        if (department_questions[0].includes(question)) {
          if (initialData.recruit.department_questions.response[department]["questions"][question]) {
            setValue(question, initialData.recruit.department_questions.response[department]["questions"][question]["answer"]);
          }
        } else if (general_questions[0].includes(question)) {
          if (initialData.recruit.general_questions.response[question]) {
            setValue(question, initialData.recruit.general_questions.response[question]["answer"]);
          }
        }
      }
      setIsFetching(false);
    }
  }, [department, department_questions, general_questions, initialData, isFetching, questions_id, setValue]);

  const watchedValues = useMemo(() => form.watch(), [form]);
  const debouncedValues = useDebounce(watchedValues, 2000, setIsSaving, hasInteracted);

  useEffect(() => {
    async function save() {
      if (!isSubmitted && !isSubmitting) {
        const sanitized_data = formattedFormData(debouncedValues, false);
        await SaveToDatabase(sanitized_data, false, department, setIsSubmitting, setIsSaving, setisSubmitted);
      } else if (isSubmitted) {
        setIsSaving(false);
      }
    }
    if (hasInteracted && debouncedValues) {
      save();
    }
  }, [isSubmitted, isSubmitting, formattedFormData, department, debouncedValues, hasInteracted]);

  const navGuard = useNavigationGuard({
    enabled: isSaving || isSubmitting,
  });

  useEffect(() => {
    async function check() {
      if (navGuard.active) {
        const sanitized_data = formattedFormData(watchedValues, false);
        await SaveToDatabase(sanitized_data, false, department, setIsSubmitting, setIsSaving, setisSubmitted);
        navGuard.accept();
      }
    }
    check();
  }, [navGuard, isSaving, formattedFormData, watchedValues, department]);

  useEffect(() => {
    const error_check = CheckError(formState.errors, department_questions, general_questions, setActiveTab, activeTab);
    if (error_check) {
      toast({
        title: "Lưu ý!",
        description: `Vui lòng kiểm tra lại ${error_check}.`,
        action: (
          <ToastAction
            altText="close"
            onClick={() => playClick()}
          >
            Đóng
          </ToastAction>
        ),
      });
    } else {
      window.scrollTo({
        top: 0,
      });
    }
  }, [activeTab, questions_id, formState.errors, playClick, toast, department_questions, general_questions]);

  const onSubmit = async (values: FormType) => {
    if (!isSubmitting) {
      const sanitized_data = formattedFormData(values, true);
      await SaveToDatabase(sanitized_data, true, department, setIsSubmitting, setIsSaving, setisSubmitted);
    }
  };

  return (
    <>
      {!isSubmitted ? (
        <Form {...form}>
          <ProgressBar activeTab={activeTab} />
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full flex items-center justify-center flex-col max-w-[950px]"
          >
            <Tabs
              defaultValue="personal-info"
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as FormTabs)}
              className="p-0 lg:py-8 pb-0 mt-8 w-full lg:w-[80%]"
            >
              <DataState
                isSaving={isSaving}
                isFetching={isFetching}
              />

              <TabsList className="flex items-center h-[max-content] justify-center flex-wrap flex-row  mb-8">
                <Image
                  src="/banner.png"
                  width={800}
                  height={200}
                  alt="banner"
                  className="w-full mb-4"
                />
                <TabsTrigger
                  value="personal-info"
                  className="flex-1 py-2"
                >
                  Thông tin cá nhân
                </TabsTrigger>
                <TabsTrigger
                  value="general-questions"
                  className="flex-1 py-2"
                >
                  Câu hỏi chung
                </TabsTrigger>
                <TabsTrigger
                  value="department-questions"
                  className="flex-1 py-2 text-primary"
                >
                  Câu hỏi chuyên môn
                </TabsTrigger>
              </TabsList>

              <PersonalInfoTabContent
                form={form}
                isFetching={isFetching}
                studentID={studentID}
                schoolEmail={schoolEmail}
                setSchoolEmail={setSchoolEmail}
                manual={manual}
                setManual={setManual}
                setStudentID={setStudentID}
              />
              <GeneralQuestionsTabContent
                form={form}
                general_questions={general_questions}
                isFetching={isFetching}
              />
              <DepartmentQuestionsTabContent
                form={form}
                isFetching={isFetching}
                department_questions={department_questions}
              />
              <SubmittingDialog
                isSubmitting={isSubmitting}
                navGuard={navGuard.active}
              />
              <SubmitComfirmDialog
                onSubmit={onSubmit}
                form={form}
              />
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
