import NavigationButton from "../NavigationButton";
import ProcessBlock from "./ProcessBlock";

const ProcessSection = () => {
  return (
    <section id="process">
      <div className="container flex flex-col py-24 gap-3">
        <h1 className="text-5xl font-bold text-left ">Quy trình ứng tuyển</h1>
        <p className="text-gray-500 text-xl w-full  text-justify sm:text-left sm:w-[100%]">
          {` VECTR sẽ sàng lọc hồ sơ, phỏng vấn, đánh giá ứng viên tiềm năng, và gửi xác
            nhận đậu vào CLB (update sẽ được gửi qua email).`}
        </p>
        <div className="flex flex-col sm:flex-row gap-8 mt-4">
          <ProcessBlock
            title="01"
            text="Đánh giá đơn tuyển"
          />
          <ProcessBlock
            title="02"
            text="Phỏng vấn"
          />
          <ProcessBlock
            title="03"
            text="Cam kết"
          />
          <ProcessBlock
            title="04"
            text="Gia nhập"
          />
        </div>
        <NavigationButton
          text={"Xem Job Description"}
          direction="right"
          className="mt-4"
          href="/recruit/job-description"
        />
      </div>
    </section>
  );
};

export default ProcessSection;
