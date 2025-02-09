"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import {PersonalInfoSchema, PersonalInfoSchemaDefault} from "../_schema/PersonalInfoSchema";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form} from "@/components/ui/form";
import {useEffect, useMemo, useState} from "react";
import SubmitComfirmDialog from "@/components/SubmitComfirmDialog";
import Image from "next/image";
import {useToast} from "@/hooks/use-toast";
import {Toaster} from "@/components/ui/toaster";
import {useDebounce} from "@/hooks/useDebounce";
import {useNavigationGuard} from "next-navigation-guard";
import SubmittingDialog from "@/components/SubmittingDialog";
import {submitForm} from "../_lib/SubmitForm";
import FormState from "@/components/FormState";
import Script from "next/script";
import {usePathname} from "next/navigation";
import SuccessScreen from "./SuccessScreen";
import FormFields from "./FormFields";
import {WORKSHOP_SIGNUP_COUNTDOWN_DATE, WorkshopType} from "../constants/constants";
import Countdown from "@/components/Countdown";
import {calculateTimeLeft, TimeLeft} from "@/lib/utils";

const SignUpForm = ({bannerSrc, workshopType}: {bannerSrc: string; workshopType: WorkshopType}) => {
  const [isFetching, setIsFetching] = useState(true);
  const {toast} = useToast();
  const [studentID, setStudentID] = useState("VS");
  const [schoolEmail, setSchoolEmail] = useState("@stu.vinschool.edu.vn");
  const [manual, setManual] = useState(false);
  const [initialData, setInitialData] = useState<z.infer<typeof PersonalInfoSchema> | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNewuser, setIsNewUser] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>({days: "99", hours: "99", minutes: "99", seconds: "99"});

  const form = useForm<z.infer<typeof PersonalInfoSchema>>({
    resolver: zodResolver(PersonalInfoSchema),
    mode: "onChange",
    defaultValues: {class: "", private_email: "", school_email: "@stu.vinschool.edu.vn", name: "", phone: "", student_id: "VS"},
  });

  const {formState, setValue} = form;

  async function onSubmit(values: z.infer<typeof PersonalInfoSchema>) {
    setIsSubmitting(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const token = (window as any).turnstile?.getResponse();

    if (!token) {
      toast({
        variant: "destructive",
        title: "Lỗi xác thực!",
        description: "Vui lòng xác nhận bạn không phải robot.",
        duration: 3000,
      });
      setIsSubmitting(false);
      return;
    }

    const result = await submitForm(values, token, workshopType);

    if (result.success) {
      toast({
        title: "Đăng ký thành công!",
        description: "Thông tin của bạn đã được ghi nhận.",
        style: {background: "#16a34a", color: "white"},
        duration: 3000,
      });
      setisSubmitted(true);
      localStorage.setItem(
        "workshop-cache",
        JSON.stringify({
          data: values,
          isSubmitted: true,
        })
      );
    } else {
      toast({
        variant: "destructive",
        title: "Đã có lỗi xảy ra!",
        description: "Vui lòng thử lại sau.",
        duration: 3000,
      });
    }

    setIsSubmitting(false);
  }

  useEffect(() => {
    if (initialData && isFetching) {
      Object.keys(PersonalInfoSchemaDefault).forEach((field) => {
        if (initialData[field as keyof z.infer<typeof PersonalInfoSchema>]) {
          setValue(field as keyof z.infer<typeof PersonalInfoSchema>, initialData[field as keyof z.infer<typeof PersonalInfoSchema>]);
        }
      });
      setManual(initialData.school_email == "@stu.vinschool.edu.vn" && initialData.student_id == "VS" ? false : true);
      setSchoolEmail(initialData.school_email);
      setStudentID(initialData.student_id);

      if (!isNewuser) {
        toast({
          title: "Tiến trình của bạn đã được khôi phục",
          description: `Hãy tiếp tục trả lời nhé!`,
          style: {background: "#16a34a", color: "white"},
          duration: 3000,
        });
      }

      setIsFetching(false);
    }
  }, [initialData, isFetching, isNewuser, setValue, toast]);

  useEffect(() => {
    if (!hasInteracted && form.formState.isDirty) {
      setHasInteracted(true);
    }
  }, [form.formState.isDirty, hasInteracted]);

  useEffect(() => {
    setIsFetching(true);
    if (typeof window !== "undefined") {
      const cacheData = localStorage.getItem("workshop-cache");
      if (!cacheData) {
        localStorage.setItem(
          "workshop-cache",
          JSON.stringify({
            data: PersonalInfoSchemaDefault,
            isSubmitted: false,
          })
        );
        setInitialData(PersonalInfoSchemaDefault);
        setIsNewUser(true);
      } else {
        const parsedCache = JSON.parse(cacheData);
        setInitialData(parsedCache.data);
        setisSubmitted(parsedCache.isSubmitted);
      }
    }
  }, []);

  useEffect(() => {
    if (initialData && isFetching) {
    }
  }, [initialData, isFetching]);

  useEffect(() => {
    if (Object.keys(formState.errors).length > 0) {
      toast({
        variant: "destructive",
        title: "Lưu ý!",
        description: `Vui lòng kiểm tra lại thông tin cá nhân.`,
        duration: 3000,
      });
    }
  }, [formState.errors, toast]);

  const watchedValues = useMemo(() => form.watch(), [form]);
  const debouncedValues = useDebounce({
    value: watchedValues,
    delay: 1000,
    setIsSaving,
    hasInteracted,
  });

  useEffect(() => {
    function save() {
      if (!isSubmitting) {
        localStorage.setItem(
          "workshop-cache",
          JSON.stringify({
            data: debouncedValues,
            isSubmitted: isSubmitted,
          })
        );
      }
    }
    if (hasInteracted && debouncedValues) {
      setIsSaving(false);
      save();
    }
  }, [debouncedValues, hasInteracted, isSubmitting, isSubmitted]);

  const navGuard = useNavigationGuard({
    enabled: isSaving || isSubmitting,
  });

  useEffect(() => {
    async function check() {
      if (navGuard.active && !isSubmitting) {
        if (!isSubmitted) {
          localStorage.setItem(
            "workshop-cache",
            JSON.stringify({
              data: debouncedValues,
              isSubmitted: isSubmitted,
            })
          );
        }
        navGuard.accept();
      }
    }
    check();
  }, [debouncedValues, isSubmitted, isSubmitting, navGuard]);

  const resetForm = () => {
    localStorage.setItem(
      "workshop-cache",
      JSON.stringify({
        data: PersonalInfoSchemaDefault,
        isSubmitted: false,
      })
    );
    form.reset(PersonalInfoSchemaDefault);
    setisSubmitted(false);
    setInitialData(PersonalInfoSchemaDefault);
    setIsFetching(true);
    setStudentID("VS");
    setSchoolEmail("@stu.vinschool.edu.vn");
    setManual(false);
    setIsSaving(false);
    setHasInteracted(false);
    setIsSubmitting(false);
    setIsNewUser(true);
  };

  const pathname = usePathname();

  useEffect(() => {
    const turnstileContainers = document.querySelectorAll(".cf-turnstile");
    turnstileContainers.forEach((turnstileContainer) => {
      turnstileContainer.innerHTML = "";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== "undefined" && (window as any).turnstile) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).turnstile.render(turnstileContainer, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
          callback: "javascriptCallback",
        });
      }
    });
  }, [pathname, isSubmitted]);

  useEffect(() => {
    if (calculateTimeLeft(WORKSHOP_SIGNUP_COUNTDOWN_DATE[workshopType])) {
      const timer = setInterval(() => {
        const newTimeLeft = calculateTimeLeft(WORKSHOP_SIGNUP_COUNTDOWN_DATE[workshopType]);
        setTimeLeft(newTimeLeft);
        if (newTimeLeft === null) {
          clearInterval(timer);
        }
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setTimeLeft(null);
    }
  }, [workshopType]);

  return (
    <>
      <FormState
        includeText={false}
        isSaving={isSaving}
        isFetching={isFetching}
      />

      {isSubmitted ? (
        <SuccessScreen resetForm={resetForm} />
      ) : !timeLeft ? (
        <div className="flex flex-col items-center justify-center p-10">
          <h1 className="text-red-600 text-balance uppercase font-bold text-2xl mt-4">Đăng ký workshop đã kết thúc</h1>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[750px] w-full pt-2 p-8"
          >
            <Image
              src={bannerSrc}
              quality={100}
              height={120}
              width={500}
              alt="banner"
              className="w-full rounded max-w-[700px]"
            />
            <div className="w-full mt-6 bg-background rounded p-5 py-6 flex flex-col border border-t-8 border-primary">
              <h1 className="text-primary-orange text-3xl font-bold text-center">ĐĂNG KÝ THAM GIA WORKSHOP WIREBUZZING</h1>
              <p className="text-lg text-justify mt-4">
                Thân chào bạn! VECTR đã quay trở lại với Workshop thứ 2 - <span className="text-primary">Wirebuzzing</span>, nơi các bạn sẽ có cơ hội
                được tự tay tạo nên cho mình một phiên bản của trò chơi Wirebuzzing và khám phá thế giới của điện, những ứng dụng của chúng, và thắp
                lên ngọn lửa đam mê trên hành trình trở thành một kỹ sư tài ba!
              </p>
              <h3 className="text-primary-orange text-lg font-bold mt-5">🎯Đến với Workshop WebDev của VECTR, mọi người sẽ có cơ hội:</h3>
              <ul className="list-decimal ml-12 mt-4 flex gap-1 flex-col">
                <li className="text-lg">
                  <p>
                    Giới thiệu và bước chân vào thế giới của vật lý - điện tử, thông qua những kiến thức nền tảng được truyền đạt một cách dễ nắm bắt
                    từ thành viên đội ngũ VECTR
                  </p>
                </li>
                <li className="text-lg">
                  <p>Trang bị cho mình kỹ năng thực hành, tự tay tạo nên phiên bản Wirebuzzing cho chính bạn!</p>
                </li>
              </ul>
              <h3 className="text-primary-orange text-lg font-bold mt-5">⏰Thông tin chi tiết:</h3>
              <ul className="list-disc ml-12 mt-4 flex gap-1 flex-col">
                <li className="text-lg">
                  <p>
                    Địa điểm: <span className="font-bold">phòng 229</span> - Innovation Center, khối Trung học, Vinschool Central Park
                  </p>
                </li>
                <li className="text-lg">
                  <p>
                    Ngày diễn ra: <span className="font-bold">Thứ 6, ngày 21/02/2025</span>
                  </p>
                </li>
                <li className="text-lg">
                  <p>
                    Thời gian: <span className="font-bold">16h00 - 18h00</span>
                  </p>
                </li>
                <li className="text-lg">
                  <p>
                    Chi phí tham dự: <span className="font-bold">miễn phí</span>
                  </p>
                </li>
              </ul>
              <h3 className="text-primary-orange text-lg font-bold mt-5">❗Yêu cầu dành cho người tham dự:</h3>
              <ul className="list-none ml-5 mt-4 flex gap-1 flex-col">
                <li className="text-lg">
                  <p>🔷 Dành cho học sinh từ lớp 6 - 12 đang học tại Vinschool Central Park.</p>
                </li>
                <li className="text-lg">
                  <p>🔷 Một tinh thần mê tìm tòi, thích khám phá, sẵn sàng để điện não hoạt động hết công suất!</p>
                </li>
              </ul>
              <h3 className="text-primary-orange text-lg font-bold mt-5">
                🤩🔥Số lượng có hạn - đừng bỏ lỡ cơ hội để bước chân vào thế giới kỳ diệu của vật lý và điện tử nhé!
              </h3>
            </div>

            <Countdown
              targetDate={WORKSHOP_SIGNUP_COUNTDOWN_DATE[workshopType]}
              countdownTitle={`Countdown đăng ký workshop ${workshopType}`}
              expiredText="Hẹn gặp lại bạn ở buổi workshop"
            />
            <FormFields
              form={form}
              studentID={studentID}
              setStudentID={setStudentID}
              schoolEmail={schoolEmail}
              setSchoolEmail={setSchoolEmail}
              manual={manual}
              setManual={setManual}
            />
            <div className="w-full mt-6 bg-background rounded p-5 py-6 flex flex-col border border-slate-300">
              <h3 className="text-md font-bold ">CẢM ƠN CÁC BẠN ĐÃ ĐĂNG KÝ THAM GIA WORKSHOP WEBDEV CỦA VECTR</h3>
              <p>Chúng mình sẽ sớm gửi đơn xác nhận thông qua email sau. Các bạn hãy theo dõi inbox email của mình thường xuyên nhé!</p>
            </div>
            <div className="mt-4 flex flex-col gap-4 items-center justify-center">
              <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                async
                defer
              ></Script>
              <div
                className="cf-turnstile"
                data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                data-callback="javascriptCallback"
              ></div>

              <SubmitComfirmDialog
                form={form}
                isFetching={isFetching}
                onSubmit={onSubmit}
              />
              <SubmittingDialog
                isSubmitting={isSubmitting}
                navGuard={navGuard.active}
              />
            </div>
          </form>
        </Form>
      )}
      <Toaster />
    </>
  );
};

export default SignUpForm;
