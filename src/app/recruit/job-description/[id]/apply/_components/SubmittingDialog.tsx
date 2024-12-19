import LoadingSpinner from "@/components/LoadingSpinner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const SubmittingDialog = ({ isSubmitting }: { isSubmitting: boolean }) => {
  return (
    <AlertDialog open={isSubmitting}>
      <AlertDialogContent className="flex flex-col items-center justify-center">
        <AlertDialogTitle>Đang ghi nhận thông tin của bạn</AlertDialogTitle>
        <LoadingSpinner />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubmittingDialog;
