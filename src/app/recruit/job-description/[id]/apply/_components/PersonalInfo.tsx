import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

const PersonalInfo = ({
  form,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
}) => {
  const [studentID, setStudentID] = useState("VS");
  const [schoolEmail, setSchoolEmail] = useState("@stu.vinschool.edu.vn");
  const [manual, setManual] = useState(false);
  return (
    <>
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
              6. Link profile <span className="text-[#0966ff]">Facebook</span>
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PersonalInfo;
