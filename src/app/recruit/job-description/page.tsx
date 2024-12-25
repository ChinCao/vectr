"use client";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import NavigationButton from "../_components/NavigationButton";
import {CLICK_SOUND_VOLUME, DEPARTMENT_INFO, FQA} from "@/app/recruit/_constants/constants";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {CLICK_SOUND_URL} from "@/app/recruit/_constants/constants";
import useSound from "use-sound";
import Navbar from "@/app/recruit/_components/Navbar";
import RecruitButton from "../_components/RecruitButton";
import JDNavItems from "./_components/JDNavItems";

const JobDescriptionPage = () => {
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});
  const dimension = 225;
  return (
    <>
      <Navbar showRecruitBtn={true}>
        {DEPARTMENT_INFO.map((info, index) => (
          <JDNavItems
            key={index}
            info={info}
            index={index}
          />
        ))}
        <RecruitButton
          className="block lg:hidden"
          button_className="text-left !rounded-none"
        />
      </Navbar>
      <title>Chọn ban</title>
      <div className="py-24 container">
        <NavigationButton
          href="/recruit/"
          text="Trở lại trang recruit"
          direction="left"
        />
        <div className="flex flex-col mt-5 gap-8 items-center justify-center">
          <h1 className="capitalize text-center font-bold text-5xl">Chọn ban để apply</h1>
          <div className="flex flex-row gap-6 flex-wrap items-center justify-center ">
            {DEPARTMENT_INFO.map((info, index) => (
              <Link
                href={info["url"]}
                key={index}
                onClick={() => playClick()}
              >
                <Card className="py-3 hover:scale-[1.01] hover:text-primary active:scale-[0.998]">
                  <CardContent>
                    <Image
                      src={info["images"][0]}
                      width={dimension}
                      height={dimension}
                      alt="Graphic"
                    />
                  </CardContent>
                  <CardTitle className="text-center uppercase text-2xl font-medium">{info["abbreviation"]}</CardTitle>
                </Card>
              </Link>
            ))}
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-[80%]"
          >
            {FQA.map((item, index) => (
              <AccordionItem
                value={`item-${index + 1}`}
                key={index}
              >
                <AccordionTrigger
                  onClick={() => playClick()}
                  className="font-semibold"
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default JobDescriptionPage;
