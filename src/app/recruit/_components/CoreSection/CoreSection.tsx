"use client";
import Image from "next/image";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME, CORE_IMAGES} from "../../_constants/constants";
import {Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselOptions} from "@/components/ui/carousel";
import useSound from "use-sound";
import Autoplay from "embla-carousel-autoplay";
import {WheelGesturesPlugin} from "embla-carousel-wheel-gestures";
import {Button} from "@/components/ui/button";
import Social from "./Social";
import {ScrollArea} from "@/components/ui/scroll-area";
import President from "./President";
import {useEffect, useState, useCallback, useMemo, memo} from "react";
import {Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {MdOutlineKeyboardDoubleArrowRight} from "react-icons/md";
import {MdOutlineKeyboardDoubleArrowLeft} from "react-icons/md";
import {PRIMARY_ORANGE_HEX} from "@/constants/constants";
import MessageSheet from "./MessageSheet";
import {useTheme} from "next-themes";

const CoreSection = memo(() => {
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const {resolvedTheme} = useTheme();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const memoizedOpts = useMemo(
    (): CarouselOptions => ({
      align: "center",
      loop: true,
    }),
    []
  );

  const memoizedPlugins = useMemo(
    () => [
      Autoplay({
        delay: 2000,
      }),
      WheelGesturesPlugin(),
    ],
    []
  );

  const handleCarouselItemClick = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  const handleLeftClick = useCallback(() => {
    playClick();
    api?.scrollPrev();
  }, [playClick, api]);

  const handleRightClick = useCallback(() => {
    playClick();
    api?.scrollNext();
  }, [playClick, api]);

  const memoizedPresident = useMemo(() => <President />, []);

  const memoizedRenderImage = useCallback(
    (item: (typeof CORE_IMAGES)[0]) => (
      <Image
        src={item.image_url}
        height={300}
        width={320}
        alt={item.name}
        className="w-max transition-transform duration-300 ease-in-out group-hover:scale-105 overflow-hidden rounded shadow rounded-br-none rounded-bl-none object-cover"
      />
    ),
    []
  );

  const memoizedRenderButton = useCallback(
    () => (
      <Button
        type="button"
        onClick={() => playClick()}
        className="w-full text-white"
      >
        Đóng
      </Button>
    ),
    [playClick]
  );

  return (
    <section id="core">
      <div className="flex flex-col gap-12 pt-40 container items-center justify-start">
        {memoizedPresident}
        <Carousel
          setApi={setApi}
          opts={memoizedOpts}
          plugins={memoizedPlugins}
          className="w-full"
        >
          <CarouselContent className="w-full">
            {CORE_IMAGES.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-8 relative max-w-[290px] mb-8 sm:basis-[100%] md:basis-1/3 lg:basis-1/4 hover:cursor-pointer core-section group"
                onClick={() => handleCarouselItemClick(index)}
              >
                <Sheet>
                  <SheetTrigger asChild>
                    <div
                      onClick={() => playClick()}
                      className="transition-transform duration-300 ease-in-out"
                      style={{
                        transform: current === index + 1 ? "scale(1.12)" : "none",
                      }}
                    >
                      <div className="overflow-hidden">{memoizedRenderImage(item)}</div>
                      <div className="bg-background shadow-lg border-primary border-2 rounded-tl-none rounded-tr-none rounded p-2">
                        <h3 className="font-bold text-center text-primary">{item.name}</h3>
                        <p
                          className="text-center text-xs lg:text-md"
                          style={{
                            color: current === index + 1 ? PRIMARY_ORANGE_HEX : resolvedTheme === "light" ? "#374151" : "#ebeef4",
                          }}
                        >
                          {item.head_department}
                        </p>
                      </div>
                    </div>
                  </SheetTrigger>

                  <SheetContent
                    className="w-[90%] px-10 md:max-w-[400px] h-[100vh] flex flex-col rounded-sm pt-20 pb-6"
                    side="right"
                  >
                    <SheetHeader>
                      <SheetTitle className="text-left">{item.name}</SheetTitle>
                      <div className="flex items-center justify-start gap-2">
                        <SheetDescription>{item.head_department}</SheetDescription>
                        <Social
                          facebook={item.facebook}
                          instagram={item.instagram}
                          size={17}
                        />
                      </div>
                    </SheetHeader>
                    <ScrollArea className="px-4">
                      <MessageSheet
                        message={item.message}
                        department={item.department}
                        image_url={item.image_url}
                        alt={item.name}
                      />
                    </ScrollArea>
                    <SheetFooter className="mt-4">
                      <SheetClose asChild>{memoizedRenderButton()}</SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex gap-4 items-center justify-center -mt-10">
          <MdOutlineKeyboardDoubleArrowLeft
            size={40}
            className="text-primary hover:cursor-pointer carousel-pointer"
            onClick={handleLeftClick}
          />

          {Array.from({length: count}, (_, index) => (
            <div
              key={index}
              className="min-w-[12px] min-h-[12px] border-2 border-primary hover:cursor-pointer core-navigate"
              style={{
                background: current === index + 1 ? PRIMARY_ORANGE_HEX : resolvedTheme === "dark" ? "#181a20" : "white",
              }}
              onClick={() => {
                playClick();
                api?.scrollTo(index);
              }}
            ></div>
          ))}
          <MdOutlineKeyboardDoubleArrowRight
            size={40}
            className="text-primary hover:cursor-pointer carousel-pointer"
            onClick={handleRightClick}
          />
        </div>
      </div>
    </section>
  );
});

CoreSection.displayName = "CoreSection";

export default CoreSection;
