import {FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import {INFO_MAX_CHARACTER} from "@/app/recruit/_constants/constants";
import {FaRegIdCard} from "react-icons/fa";
import {Input} from "@/components/ui/input";
import QuestionFallBack from "../../../FallBacks/QuestionFallBack";
import {PersonalInfoProps} from "./_types/PersonalProps";

const StundentID = ({form, isFetching, manual, studentID, setSchoolEmail, setStudentID}: PersonalInfoProps) => {
  return (
    <FormField
      control={form.control}
      name="student_id"
      render={({field: {onChange, ref}}) => (
        <FormItem className="bg-background rounded p-4">
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
                      setSchoolEmail!((e.target.value.match(/\d+/) ? e.target.value.match(/\d+/) : "") + "@stu.vinschool.edu.vn");
                    }
                    setStudentID!(e.target.value);
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
  );
};

export default StundentID;
