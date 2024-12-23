"use client";
import NavigationButton from "@/app/recruit/_components/NavigationButton";
import {AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle} from "./ui/alert-dialog";
import {Button} from "./ui/button";
import {BiSolidError} from "react-icons/bi";
import {DepartmentsAbbreviation} from "@/app/recruit/_constants/constants";

const ErrorMessage = ({
  message,
  href,
  link_message,
  jdError,
  department,
}: {
  message: string;
  href: string;
  link_message: string;
  jdError?: boolean;
  department?: DepartmentsAbbreviation;
}) => {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="flex flex-col items-center justify-center">
        <AlertDialogTitle className="text-red-500">OOPSS! Đã xảy ra lỗi!</AlertDialogTitle>
        <h1 className="font-bold text-red-500 text-center">{message}</h1>
        <BiSolidError
          fill="#ef4444"
          size={70}
        />
        <AlertDialogDescription>Hãy reload lại website hoặc liên lạc VECTR ngay nhé!</AlertDialogDescription>

        <div className="flex items-center justify-center gap-5 flex-wrap">
          <NavigationButton
            direction="left"
            href={href}
            text={link_message}
            className="flex-1"
          />
          <Button
            onClick={() => {
              if (window != undefined) {
                window.location.reload();
              }
            }}
            className="bg-red-500 text-white flex-1"
          >
            Reload
          </Button>
          {jdError ? (
            <NavigationButton
              direction="right"
              href={`/recruit/job-description/${department}/apply`}
              text="Thôi kệ apply luôn!"
              className="flex-1"
              button_className="bg-[#f7c325]"
            />
          ) : null}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ErrorMessage;
