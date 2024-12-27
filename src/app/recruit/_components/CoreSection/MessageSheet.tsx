import Image from "next/image";
import {FULL_DEPARTMENT_TITLE} from "../../_constants/constants";
import NavigationButton from "../NavigationButton";

const MessageSheet = ({message, department, image_url, alt}: {message: string; department: string; image_url: string; alt: string}) => {
  return (
    <div className="flex gap-6 flex-col items-center justify-center">
      <Image
        src={image_url}
        height={250}
        width={250}
        alt={alt}
        className="w-max rounded shadow object-cover mt-4"
      />
      <div className="flex flex-col items-start gap-4">
        <div>
          <h1 className="text-primary uppercase font-bold text-xl">Lời nhắn nhủ</h1>
          <p className="text-justify text-md text-gray-700">{message}</p>
        </div>
        <NavigationButton
          direction="right"
          className="w-full "
          button_className="w-full bg-primary-yellow text-no"
          text={department == "Chọn ban" ? department : `Apply vào ${FULL_DEPARTMENT_TITLE(department)}`}
          href={department == "Chọn ban" ? "/recruit/job-description" : `/recruit/job-description/${department}`}
        />
      </div>
    </div>
  );
};

export default MessageSheet;
