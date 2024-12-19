import NavigationButton from "@/app/recruit/_components/NavigationButton";
import {
  DepartmentsAbbreviation,
  FULL_CORE_TITLE,
} from "@/app/recruit/_constants/constants";
import { lowercaseFirstLetter } from "@/lib/utils";
import { IoMdCheckmarkCircle } from "react-icons/io";

const SubmitSuccess = ({
  department,
}: {
  department: DepartmentsAbbreviation;
}) => {
  return (
    <div className="flex flex-col items-center justify-between mt-3 gap-3">
      <IoMdCheckmarkCircle fill="green" size={69} />
      <h1 className="font-semibold text-xl text-green-700 text-center">
        Xin chúc mừng! Bạn đã gửi đơn thành công đến{" "}
        {lowercaseFirstLetter(FULL_CORE_TITLE(department)!)}.
      </h1>
      <p className="text-green-700 text-center">
        Hãy kiểm tra email của bạn để biết thêm thông tin chi tiết!
      </p>
      <NavigationButton
        noArrow={true}
        text="Xem các ban khác"
        href="/recruit/job-description"
        button_className="bg-green-700"
      />
    </div>
  );
};

export default SubmitSuccess;
