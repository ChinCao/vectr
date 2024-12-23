import {SignIn} from "@clerk/nextjs";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Đăng nhập vào VECTR",
};

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;
