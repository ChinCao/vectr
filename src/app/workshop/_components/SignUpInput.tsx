import {Input} from "@/components/ui/input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SignupInput = ({field, ...props}: {field: any; [key: string]: any}) => {
  return (
    <Input
      {...field}
      {...props}
      className="border-0 border-b-2 shadow-none text-sm  w-[50%] rounded-none focus:outline-none block focus:border-b-primary bg-transparent placeholder:text-[13px]"
      placeholder="Your answer"
    />
  );
};

export default SignupInput;
