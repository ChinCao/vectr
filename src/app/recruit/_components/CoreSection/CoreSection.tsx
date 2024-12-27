import {PRIMARY_ORANGE_HEX, PRIMARY_YELLOW_HEX} from "@/constants/constants";
import Image from "next/image";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME, CORE_IMAGES, FULL_DEPARTMENT_TITLE} from "../../_constants/constants";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import useSound from "use-sound";
import Autoplay from "embla-carousel-autoplay";
import {WheelGesturesPlugin} from "embla-carousel-wheel-gestures";

import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import Social from "./Social";
import NavigationButton from "../NavigationButton";
import {ScrollArea} from "@/components/ui/scroll-area";

const CoreSection = () => {
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});

  return (
    <section id="core">
      <div className="flex flex-col gap-12 pt-40 container items-center justify-start">
        <div className="flex gap-5 items-center relative">
          <div className="flex md:flex-col flex-row z-10 absolute bottom-[70%] left-[7%] md:left-0  gap-4 md:bottom-[17%] lg:bottom-[0%] text-white md:text-primary">
            <h1 className=" text-5xl font-bold">Các</h1>
            <h1 className=" text-5xl font-bold pl-0 lg:pl-4">CORE</h1>
          </div>
          <div className="flex gap-2 flex-1 flex-col md:flex-row ">
            <div
              className="relative min-w-[0] md:min-w-[400px] min-h-[250] z-0 rounded md:rounded-none"
              style={{background: `linear-gradient(100deg, ${PRIMARY_YELLOW_HEX} 30%, ${PRIMARY_ORANGE_HEX} 70%)`}}
            >
              <div
                className="absolute hidden md:block min-w-[400px] min-h-[250] bg-white z-1 left-[-50%] top-[30%]"
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
            <div className="flex-1 min-h-[250] bg-white border-primary border rounded lg:rounded-tl-none lg:rounded-bl-none flex flex-col py-4 px-8 items-center justify-center gap-4 z-10">
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
                Hello ae, mình là <span className="text-primary">Khôi Nguyên</span>, chủ tịch cũng như là founder của CLB VECTR! Nếu các bạn thích
                những ý tưởng điên rồ 💥 và những project thú vị, thì hãy gia nhập gia đình VECTR nha! Mình rất mong được gặp gỡ và cùng nhau tạo nên
                những kỷ niệm tuyệt vời cùng các ae! 😍
              </p>
            </div>
          </div>
        </div>
        <Carousel
          opts={{
            align: "center",
            loop: true,
            containScroll: "keepSnaps",
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
            WheelGesturesPlugin(),
          ]}
          className="w-full"
        >
          <CarouselContent className="flex w-full">
            {CORE_IMAGES.map((item, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <CarouselItem className="relative w-full max-w-[290px] mb-8 sm:basis-[100%] md:basis-1/3 lg:basis-1/4 hover:cursor-pointer core-section  group overflow-hidden">
                    <div className="overflow-hidden ">
                      <Image
                        src={item.image_url}
                        height={300}
                        width={320}
                        alt="Vicky"
                        className="w-max  transition-transform duration-300 ease-in-out group-hover:scale-105 overflow-hidden rounded shadow rounded-br-none rounded-bl-none object-cover  "
                      />
                    </div>
                    <div className=" bg-white shadow-lg  border-primary border-2 rounded-tl-none rounded-tr-none rounded p-2">
                      <h3 className="font-bold text-center text-primary">{item.name}</h3>
                      <p className="text-gray-700 text-center text-xs lg:text-md">{item.head_department}</p>
                    </div>
                  </CarouselItem>
                </DialogTrigger>
                <DialogContent className="w-[90%] px-10 md:max-w-[700px] h-[75vh] md:h-max rounded-sm">
                  <DialogHeader>
                    <DialogTitle>{item.name}</DialogTitle>
                    <DialogDescription className="flex items-center justify-center md:justify-start gap-2">
                      {item.head_department}
                      <Social
                        facebook={item.facebook}
                        instagram={item.instagram}
                        size={17}
                      />
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="px-4">
                    <div className="flex gap-4 flex-col md:flex-row items-center h-full">
                      <Image
                        src={item.image_url}
                        height={250}
                        width={250}
                        alt="Vicky"
                        className="w-max rounded shadow object-cover"
                      />
                      <div className="flex flex-col items-start gap-4">
                        <div>
                          <h1 className="text-primary uppercase font-bold text-xl">Lời nhắn</h1>
                          <p className="text-justify text-md text-gray-700">{item.message}</p>
                        </div>
                        <NavigationButton
                          direction="right"
                          className="w-full "
                          button_className="w-full bg-primary-yellow text-no"
                          text={item.department == "Chọn ban" ? item.department : `Apply vào ${FULL_DEPARTMENT_TITLE(item.department)}`}
                          href={item.department == "Chọn ban" ? "/recruit/job-description" : `/recruit/job-description/${item.department}`}
                        />
                      </div>
                    </div>
                  </ScrollArea>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        onClick={() => playClick()}
                        className="w-full"
                      >
                        Đóng
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </CarouselContent>

          <div onClick={() => playClick()}>
            <CarouselPrevious className="mr-3 hidden md:flex" />
          </div>
          <div onClick={() => playClick()}>
            <CarouselNext className="ml-3 hidden md:flex" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default CoreSection;
