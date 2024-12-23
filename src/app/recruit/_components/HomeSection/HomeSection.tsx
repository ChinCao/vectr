import React from "react";
import NavigationButton from "../NavigationButton";
import Image from "next/image";

const Home = () => {
  return (
    <section id="#">
      <div className="container flex items-center justify-around flex-col sm:flex-row pt-16">
        <div className="flex flex-col w-[95%] md:w-[60%] gap-7 order-1 sm:order-[0] items-center sm:items-start sm:w-[45%]">
          <h1 className="text-5xl font-bold text-center sm:text-left">
            Công việc tại <span className="text-primary">VECTR</span>
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl w-full text-balance text-justify sm:text-left sm:w-[95%]">
            Ở VECTR, chúng mình học tập và rèn luyện để trở thành những người tiên phong toàn cầu, chúng ta sẽ cùng thiết kế thế giới và công nghệ hóa
            tương lai
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
  );
};

export default Home;
