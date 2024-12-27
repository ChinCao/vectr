import React from "react";
import Social from "./Social";
import Image from "next/image";
import {PRIMARY_YELLOW_HEX, PRIMARY_ORANGE_HEX} from "@/constants/constants";

const President = () => {
  return (
    <div className="flex gap-5 items-center relative">
      <div className="flex md:flex-col flex-row z-10 absolute bottom-[70%] left-[7%] md:left-0  gap-4 md:bottom-[17%] lg:bottom-[0%] text-white md:text-primary">
        <h1 className=" text-5xl font-bold">Các</h1>
        <h1 className=" text-5xl font-bold pl-0 lg:pl-4">CORE</h1>
      </div>
      <div className="flex gap-2 flex-1 flex-col md:flex-row ">
        <div
          className="relative min-w-[0] md:min-w-[400px] min-h-[250px] z-0 rounded md:rounded-none"
          style={{background: `linear-gradient(100deg, ${PRIMARY_YELLOW_HEX} 30%, ${PRIMARY_ORANGE_HEX} 70%)`}}
        >
          <div
            className="absolute hidden md:block min-w-[400px] min-h-[250px] bg-white z-1 left-[-50%] top-[30%]"
            style={{transform: "rotate(234deg)"}}
          ></div>
          <Image
            src="/jerry.png"
            width={300}
            height={700}
            alt="jerry"
            className="absolute bottom-0 right-0 rounded-br-sm md:rounded-br-none"
          />
        </div>
        <div className="flex-1 min-h-[250px] bg-white border-primary border rounded lg:rounded-tl-none lg:rounded-bl-none flex flex-col py-4 px-8 items-center justify-center gap-4 z-10">
          <h1 className="text-primary text-3xl font-bold uppercase text-center">Chủ tịch VECTR</h1>
          <div className="flex gap-2 flex-col lg:flex-row">
            <h5 className="text-primary text-2xl font-semiold uppercase text-center">Huỳnh Nguyễn Khôi Nguyên</h5>

            <Social
              facebook="https://www.facebook.com/nguyen.huynh.688762"
              instagram="https://www.instagram.com/hnkn3010/"
              size={25}
            />
          </div>
          <p className=" text-gray-500 text-justify">
            Hello ae, mình là <span className="text-primary">Khôi Nguyên</span>, chủ tịch cũng như là founder của CLB VECTR! Nếu các bạn thích những ý
            tưởng điên rồ 💥 và những project thú vị, thì hãy gia nhập gia đình VECTR nha! Mình rất mong được gặp gỡ và cùng nhau tạo nên những kỷ
            niệm tuyệt vời cùng các ae! 😍
          </p>
        </div>
      </div>
    </div>
  );
};

export default President;
