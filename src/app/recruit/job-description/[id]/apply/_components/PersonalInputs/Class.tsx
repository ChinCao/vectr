import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { INFO_MAX_CHARACTER } from "@/app/recruit/_constants/constants";
import { SiGoogleclassroom } from "react-icons/si";
import QuestionFallBack from "../FallBacks/QuestionFallBack";
import { Input } from "@/components/ui/input";
import { PersonalInfoProps } from "./_types/PersonalProps";

const Class = ({ form, isFetching }: PersonalInfoProps) => {
  return (
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
  );
};

export default Class;
