import Image from "next/image";
import {FaArrowDown} from "react-icons/fa6";
import useSound from "use-sound";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME} from "../../_constants/constants";

const AboutUsSection = () => {
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});

  return (
    <section id="about">
      <div className="container flex items-center  justify-center flex-col lg:flex-row pt-24 gap-10 px-8">
        <div className="flex flex-col items-start justify-center w-60% gap-10">
          <h5 className="font-bold text-primary text-xl">Về chúng mình</h5>
          <h1 className="font-bold text-5xl w-full sm:w-[70%]">VECTR không chỉ là một câu lạc bộ</h1>
          <p className="text-gray-500 text-xl w-[90%]">
            Chúng tôi là một cộng đồng đam mê công nghệ, sáng tạo và đổi mới. CLB STEM của chúng tôi tập trung vào việc khơi dậy niềm đam mê robotics
            và coding trong mỗi học sinh tại Vinschool. <span className="text-primary font-semibold">Và chúng tôi là một gia đình!</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-10 w-full ">
            <div className="flex flex-col gap-3 w-full sm:w-1/2">
              <h1 className="text-primary text-4xl font-bold">
                131<span className="text-xl">+</span>
              </h1>
              <h2 className="text-xl font-bold relative flex-1 before:content-[''] before:block before:w-[250px] before:h-[1px] before:bg-gray-400 before:absolute before:left-0 before:bottom-[-20%] text-balance w-[80%]">
                Ngày kể từ khi thành lập
              </h2>
              <p className="mt-3 text-gray-500 font-semibold w-[90%]">Thành lập từ khi 5 ý tưởng lớn gặp nhau vào mùa thu năm 2024.</p>
            </div>
            <div className="flex flex-col gap-3 w-full sm:w-1/2">
              <h1 className="text-primary text-4xl font-bold">
                6<span className="text-xl">+</span>
              </h1>
              <h2 className="text-xl font-bold relative flex-1 before:content-[''] before:block before:w-[250px] before:h-[1px] before:bg-gray-400 before:absolute before:left-0 before:bottom-[-20%]">
                Ban khác nhau
              </h2>
              <p className="mt-3 text-gray-500 font-semibold w-[90%]">Mỗi ban là một thành viên chủ chốt trong đại gia đình VECTR</p>
            </div>
          </div>
          <a
            href="#values"
            title="Xem giá trị của chúng mình"
            onClick={() => playClick()}
            className="w-full sm:w-[80%] lg:w-[400px] bg-transparent self-start sm:self-center lg:self-start border-[#f7c325] border-2 p-4 rounded text-[#f7c325] text-center font-bold flex gap-4 items-center justify-center"
          >
            Xem các giá trị của VECTR
            <FaArrowDown fill="#f7c325" />
          </a>
        </div>
        <Image
          src="/engage-with-us.png"
          width={400}
          height={700}
          alt="VECTR Handslap"
        />
      </div>
    </section>
  );
};

export default AboutUsSection;
