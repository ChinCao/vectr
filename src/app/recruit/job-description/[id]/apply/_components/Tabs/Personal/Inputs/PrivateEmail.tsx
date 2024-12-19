import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { INFO_MAX_CHARACTER } from "@/app/recruit/_constants/constants";
import { GrMail } from "react-icons/gr";
import { Input } from "@/components/ui/input";
import QuestionFallBack from "../../../FallBacks/QuestionFallBack";
import { PersonalInfoProps } from "./_types/PersonalProps";

const PrivateEmail = ({ form, isFetching }: PersonalInfoProps) => {
  return (
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
  );
};

export default PrivateEmail;
