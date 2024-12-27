import {FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import {INFO_MAX_CHARACTER} from "@/app/recruit/_constants/constants";
import {FaInstagram} from "react-icons/fa";
import {Input} from "@/components/ui/input";
import QuestionFallBack from "../../../FallBacks/QuestionFallBack";
import {PersonalInfoProps} from "./_types/PersonalProps";

const Instagram = ({form, isFetching}: PersonalInfoProps) => {
  return (
    <FormField
      control={form.control}
      name="instagram"
      render={({field: {onChange, value, ref}}) => (
        <FormItem className="bg-white rounded p-4">
          <FormLabel className="text-md">
            7. Link profile <span className="text-primary-instagram_pink">Instagram</span>
          </FormLabel>
          <FormControl>
            {isFetching ? (
              <QuestionFallBack />
            ) : (
              <div className="relative">
                <FaInstagram className="absolute top-[27%] left-3 fill-primary-instagram_pink" />

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

export default Instagram;
