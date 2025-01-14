import {FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import {INFO_MAX_CHARACTER} from "@/app/recruit/_constants/constants";
import {GrMail} from "react-icons/gr";
import {Input} from "@/components/ui/input";
import QuestionFallBack from "../../../FallBacks/QuestionFallBack";
import {PersonalInfoProps} from "./_types/PersonalProps";

const SchoolEmail = ({form, isFetching, manual, schoolEmail, setManual, setSchoolEmail}: PersonalInfoProps) => {
  return (
    <FormField
      control={form.control}
      name="school_email"
      render={({field: {onChange, ref}}) => (
        <FormItem className="bg-background rounded p-4">
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
                  type="email"
                  ref={ref}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(e);
                    if (!manual) {
                      setManual!(!manual);
                    }
                    setSchoolEmail!(e.target.value);
                  }}
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

export default SchoolEmail;
