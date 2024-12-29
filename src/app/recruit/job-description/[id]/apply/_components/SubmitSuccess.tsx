"use client";
import NavigationButton from "@/app/recruit/_components/NavigationButton";
import {DepartmentsAbbreviation, FULL_DEPARTMENT_TITLE} from "@/app/recruit/_constants/constants";
import {lowercaseFirstLetter} from "@/lib/utils";
import {IoMdCheckmarkCircle} from "react-icons/io";
import {BiSolidQuoteLeft} from "react-icons/bi";
import {useEffect, useState} from "react";
import {FaWikipediaW} from "react-icons/fa";
import {WiDirectionUpRight} from "react-icons/wi";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import QuestionFallBack from "./FallBacks/QuestionFallBack";
import {QuoteResponse, AuthorResponse, AuthorInfo, QUOTE_FALLBACK} from "../_constants/quote";

const SubmitSuccess = ({department}: {department: DepartmentsAbbreviation}) => {
  const [quote, setQuote] = useState<string | undefined>(undefined);
  const [authorInfo, setAuthorInfo] = useState<AuthorInfo | undefined>(undefined);

  useEffect(() => {
    async function fetchQuote() {
      const quoteRes = await fetch(
        "https://api.quotable.io/quotes/random?tags=science|math|physics|chemistry|biology|programming|coding|astronomy|statistics|discipline|calculus|algebra|blockchain|geometry|data%20science|quantum%20mechanics|thermodynamics|environmental%20science|biochemistry|mathematical%20modeling|famous-quotes&minLength=100"
      );

      const setFallbackQuote = () => {
        const random = Math.floor(Math.random() * QUOTE_FALLBACK.length);
        setQuote(QUOTE_FALLBACK[random].content);
        setAuthorInfo({
          name: QUOTE_FALLBACK[random].name,
          bio: QUOTE_FALLBACK[random].bio,
          link: QUOTE_FALLBACK[random].link,
        });
      };

      if (quoteRes.ok) {
        const quoteData: QuoteResponse[] = await quoteRes.json();
        const authorRes = await fetch(`https://api.quotable.io/authors/?slug=${quoteData[0].authorSlug}`);
        const authorData: AuthorResponse = await authorRes.json();
        if (authorRes.ok) {
          setQuote(quoteData[0].content);
          setAuthorInfo(await authorData.results[0]);
        } else {
          setFallbackQuote();
        }
      } else {
        setFallbackQuote();
      }
    }

    fetchQuote();
  }, []);

  return (
    <div className="flex flex-col items-center justify-between mt-3 gap-3">
      <IoMdCheckmarkCircle
        fill="green"
        size={69}
      />
      <h1 className="font-semibold text-xl text-green-700 text-center">
        Xin chúc mừng! Bạn đã gửi đơn thành công đến {lowercaseFirstLetter(FULL_DEPARTMENT_TITLE(department)!)}.
      </h1>
      <p className="text-green-700 text-center">Hãy kiểm tra email của bạn để biết thêm thông tin chi tiết!</p>
      <NavigationButton
        noArrow={true}
        text="Xem các ban khác"
        href="/recruit/job-description"
        button_className="bg-green-700"
      />
      <div className="flex flex-col w-[90%] lg:w-[900px] p-8 items-start border-2 border-primary rounded-sm mt-14 gap-2">
        <BiSolidQuoteLeft
          className="text-primary"
          size={45}
        />
        {quote && authorInfo ? (
          <>
            <p className="font-bold">{quote}</p>
            <HoverCard>
              <HoverCardTrigger asChild>
                <a
                  target="_blank"
                  rel="noopener"
                  className="text-gray-500 w-max flex items-center justify-center hover:text-primary group"
                  href={authorInfo.link}
                >
                  {authorInfo.name}
                  <FaWikipediaW className="text-gray-500 group-hover:text-primary ml-[0.2rem]" />
                  <WiDirectionUpRight className="text-gray-500 group-hover:text-primary -ml-1" />
                </a>
              </HoverCardTrigger>
              <HoverCardContent className="w-full max-w-[15%] lg:max-w-[700px] ml-4 text-justify">{authorInfo.bio}</HoverCardContent>
            </HoverCard>
          </>
        ) : (
          <div className="w-full">
            <QuestionFallBack />
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitSuccess;
