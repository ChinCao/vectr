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
                <Card className="py-3 hover:scale-[1.01] hover:text-primary">
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
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger onClick={() => playClick()}>
                Is it styled?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger onClick={() => playClick()}>
                Is it animated?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default JobDescriptionPage;
