"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import {PersonalInfoSchema, PersonalInfoSchemaDefault} from "../_schema/PersonalInfoSchema";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useEffect, useMemo, useState} from "react";
import SubmitComfirmDialog from "@/components/SubmitComfirmDialog";
import Image from "next/image";
import {useToast} from "@/hooks/use-toast";
import {Toaster} from "@/components/ui/toaster";
import {useDebounce} from "@/hooks/useDebounce";
import SignUpInput from "./SignUpInput";
import {Input} from "@/components/ui/input";
import {useNavigationGuard} from "next-navigation-guard";
import SubmittingDialog from "@/components/SubmittingDialog";
import {submitForm} from "../_lib/SubmitForm";
import {FaCheckCircle} from "react-icons/fa";

const SignUpForm = () => {
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

  const form = useForm<z.infer<typeof PersonalInfoSchema>>({
    resolver: zodResolver(PersonalInfoSchema),
    mode: "onChange",
    defaultValues: {class: "", private_email: "", school_email: "", name: "", phone: "", student_id: ""},
  });

  const {formState, setValue} = form;

  async function onSubmit(values: z.infer<typeof PersonalInfoSchema>) {
    setIsSubmitting(true);
    const result = await submitForm(values);

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
  const debouncedValues = useDebounce(watchedValues, 1000, setIsSaving, hasInteracted);

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

  return (
    <>
      {isSubmitted ? (
        <div className="max-w-[650px] w-full p-10 text-center">
          <Image
            src="/workshop/wirebuzz/7.jpg"
            height={120}
            quality={100}
            width={500}
            alt="banner"
            className="w-full rounded mb-6"
          />
          <div className="bg-background rounded p-6 border border-slate-300 flex flex-col items-center justify-center gap-6">
            <h2 className="text-xl font-semibold mb-4">Bạn đã đăng ký thành công!</h2>

            <p>Thông tin của bạn đã được ghi nhận trong hệ thống.</p>
            <FaCheckCircle
              className="text-green-700"
              size={70}
            />
            <button
              onClick={resetForm}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
            >
              Đăng ký lại
            </button>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[650px] w-full p-10"
          >
            <Image
              src="/workshop/wirebuzz/7.jpg"
              quality={100}
              height={120}
              width={500}
              alt="banner"
              className="w-full rounded"
            />
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem className="mt-6 bg-background rounded p-4 py-6 flex flex-col border border-slate-300">
                  <FormLabel className="text-md mb-4">Họ và tên</FormLabel>
                  <FormControl>
                    <SignUpInput field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="student_id"
              render={({field: {onChange, ref}}) => (
                <FormItem className="mt-6 bg-background rounded p-4 py-6 flex flex-col border border-slate-300">
                  <FormLabel className="text-md mb-4">Mã số HS</FormLabel>
                  <FormControl>
                    <Input
                      className="border-0 border-b-2 shadow-none text-sm  w-[50%] rounded-none focus:outline-none block focus:border-b-primary bg-transparent placeholder:text-[13px]"
                      ref={ref}
                      placeholder="VS"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChange(e);
                        if (!manual) {
                          setSchoolEmail!((e.target.value.match(/\d+/) ? e.target.value.match(/\d+/) : "") + "@stu.vinschool.edu.vn");
                        }
                        setStudentID!(e.target.value);
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
              render={({field}) => (
                <FormItem className="mt-6 bg-background rounded p-4 py-6 flex flex-col border border-slate-300">
                  <FormLabel className="text-md mb-4">Lớp</FormLabel>
                  <FormControl>
                    <SignUpInput field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="school_email"
              render={({field: {onChange, ref}}) => (
                <FormItem className="mt-6 bg-background rounded p-4 py-6 flex flex-col border border-slate-300">
                  <FormLabel className="text-md mb-4">Email trường</FormLabel>
                  <FormControl>
                    <Input
                      className="border-0 border-b-2 shadow-none text-sm  w-[50%] rounded-none focus:outline-none block focus:border-b-primary bg-transparent placeholder:text-[13px]"
                      placeholder="@stu.vinschool.edu.vn"
                      ref={ref}
                      value={schoolEmail}
                      type="email"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChange(e);
                        if (!manual) {
                          setManual!(!manual);
                        }
                        setSchoolEmail!(e.target.value);
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
              render={({field}) => (
                <FormItem className="mt-6 bg-background rounded p-4 py-6 flex flex-col border border-slate-300">
                  <FormLabel className="text-md mb-4">Email riêng</FormLabel>
                  <FormControl>
                    <SignUpInput field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({field}) => (
                <FormItem className="mt-6 bg-background rounded p-4 py-6 flex flex-col border border-slate-300">
                  <FormLabel className="text-md mb-4">Số điện thoại</FormLabel>
                  <FormControl>
                    <SignUpInput field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4">
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
