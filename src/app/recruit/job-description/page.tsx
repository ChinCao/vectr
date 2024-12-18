"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import NavigationButton from "../_components/NavigationButton";
import { CLICK_SOUND_VOLUME, DEPARTMENT_INFO } from "@/constants/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CLICK_SOUND_URL } from "@/constants/constants";
import useSound from "use-sound";

const JobDescriptionPage = () => {
  const [playClick] = useSound(CLICK_SOUND_URL, { volume: CLICK_SOUND_VOLUME });
  const dimension = 225;
  return (
    <>
      <title>Chọn ban</title>
      <div className="py-24 container">
        <NavigationButton
          href="/recruit/"
          text="Trở lại trang recruit"
          direction="left"
        />
        <div className="flex flex-col mt-5 gap-8 items-center justify-center">
          <h1 className="capitalize text-center font-bold text-5xl">
            Chọn ban để apply
          </h1>
          <div className="flex flex-row gap-6 flex-wrap items-center justify-center ">
            {DEPARTMENT_INFO.map((info, index) => (
              <Link href={info["url"]} key={index} onClick={() => playClick()}>
                <Card className="py-3 hover:scale-[1.01] hover:text-primary active:scale-[0.998]">
                  <CardContent>
                    <Image
                      src={info["images"][0]}
                      width={dimension}
                      height={dimension}
                      alt="Graphic"
                    />
                  </CardContent>
                  <CardTitle className="text-center uppercase text-2xl">
                    {info["abbreviation"]}
                  </CardTitle>
                </Card>
              </Link>
            ))}
          </div>
          <Accordion type="single" collapsible className="w-[80%]">
            <AccordionItem value="item-1">
              <AccordionTrigger onClick={() => playClick()}>
                Tôi có thể apply nhiều ban khác nhau được không?
              </AccordionTrigger>
              <AccordionContent>
                Có, bạn có thể apply được nhiều ban và tất cả câu trả lời của
                bạn sẽ được ghi nhận. Nhưng sau quá trình tuyển thành viên bạn
                chỉ có thể làm được 1 ban duy nhất mà chúng mình nghĩ là phù hợp
                với bạn nhất.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger onClick={() => playClick()}>
                Làm sao tôi có thể biết được trạng thái ứng tuyển của mình?
              </AccordionTrigger>
              <AccordionContent>
                Mọi thông tin sẽ được cập nhật qua email riêng và email trường.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger onClick={() => playClick()}>
                Thông tin trên website có được bảo mật không?
              </AccordionTrigger>
              <AccordionContent>
                Mọi thông tin trên website được bảo mật chặt chẽ và chỉ có thành
                viên CORE của VECTR mới có quyền truy cập.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger onClick={() => playClick()}>
                Những thông tin tôi điền trên form của website có được lưu
                không?
              </AccordionTrigger>
              <AccordionContent>
                Có, mọi thông tin bạn ghi trên form sẽ được lưu tự động và bạn
                có thể quay trở lại để tiếp tục với câu trả lời của mình.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default JobDescriptionPage;
