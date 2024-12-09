import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const RecruitPage = () => {
  return (
    <>
      <section id="#">
        <div className="container flex items-center justify-around flex-col sm:flex-row pt-10">
          <div className="flex flex-col w-[95%] md:w-[60%] gap-7 order-1 sm:order-[0] items-center sm:items-start sm:w-[45%]">
            <h1 className="text-5xl font-bold text-center sm:text-left">
              Công việc tại VECTR
            </h1>
            <p className="text-gray-500 text-xl w-full text-balance text-justify sm:text-left sm:w-[80%]">
              Ở VECTR, chúng tôi học tập và rèn luyện để trở thành những người
              tiên phong toàn cầu, chúng ta sẽ cùng thiết kế thế giới và công
              nghệ hóa tương lai
            </p>
            <Button className="w-[max-content]">
              <Link href="/recruit/job-description">Xem Job Description</Link>
            </Button>
          </div>
          <Image
            src="/science-puzzles-long-set-qYZNE6.png"
            height={216}
            width={384}
            alt="Puzzle"
            className="w-[230px] md:w-[384px] order-[0] sm:order-1 mb-3 sm:mb-0"
          />
        </div>
      </section>

      <section id="value">
        <div className="container flex flex-col pt-40 gap-7">
          <h1 className="text-5xl font-bold text-center sm:text-left">
            Giá trị của chúng mình
          </h1>
          <p className="text-gray-500 text-[15px]">
            Các Giá trị cốt lõi của VECTR định hướng hành vi, quyết định và hành
            động của chúng mình, cho phép hợp tác thống nhất giữa các ban đa
            dạng trong tổ chức.
          </p>
          <div className="grid grid-cols-2"></div>
        </div>
      </section>
    </>
  );
};

export default RecruitPage;
