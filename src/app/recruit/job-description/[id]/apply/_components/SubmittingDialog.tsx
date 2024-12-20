import LoadingSpinner from "@/components/LoadingSpinner";
import {AlertDialog, AlertDialogContent, AlertDialogTitle} from "@/components/ui/alert-dialog";

const SubmittingDialog = ({isSubmitting, navGuard}: {isSubmitting: boolean; navGuard: boolean}) => {
  return (
    <AlertDialog open={isSubmitting || navGuard}>
      <AlertDialogContent className="flex flex-col items-center justify-center">
        <AlertDialogTitle>Đang {isSubmitting ? "ghi nhận" : navGuard ? "lưu" : null} thông tin của bạn</AlertDialogTitle>
        <LoadingSpinner />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubmittingDialog;
