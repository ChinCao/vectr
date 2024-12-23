import {SignUp} from "@clerk/nextjs";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Đăng ký vào VECTR",
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
