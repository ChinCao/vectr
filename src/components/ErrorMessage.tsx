"use client";
import NavigationButton from "@/app/recruit/_components/NavigationButton";
import {AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle} from "./ui/alert-dialog";
import {Button} from "./ui/button";
import {BiSolidError} from "react-icons/bi";

const ErrorMessage = () => {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="flex flex-col items-center justify-center">
        <AlertDialogTitle className="text-red-500">OOPSS! Đã xảy ra lỗi!</AlertDialogTitle>
        <BiSolidError
          fill="#ef4444"
          size={70}
        />
        <AlertDialogDescription>Hãy reload lại website hoặc đợi chút nhé!</AlertDialogDescription>

        <div className="flex items-center justify-center gap-5 flex-wrap">
          <NavigationButton
            direction="left"
            href="/recruit"
            text="Về lại trang chủ"
          />
          <Button
            onClick={() => {
              if (window != undefined) {
                window.location.reload();
              }
            }}
            className="bg-red-500 text-white"
          >
            Reload
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ErrorMessage;
