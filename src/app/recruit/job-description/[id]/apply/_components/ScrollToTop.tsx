"use client";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {FaArrowUpLong} from "react-icons/fa6";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          type="button"
          className="w-[50px] h-[50px] border-2 border-primary bg-white flex items-center justify-center hover:cursor-pointer"
        >
          <FaArrowUpLong fill="#e77f1e" />
        </Button>
      )}
    </>
  );
};

export default ScrollToTop;
