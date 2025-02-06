import {FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import SignUpInput from "./SignUpInput";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {PersonalInfoSchema} from "../_schema/PersonalInfoSchema";

interface FormFieldsProps {
  form: UseFormReturn<z.infer<typeof PersonalInfoSchema>>;
  studentID: string;
  setStudentID: (value: string) => void;
  schoolEmail: string;
  setSchoolEmail: (value: string) => void;
  manual: boolean;
  setManual: (value: boolean) => void;
}

const FormFields = ({form, studentID, setStudentID, schoolEmail, setSchoolEmail, manual, setManual}: FormFieldsProps) => {
  return (
    <>
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
    </>
  );
};

export default FormFields;
