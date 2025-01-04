"use client";
import {Card, CardContent} from "@/components/ui/card";
import {Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext} from "@/components/ui/carousel";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME, DEPARTMENT_INFO} from "../../_constants/constants";
import NavigationButton from "../NavigationButton";
import Image from "next/image";
import useSound from "use-sound";
import Autoplay from "embla-carousel-autoplay";
import {WheelGesturesPlugin} from "embla-carousel-wheel-gestures";

const Departments = () => {
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});

  return (
    <section id="departments">
      <div className="container flex flex-col sm:flex-row pt-20 justify-center items-center gap-5 ">
        <Carousel
          className="w-[250px] order-[1] sm:order-0 sm:w-[300px]"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
            WheelGesturesPlugin(),
          ]}
        >
          <CarouselContent>
            {DEPARTMENT_INFO.map((info, index) => (
              <CarouselItem
                className="flex flex-col gap-3 items-center justify-start"
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
                <h4 className="font-semibold text-3xl text-center">{info["full"]}</h4>
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
          <h1 className="text-5xl font-bold text-center">Các ban ở VECTR</h1>
          <p className="text-gray-500 text-xl w-full text-balance text-center sm:w-[85%]">
            Chọn ban phù hợp nhất với sở thích và kinh nghiệm của bạn để xem các vị trí việc làm.
          </p>
          <NavigationButton
            text={"Xem Job Description"}
            direction="right"
            href="/recruit/job-description"
          />
        </div>
      </div>
    </section>
  );
};

export default Departments;
