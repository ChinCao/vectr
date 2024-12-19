"use client";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  CLICK_SOUND_URL,
  CLICK_SOUND_VOLUME,
} from "@/app/recruit/_constants/constants";
import useSound from "use-sound";
import { FormType, Tform } from "../_types/FormTypes";

type OnSubmitFunction = (values: FormType) => Promise<void>;

interface DiaglogProps {
  onSubmit: OnSubmitFunction;
  form: Tform;
}

const SubmitComfirmDialog = ({ form, onSubmit }: DiaglogProps) => {
  const [playClick] = useSound(CLICK_SOUND_URL, { volume: CLICK_SOUND_VOLUME });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="w-full mt-2"
          type="button"
          onClick={() => playClick()}
        >
          Gửi đơn
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn chưa?</AlertDialogTitle>
          <AlertDialogDescription>
            Không thể hoàn tác hành động này và thông tin của bạn sẽ được ghi
            nhận và bạn không thể chỉnh sửa.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => playClick()}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              playClick();
              form.handleSubmit(onSubmit)();
            }}
          >
            Mình chắc
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubmitComfirmDialog;
