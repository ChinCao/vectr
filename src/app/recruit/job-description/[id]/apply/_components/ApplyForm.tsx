"use client";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form} from "@/components/ui/form";
import {useEffect, useMemo, useState} from "react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useToast} from "@/hooks/use-toast";
import {Toaster} from "@/components/ui/toaster";
import useSound from "use-sound";
import {BLANK_FORM_DATA, CLICK_SOUND_URL, CLICK_SOUND_VOLUME, DepartmentsAbbreviation, FORM_CLOSE_DAY} from "@/app/recruit/_constants/constants";
import {PersonalInfoSchema, PersonalInfoSchemaDefault} from "../_schema/PersonalInfoSchema";
import {useUser} from "@clerk/clerk-react";
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
import PersonalInfoTabContent from "./Tabs/Personal/PersonalInfoTabContent";
import GeneralQuestionsTabContent from "./Tabs/General/GeneralQuestionsTabContent";
import DepartmentQuestionsTabContent from "./Tabs/Department/DepartmentQuestionsTabContent";
import CreateFormatResponse from "../_lib/FormatFormData";
import CheckError from "../_lib/CheckError";
import Image from "next/image";
import {calculateTimeLeft, TimeLeft} from "@/lib/utils";
import ErrorMessage from "@/app/recruit/_components/ErrorMessage";
import {saveToLocalStorage} from "../_lib/SaveToLocalStorage";

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
  const {user, isSignedIn} = useUser();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>({days: "99", hours: "99", minutes: "99", seconds: "99"});
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [initialData, setInitialData] = useState<Recruit | undefined>(undefined);
  const [studentID, setStudentID] = useState("VS");
  const [schoolEmail, setSchoolEmail] = useState("@stu.vinschool.edu.vn");
  const [manual, setManual] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [isNewuser, setIsNewUser] = useState(false);

  const questions_id = useMemo(() => [...department_questions[0], ...general_questions[0]], [department_questions, general_questions]);
  useEffect(() => {
    if (!isSignedIn && !isFetching) {
      router.push("/");
    }
  }, [isFetching, isSignedIn, router]);
  useEffect(() => {
    if (calculateTimeLeft(FORM_CLOSE_DAY)) {
      const timer = setInterval(async () => {
        const newTimeLeft = calculateTimeLeft(FORM_CLOSE_DAY);
        setTimeLeft(newTimeLeft);
        if (newTimeLeft === null) {
          clearInterval(timer);
        }
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setTimeLeft(null);
    }
  }, []);

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
      if (typeof window !== "undefined") {
        const cacheData = localStorage.getItem("recruit-cache");
        if (!cacheData) {
          const res = await fetch("/api/recruit/get", {
            method: "POST",
            body: JSON.stringify({user_id: user?.id, department: null}),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!res.ok) {
            setErrorMessage("Không thể lấy được câu trả lời từ cơ sở dữ liệu!");
          }
          const data: Recruit = await res.json();
          if (data.recruit) {
            if (data["recruit"]["department_questions"]["response"][department]!["hasSubmitted"]) {
              localStorage.setItem("recruit-cache", JSON.stringify(data));
              setisSubmitted(true);
              setIsFetching(false);
              return;
            }
            localStorage.setItem("recruit-cache", JSON.stringify(data));
            setInitialData(data);
          } else {
            localStorage.setItem("recruit-cache", JSON.stringify({recruit: BLANK_FORM_DATA}));
            setInitialData({recruit: BLANK_FORM_DATA});
            setIsNewUser(true);
          }
        } else {
          const data: Recruit = JSON.parse(cacheData);
          const res = await fetch("/api/recruit/get", {
            method: "POST",
            body: JSON.stringify({user_id: user?.id, department: department}),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!res.ok) {
            setErrorMessage("Không thể lấy được câu trả lời từ cơ sở dữ liệu!");
          }
          const checkSubmit: Recruit = await res.json();

          if (checkSubmit.recruit) {
            if (checkSubmit["recruit"]["department_questions"]["response"][department]!["hasSubmitted"]) {
              setisSubmitted(true);
              setIsFetching(false);
              return;
            }
          }
          setInitialData(data);
        }
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
          if (initialData.recruit.department_questions.response[department]["questions"]![question]) {
            setValue(question, initialData.recruit.department_questions.response[department]["questions"]![question]["answer"]);
          }
        } else if (general_questions[0].includes(question)) {
          if (initialData.recruit.general_questions.response[question]) {
            setValue(question, initialData.recruit.general_questions.response[question]["answer"]);
          }
        }
      }
      if (!isNewuser) {
        toast({
          title: "Tiến trình của bạn đã được khôi phục",
          description: `Hãy tiếp tục trả lời nhé!`,
          style: {background: "#16a34a", color: "white"},
          duration: 2000,
        });
      }
      setIsFetching(false);
    }
  }, [department, department_questions, general_questions, initialData, isFetching, isNewuser, playClick, questions_id, setValue, toast]);

  const watchedValues = useMemo(() => form.watch(), [form]);
  const debouncedValues = useDebounce(watchedValues, 1000, setIsSaving, hasInteracted);

  useEffect(() => {
    async function save() {
      if (!isSubmitted && !isSubmitting) {
        const sanitized_data = formattedFormData(debouncedValues, false);
        if (isSignedIn) {
          saveToLocalStorage(sanitized_data, initialData!, department);
        }
        await SaveToDatabase(sanitized_data, false, department, setIsSubmitting, setIsSaving, setisSubmitted, setErrorMessage);
      } else if (isSubmitted) {
        setIsSaving(false);
      }
    }
    if (hasInteracted && debouncedValues) {
      if (!user?.id) {
        router.refresh();
      }
      save();
    }
  }, [isSubmitted, isSubmitting, formattedFormData, department, debouncedValues, hasInteracted, user?.id, router, initialData, isSignedIn]);

  const navGuard = useNavigationGuard({
    enabled: isSaving || isSubmitting,
  });

  useEffect(() => {
    async function check() {
      if (navGuard.active && isSignedIn && !isSubmitting) {
        if (!isSubmitted) {
          const sanitized_data = formattedFormData(watchedValues, false);
          if (isSignedIn) {
            saveToLocalStorage(sanitized_data, initialData!, department);
          }
          await SaveToDatabase(sanitized_data, false, department, setIsSubmitting, setIsSaving, setisSubmitted, setErrorMessage);
        }

        navGuard.accept();
      }
    }
    check();
  }, [navGuard, isSaving, formattedFormData, watchedValues, department, isSignedIn, initialData, isSubmitting, isSubmitted]);

  useEffect(() => {
    const error_check = CheckError(formState.errors, department_questions, general_questions, setActiveTab, activeTab);
    if (error_check) {
      toast({
        title: "Lưu ý!",
        description: `Vui lòng kiểm tra lại ${error_check}.`,
        style: {background: "#ef4444", color: "white"},
        duration: 2000,
      });
    }
  }, [activeTab, questions_id, formState.errors, playClick, toast, department_questions, general_questions]);

  const onSubmit = async (values: FormType) => {
    if (!isSubmitting) {
      const sanitized_data = formattedFormData(values, true);
      if (isSignedIn) {
        saveToLocalStorage(sanitized_data, initialData!, department);
      }
      await SaveToDatabase(sanitized_data, true, department, setIsSubmitting, setIsSaving, setisSubmitted, setErrorMessage);
    }
  };

  return (
    <>
      {!errorMessage ? (
        <div className="flex flex-col gap-4 items-center justify-center relative">
          <SubmittingDialog
            isSubmitting={isSubmitting}
            navGuard={navGuard.active}
          />
          {!timeLeft ? <h1 className="text-red-600 text-balance uppercase font-bold text-2xl mt-4">Vòng gửi đơn đã kết thúc</h1> : null}
          {!isSubmitted && timeLeft ? (
            <Form {...form}>
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
                  <TabsList className="flex items-center h-[max-content] justify-center flex-wrap flex-row mb-8 border-2 border-primary p-0">
                    <Image
                      src="/banner.png"
                      width={800}
                      height={200}
                      alt="banner"
                      className="w-full mb-4 rounded-md"
                    />
                    <TabsTrigger
                      value="personal-info"
                      className="flex-1 py-2 mb-2 ml-2"
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
                      className="flex-1 py-2 text-primary mr-2"
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

                  <SubmitComfirmDialog
                    onSubmit={onSubmit}
                    form={form}
                  />
                </Tabs>

                <Toaster />
              </form>
            </Form>
          ) : isSubmitted ? (
            <SubmitSuccess department={department} />
          ) : null}
        </div>
      ) : (
        <ErrorMessage
          message={errorMessage}
          href={`/recruit/job-description/${department}`}
          link_message="Về lại trang job description"
        />
      )}
    </>
  );
};

export default ApplyForm;
