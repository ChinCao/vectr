import Image from "next/image";
import {Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {BENEFITS_LOOKUP, CLICK_SOUND_URL, CLICK_SOUND_VOLUME} from "../../_constants/constants";
import {ScrollArea} from "@/components/ui/scroll-area";
import useSound from "use-sound";

const BenefitsSection = () => {
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});

  return (
    <section
      id="benefits"
      className="relative"
    >
      <div className="container flex flex-col pt-24 w-full sm:w-[70%] items-center gap-10 ">
        <h1 className="text-5xl font-bold text-center">Các quyền lợi khi gia nhập VECTR</h1>
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              onClick={() => playClick()}
              className="bg-[#f7c325] w-[200px]  sm:w-[305px] border-2 border-black rounded-bl-none rounded-br-none"
            >
              Xem quyền lợi
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full container">
              <DrawerHeader>
                <DrawerTitle>
                  <h1>
                    Các quyền lợi khi bạn là thành viên của <span className=" text-primary">VECTR</span>
                  </h1>
                </DrawerTitle>
                <DrawerDescription>Còn chần chừ gì nữa!</DrawerDescription>
              </DrawerHeader>
              <ScrollArea className="h-[500px]">
                <div className="flex flex-wrap gap-8 px-4">
                  {BENEFITS_LOOKUP.map((item, index) => (
                    <Card
                      key={index}
                      className="flex items-center flex-col sm:flex-row justify-center min-w-[90%] sm:min-w-[300px] flex-1"
                    >
                      <CardContent className="pb-0 pr-0">
                        <Image
                          src={item.image_src}
                          height={120}
                          width={120}
                          alt="icon"
                          className="w-[69px] pt-4 sm:pt-0 sm:w-[80px] min-w-[60px]"
                        />
                      </CardContent>
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription className="text-justify">{item.content}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </ScrollArea>

              <DrawerFooter>
                <DrawerClose asChild>
                  <Button onClick={() => playClick()}>Quá đã</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <Image
        src="/header-rebrand-2x.png"
        width={1216}
        height={190}
        alt="benefits"
        className="absolute bottom-0 border-b-2 border-b-black border-t-none z-[-1]"
      />
    </section>
  );
};

export default BenefitsSection;
