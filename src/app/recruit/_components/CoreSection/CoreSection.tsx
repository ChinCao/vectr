"use client";
import Image from "next/image";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME, CORE_IMAGES} from "../../_constants/constants";
import {Carousel, type CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import useSound from "use-sound";
import Autoplay from "embla-carousel-autoplay";
import {WheelGesturesPlugin} from "embla-carousel-wheel-gestures";
import {Button} from "@/components/ui/button";
import Social from "./Social";
import {ScrollArea} from "@/components/ui/scroll-area";
import President from "./President";
import {useEffect, useState} from "react";
import {Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {MdOutlineKeyboardDoubleArrowRight} from "react-icons/md";
import {MdOutlineKeyboardDoubleArrowLeft} from "react-icons/md";
import {PRIMARY_ORANGE_HEX} from "@/constants/constants";
import MessageSheet from "./MessageSheet";

const CoreSection = () => {
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section id="core">
      <div className="flex flex-col gap-12 pt-40 container items-center justify-start">
        <President />
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
            WheelGesturesPlugin(),
          ]}
          className="w-full"
        >
          <CarouselContent className=" w-full">
            {CORE_IMAGES.map((item, index) => (
              <CarouselItem
                key={index}
                className="relative max-w-[290px] mb-8 sm:basis-[100%] md:basis-1/3 lg:basis-1/4 hover:cursor-pointer core-section group "
              >
                <Sheet>
                  <SheetTrigger asChild>
                    <div onClick={() => playClick()}>
                      <div className="overflow-hidden">
                        <Image
                          src={item.image_url}
                          height={300}
                          width={320}
                          alt={item.name}
                          className="w-max transition-transform duration-300 ease-in-out group-hover:scale-105 overflow-hidden rounded shadow rounded-br-none rounded-bl-none object-cover  "
                        />
                      </div>
                      <div className=" bg-white shadow-lg  border-primary border-2 rounded-tl-none rounded-tr-none rounded p-2">
                        <h3 className="font-bold text-center text-primary">{item.name}</h3>
                        <p className="text-gray-700 text-center text-xs lg:text-md">{item.head_department}</p>
                      </div>
                    </div>
                  </SheetTrigger>

                  <SheetContent
                    className="w-[90%] px-10 md:max-w-[400px] h-[100vh] flex flex-col rounded-sm pt-20"
                    side="right"
                  >
                    <SheetHeader>
                      <SheetTitle>{item.name}</SheetTitle>
                      <SheetDescription className="flex items-center justify-center md:justify-start gap-2">
                        {item.head_department}
                        <Social
                          facebook={item.facebook}
                          instagram={item.instagram}
                          size={17}
                        />
                      </SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="px-4">
                      <MessageSheet
                        message={item.message}
                        department={item.department}
                        image_url={item.image_url}
                      />
                    </ScrollArea>
                    <SheetFooter className="mt-4">
                      <SheetClose asChild>
                        <Button
                          type="button"
                          onClick={() => playClick()}
                          className="w-full"
                        >
                          Đóng
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex gap-4 items-center justify-center -mt-14">
          <MdOutlineKeyboardDoubleArrowLeft
            size={40}
            className="text-primary hover:cursor-pointer  carousel-pointer"
            onClick={() => {
              playClick();
              api?.scrollPrev();
            }}
          />

          {Array.from({length: count}, (_, index) => (
            <div
              key={index}
              className="min-w-[12px] min-h-[12px] border-2 border-primary hover:cursor-pointer core-navigate"
              style={{background: current == index + 1 ? PRIMARY_ORANGE_HEX : "white"}}
              onClick={() => {
                playClick();
                api?.scrollTo(index);
              }}
            ></div>
          ))}
          <MdOutlineKeyboardDoubleArrowRight
            size={40}
            className="text-primary hover:cursor-pointer carousel-pointer"
            onClick={() => {
              playClick();
              api?.scrollNext();
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default CoreSection;
