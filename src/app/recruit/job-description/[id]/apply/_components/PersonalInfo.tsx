import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import QuestionFallBack from "./QuestionFallBack";
import { INFO_MAX_CHARACTER } from "@/constants/constants";
import { FaRegIdCard, FaUserCircle } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { GrMail } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

interface PersonalInfoProps {
  studentID: string;
  setStudentID: React.Dispatch<React.SetStateAction<string>>;
  schoolEmail: string;
  setSchoolEmail: React.Dispatch<React.SetStateAction<string>>;
  manual: boolean;
  setManual: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  isFetching: boolean;
}

const PersonalInfo = ({
  form,
  studentID,
  isFetching,
  setStudentID,
  schoolEmail,
  setSchoolEmail,
  manual,
  setManual,
}: PersonalInfoProps) => {
  return (
    <>
      <h1 className="font-bold text-2xl text-primary">Thông tin cá nhân</h1>
      <FormField
        control={form.control}
        name="name"
        render={({ field: { onChange, value, ref } }) => (
          <FormItem className="bg-white rounded p-4">
            <FormLabel className="text-md">1. Họ và tên</FormLabel>
            <FormControl>
              {isFetching ? (
                <QuestionFallBack />
              ) : (
                <div className="relative">
                  <FaUserCircle className="absolute top-[27%] left-3 fill-primary" />
                  <Input
                    className="pl-9"
                    maxLength={INFO_MAX_CHARACTER + 1}
                    value={value}
                    ref={ref}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                  />
                </div>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="student_id"
        render={({ field: { onChange, ref } }) => (
          <FormItem className="bg-white rounded p-4">
            <FormLabel className="text-md">2. Mã số học sinh</FormLabel>
            <FormControl>
              {isFetching ? (
                <QuestionFallBack />
              ) : (
                <div className="relative">
                  <FaRegIdCard className="absolute top-[27%] left-3 fill-primary" />
                  <Input
                    className="pl-9"
                    maxLength={INFO_MAX_CHARACTER + 1}
                    ref={ref}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(e);
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
                </div>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="class"
        render={({ field: { onChange, value, ref } }) => (
          <FormItem className="bg-white rounded p-4">
            <FormLabel className="text-md">3. Lớp</FormLabel>
            <FormControl>
              {isFetching ? (
                <QuestionFallBack />
              ) : (
                <div className="relative">
                  <SiGoogleclassroom className="absolute top-[27%] left-3 fill-primary" />
                  <Input
                    className="pl-9"
                    maxLength={INFO_MAX_CHARACTER + 1}
                    value={value}
                    ref={ref}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                  />
                </div>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="school_email"
        render={({ field: { onChange, ref } }) => (
          <FormItem className="bg-white rounded p-4">
            <FormLabel className="text-md">4. Email trường</FormLabel>
            <FormControl>
              {isFetching ? (
                <QuestionFallBack />
              ) : (
                <div className="relative">
                  <GrMail className="absolute top-[27%] left-3 fill-primary" />
                  <Input
                    className="pl-9"
                    maxLength={INFO_MAX_CHARACTER + 1}
                    value={schoolEmail}
                    ref={ref}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(e);
                      if (!manual) {
                        setManual(!manual);
                      }
                      setSchoolEmail(e.target.value);
                    }}
                  />
                </div>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="private_email"
        render={({ field: { onChange, value, ref } }) => (
          <FormItem className="bg-white rounded p-4">
            <FormLabel className="text-md">
              5. Email riêng {`(để làm việc)`}
            </FormLabel>
            <FormControl>
              {isFetching ? (
                <QuestionFallBack />
              ) : (
                <div className="relative">
                  <GrMail className="absolute top-[27%] left-3 fill-primary" />
                  <Input
                    className="pl-9"
                    maxLength={INFO_MAX_CHARACTER + 1}
                    value={value}
                    ref={ref}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                  />
                </div>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="facebook"
        render={({ field: { onChange, value, ref } }) => (
          <FormItem className="bg-white rounded p-4">
            <FormLabel className="text-md">
              6. Link profile <span className="text-[#0966ff]">Facebook</span>
            </FormLabel>
            <FormControl>
              {isFetching ? (
                <QuestionFallBack />
              ) : (
                <div className="relative">
                  <FaFacebook className="absolute top-[27%] left-3 fill-[#0966ff]" />
                  <Input
                    className="pl-9"
                    maxLength={INFO_MAX_CHARACTER * 5 + 1}
                    value={value}
                    ref={ref}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                  />
                </div>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="instagram"
        render={({ field: { onChange, value, ref } }) => (
          <FormItem className="bg-white rounded p-4">
            <FormLabel className="text-md">
              7. Link profile <span className="text-[#E1306C]">Instagram</span>
            </FormLabel>
            <FormControl>
              {isFetching ? (
                <QuestionFallBack />
              ) : (
                <div className="relative">
                  <FaInstagram className="absolute top-[27%] left-3 fill-[#E1306C]" />

                  <Input
                    className="pl-9"
                    maxLength={INFO_MAX_CHARACTER * 5 + 1}
                    value={value}
                    ref={ref}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                  />
                </div>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PersonalInfo;
