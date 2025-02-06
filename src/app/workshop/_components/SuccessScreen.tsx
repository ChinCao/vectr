import {FaCheckCircle} from "react-icons/fa";

interface SuccessScreenProps {
  resetForm: () => void;
}

const SuccessScreen = ({resetForm}: SuccessScreenProps) => {
  return (
    <div className="max-w-[650px] w-full p-10 text-center">
      <div className="bg-background rounded p-6 border border-slate-300 flex flex-col items-center justify-center gap-6">
        <h2 className="text-xl font-semibold mb-4">Bạn đã đăng ký thành công!</h2>
        <p>Thông tin của bạn đã được ghi nhận trong hệ thống.</p>
        <FaCheckCircle
          className="text-green-700"
          size={70}
        />
        <button
          type="button"
          onClick={resetForm}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
        >
          Đăng ký lại
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
