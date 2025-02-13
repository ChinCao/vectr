"use client";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import NavigationButton from "../_components/NavigationButton";
import {CLICK_SOUND_VOLUME, DEPARTMENT_INFO, FQA} from "@/app/recruit/_constants/constants";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {CLICK_SOUND_URL} from "@/app/recruit/_constants/constants";
import useSound from "use-sound";
import JDNavItems from "./_components/JDNavItems";
import {useMemo} from "react";
import NavSpotlighButton from "../../../components/NavSpotlighButton";
import Navbar from "@/components/Navbar/Navbar";

const JobDescriptionPage = () => {
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});
  const dimension = 225;

  const memoizedNavbar = useMemo(
    () => (
      <Navbar
        showSpotlightButton={true}
        spotLightButtonHref="/recruit"
        spotlightButtonButtonText="Recruit"
      >
        {DEPARTMENT_INFO.map((info, index) => (
          <JDNavItems
            key={index}
            info={info}
            index={index}
          />
        ))}
        <NavSpotlighButton
          className="block lg:hidden"
          button_className="text-left !rounded-none"
          text="Recruit"
          href="/recruit"
        />
      </Navbar>
    ),
    []
  );

  const memoizedCards = useMemo(
    () => (
      <div className="flex flex-row gap-6 flex-wrap items-center justify-center">
        {DEPARTMENT_INFO.map((info, index) => (
          <Link
            href={info.url}
            key={index}
            onClick={() => playClick()}
          >
            <Card className="py-3 hover:scale-[1.01] hover:text-primary active:scale-[0.998]">
              <CardContent>
                <Image
                  src={info.images[0]}
                  width={dimension}
                  height={dimension}
                  alt="Graphic"
                />
              </CardContent>
              <CardTitle className="text-center uppercase text-2xl font-medium">{info.abbreviation}</CardTitle>
            </Card>
          </Link>
        ))}
      </div>
    ),
    [playClick]
  );

  const memoizedAccordion = useMemo(
    () => (
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
              onClick={playClick}
              className="font-semibold"
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    ),
    [playClick]
  );

  const memoizedRocketImage = useMemo(
    () => (
      <Image
        src="/rocket-launch-2x.png"
        width={200}
        height={800}
        alt="rocket"
        className="absolute top-[15.5%] left-[-5%] z-[-1] hidden lg:block pointer-events-none"
      />
    ),
    []
  );

  return (
    <>
      {memoizedNavbar}
      <title>Chọn ban</title>
      <div className="py-24 container relative">
        <NavigationButton
          href="/recruit/"
          text="Trở lại trang recruit"
          direction="left"
        />
        <div className="flex flex-col mt-5 gap-8 items-center justify-center">
          <h1 className="capitalize text-center font-bold text-5xl">Chọn ban để apply</h1>
          {memoizedCards}
          {memoizedAccordion}
        </div>
        {memoizedRocketImage}
      </div>
    </>
  );
};

export default JobDescriptionPage;
