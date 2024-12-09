import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

const RecruitPage = () => {
  return (
    <>
      <section id="#">
        <div className="container flex items-center justify-around flex-col sm:flex-row pt-14">
          <div className="flex flex-col w-[95%] md:w-[60%] gap-7 order-1 sm:order-[0] items-center sm:items-start sm:w-[45%]">
            <h1 className="text-5xl font-bold text-center sm:text-left">
              Công việc tại VECTR
            </h1>
            <p className="text-gray-500 text-xl w-full text-balance text-justify sm:text-left sm:w-[80%]">
              Ở VECTR, chúng mình học tập và rèn luyện để trở thành những người
              tiên phong toàn cầu, chúng ta sẽ cùng thiết kế thế giới và công
              nghệ hóa tương lai
            </p>
            <Button className="w-[max-content]">
              <Link
                href="/recruit/job-description"
                className="flex items-center justify-center gap-2"
              >
                Xem Job Description <FaLongArrowAltRight color="white" />
              </Link>
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
          <p className="text-gray-500 text-[15px] text-center sm:text-left">
            Các giá trị cốt lõi của VECTR định hướng hành vi, quyết định và hành
            động của chúng mình, cho phép hợp tác thống nhất giữa các ban đa
            dạng trong tổ chức.
          </p>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
            <div className="border rounded col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col lg:flex-col items-center sm:flex-row">
              <div className="flex flex-col items-start justify-center p-10 pt-0 sm:pt-10 gap-4 order-[1] sm:order-0 ">
                <h3 className="font-semibold text-2xl">
                  Tập trung vào cộng đồng
                </h3>
                <p className="text-gray-500 ">
                  Chúng mình đặt nhu cầu của cộng đồng lên hàng đầu và cung cấp
                  dịch vụ chất lượng để giải quyết các vấn đề thực tế.
                </p>
              </div>
              <Image
                className="w-[150px] lg:w-[300px] order-[0] sm:order-1 pt-5 sm:pt-0"
                src="/user-focused2.svg"
                width={300}
                height={300}
                alt="community"
              />
            </div>

            <div className="border rounded flex col-span-2 lg:col-span-1 flex-col lg:flex-row sm:flex-row items-center">
              <div className="flex items-start justify-center p-10 pt-0 sm:pt-10 gap-4 flex-col order-[1] sm:order-0">
                <h3 className="font-semibold text-2xl">Sự hợp tác</h3>
                <p className="text-gray-500 ">
                  Chúng mình giao tiếp cởi mở và thoải mái. Chúng mình làm việc
                  theo nhóm hướng tới mục tiêu chung là cùng nhau xây dựng cồng
                  động và mang lại giá trị hữu ích.
                </p>
              </div>
              <Image
                className="order-[0] sm:order-1 pt-5 sm:pt-0"
                src="/collaboration2.svg"
                width={150}
                height={300}
                alt="community"
              />
            </div>

            <div className="border rounded flex col-span-2 lg:col-span-1 flex-col lg:flex-row sm:flex-row items-center">
              <div className="flex flex-col items-start justify-center p-10 pt-0 sm:pt-10 gap-4 order-[1] sm:order-0">
                <h3 className="font-semibold text-2xl">Táo bạo</h3>
                <p className="text-gray-500 ">
                  Chúng mình hướng tới kết quả. Chúng mình hoàn thành và vượt
                  chỉ tiêu mọi việc. Chúng mình đam mê và làm việc chăm chỉ. Khi
                  thất bại, đó sẽ là cơ hội cho chúng mình học hỏi và tự đứng
                  dậy vững vàng hơn.
                </p>
              </div>
              <Image
                className="order-[0] sm:order-1 pt-5 sm:pt-0"
                src="/hardcore3.svg"
                width={150}
                height={300}
                alt="community"
              />
            </div>

            <div className="border rounded flex col-span-2 lg:col-span-1 flex-col lg:flex-row sm:flex-row items-center">
              <div className="flex flex-col items-start justify-center p-10 pt-0 sm:pt-10 gap-4 order-[1] sm:order-0">
                <h3 className="font-semibold text-2xl">Tự do</h3>
                <p className="text-gray-500 ">
                  Chúng mình thực hiện một cách có trách nhiệm và tự chủ. Chúng
                  mình trao quyền cho những người xung quanh. Nhóm của chúng
                  mình đa dạng và chúng mình thách thức hiện trạng.
                </p>
              </div>
              <Image
                className="order-[0] sm:order-1 pt-5 sm:pt-0"
                src="/freedom3.svg"
                width={150}
                height={300}
                alt="community"
              />
            </div>

            <div className="border rounded flex col-span-2 lg:col-span-1 flex-col lg:flex-row sm:flex-row items-center">
              <div className="flex flex-col items-start justify-center p-10 pt-0 sm:pt-10 gap-4 order-[1] sm:order-0">
                <h3 className="font-semibold text-2xl">Khiêm nhường</h3>
                <p className="text-gray-500 ">
                  Chúng mình chấp nhận phản hồi mang tính phê bình. Chúng mình
                  đối xử với mọi người như nhau. Chúng mình khiêm tốn về thành
                  công của mình.
                </p>
              </div>
              <Image
                className="order-[0] sm:order-1 pt-5 sm:pt-0"
                src="/humility3.svg"
                width={150}
                height={300}
                alt="community"
              />
            </div>

            <div className="border rounded flex items-center justify-center col-span-2">
              <div className="flex flex-col items-center justify-center p-10 gap-4">
                <h3 className="text-center font-bold text-2xl uppercase">{`"Chúng ta cùng có thể tạo nên những kỳ tích phi thường!"`}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section></section>
    </>
  );
};

export default RecruitPage;
