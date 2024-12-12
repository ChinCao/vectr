"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import NavigationButton from "./_components/NavigationButton";
import Navbar from "@/components/Navbar";
import { CLICK_SOUND_VOLUME, DEPARTMENT_INFO } from "@/constants/constants";
import MissionCard from "./_components/MissionCard";
import ProcessBlock from "./_components/ProcessBlock";
import ValuesCard from "./_components/ValuesCard";
import { CLICK_SOUND_URL } from "@/constants/constants";
import useSound from "use-sound";

const RecruitPage = () => {
  const [playClick] = useSound(CLICK_SOUND_URL, { volume: CLICK_SOUND_VOLUME });

  return (
    <>
      <title>Recruit Gen1</title>
      <Navbar>
        <a href="#" className="w-full block py-3 px-3 ">
          Gen1
        </a>
        <a href="#value" className="w-full block py-3 px-3 ">
          Giá Trị
        </a>
        <a href="#core" className="w-full block py-3 px-3 ">
          Các Ban
        </a>
        <a href="#mission" className="w-full block py-3 px-3 ">
          Sứ Mệnh
        </a>
        <a href="#process" className="w-full block py-3 px-3 ">
          Quy Trình
        </a>
      </Navbar>
      <div className="flex flex-col items-center">
        <section id="#">
          <div className="container flex items-center justify-around flex-col sm:flex-row pt-16">
            <div className="flex flex-col w-[95%] md:w-[60%] gap-7 order-1 sm:order-[0] items-center sm:items-start sm:w-[45%]">
              <h1 className="text-5xl font-bold text-center sm:text-left">
                Công việc tại <span className="text-primary">VECTR</span>
              </h1>
              <p className="text-gray-500 text-xl w-full text-balance text-justify sm:text-left sm:w-[80%]">
                Ở VECTR, chúng mình học tập và rèn luyện để trở thành những
                người tiên phong toàn cầu, chúng ta sẽ cùng thiết kế thế giới và
                công nghệ hóa tương lai
              </p>
              <NavigationButton
                text="Xem Job Description"
                direction="right"
                href="/recruit/job-description"
              />
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
              Các giá trị cốt lõi của VECTR định hướng hành vi, quyết định và
              hành động của chúng mình, cho phép hợp tác thống nhất giữa các ban
              đa dạng trong tổ chức.
            </p>

            <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
              <div className="border rounded col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col lg:flex-col items-center sm:flex-row">
                <div className="flex flex-col items-start justify-center p-10 pt-0 sm:pt-10 gap-4 order-[1] sm:order-0 ">
                  <h3 className="font-semibold text-2xl">
                    Tập trung vào cộng đồng
                  </h3>
                  <p className="text-gray-500 ">
                    Chúng mình đặt nhu cầu của cộng đồng lên hàng đầu và cung
                    cấp dịch vụ chất lượng để giải quyết các vấn đề thực tế.
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
              <ValuesCard
                title="Sự hợp tác"
                content="Chúng mình giao tiếp cởi mở và thoải mái. Chúng mình làm
                    việc theo nhóm hướng tới mục tiêu chung là cùng nhau xây
                    dựng cồng động và mang lại giá trị hữu ích."
                image_url="/collaboration2.svg"
                image_alt="community"
              />
              <ValuesCard
                title="Táo bạo"
                content="Chúng mình hướng tới kết quả. Chúng mình hoàn thành và vượt
                    chỉ tiêu mọi việc. Chúng mình đam mê và làm việc chăm chỉ.
                    Khi thất bại, đó sẽ là cơ hội cho chúng mình học hỏi và tự
                    đứng dậy vững vàng hơn."
                image_url="/hardcore3.svg"
                image_alt="hardcore"
              />
              <ValuesCard
                title="Tự do"
                content="Chúng mình thực hiện một cách có trách nhiệm và tự chủ.
                    Chúng mình trao quyền cho những người xung quanh. Nhóm của
                    chúng mình đa dạng và chúng mình thách thức hiện trạng."
                image_url="/freedom3.svg"
                image_alt="freedome"
              />
              <ValuesCard
                title="Khiêm nhường"
                content="Chúng mình chấp nhận phản hồi mang tính phê bình. Chúng mình
                    đối xử với mọi người như nhau. Chúng mình khiêm tốn về thành
                    công của mình."
                image_url="/humility3.svg"
                image_alt="humility"
              />
              <div className="border-primary border rounded flex items-center justify-center col-span-2">
                <div className="flex flex-col items-center justify-center p-10 gap-4">
                  <h3 className="text-center text-primary font-bold text-2xl uppercase">{`"Chúng ta cùng có thể tạo nên những kỳ tích phi thường!"`}</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="core">
          <div className="container flex flex-col sm:flex-row pt-20 justify-center items-center gap-5 ">
            <Carousel className="w-[250px] order-[1] sm:order-0 sm:w-[300px]">
              <CarouselContent>
                {DEPARTMENT_INFO.map((info, index) => (
                  <CarouselItem
                    className="flex flex-col gap-3 items-center justify-center"
                    key={index}
                  >
                    <Card>
                      <CardContent className="pt-6">
                        <Image
                          src={info["images"][0]}
                          width={300}
                          height={300}
                          alt="Graphic"
                        />
                      </CardContent>
                    </Card>
                    <h4 className="font-semibold text-3xl text-center">
                      {info["full"]}
                    </h4>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div onClick={() => playClick()}>
                <CarouselPrevious />
              </div>
              <div onClick={() => playClick()}>
                <CarouselNext />
              </div>
            </Carousel>
            <div className="flex flex-col items-center gap-5 sm:gap-10 justify-center w-[80%] sm:w-[50%] order-[0] sm:order-1">
              <h1 className="text-5xl font-bold text-center">
                Các ban ở VECTR
              </h1>
              <p className="text-gray-500 text-xl w-full text-balance text-center sm:w-[85%]">
                Chọn ban phù hợp nhất với sở thích và kinh nghiệm của bạn để xem
                các vị trí việc làm.
              </p>
              <NavigationButton
                text={"Xem Job Description"}
                direction="right"
                href="/recruit/job-description"
              />
            </div>
          </div>
        </section>

        <section id="mission">
          <div className="container pt-20">
            <h1 className="text-5xl font-bold text-center ">
              Sứ mệnh của VECTR
            </h1>
            <div className="flex flex-col md:flex-row gap-10 mt-10">
              <MissionCard
                image_url="/innovation.svg"
                image_alt="innovation"
                title="Lorem ipsum dolor sit amet."
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facere, neque?"
              />
              <MissionCard
                image_url="/grow.svg"
                image_alt="grow"
                title="Lorem ipsum dolor sit amet."
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facere, neque?"
              />
              <MissionCard
                image_url="/thrive.png"
                image_alt="thrive"
                title="Lorem ipsum dolor sit amet."
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facere, neque?"
              />
            </div>
          </div>
        </section>

        <section id="process">
          <div className="container flex flex-col py-24 gap-3">
            <h1 className="text-5xl font-bold text-left ">
              Quy trình ứng tuyển
            </h1>
            <p className="text-gray-500 text-xl w-full  text-justify sm:text-left sm:w-[100%]">
              {` VECTR sẽ sàng lọc hồ sơ, phỏng vấn, đánh giá ứng viên tiềm năng, và gửi xác
            nhận đậu vào CLB (update sẽ được gửi qua email).`}
            </p>
            <div className="flex flex-col sm:flex-row gap-8 mt-4">
              <ProcessBlock title="01" text="Đánh giá đơn tuyển" />
              <ProcessBlock title="02" text="Phỏng vấn" />
              <ProcessBlock title="03" text="Cam kết" />
              <ProcessBlock title="04" text="Gia nhập" />
            </div>
            <NavigationButton
              text={"Xem Job Description"}
              direction="right"
              className="mt-4"
              href="/recruit/job-description"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default RecruitPage;
