import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { INFO_MAX_CHARACTER } from "@/app/recruit/_constants/constants";
import { FaFacebook } from "react-icons/fa";
import QuestionFallBack from "../FallBacks/QuestionFallBack";
import { Input } from "@/components/ui/input";
import { PersonalInfoProps } from "./_types/PersonalProps";

const Facebook = ({ form, isFetching }: PersonalInfoProps) => {
  return (
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
  );
};

export default Facebook;
