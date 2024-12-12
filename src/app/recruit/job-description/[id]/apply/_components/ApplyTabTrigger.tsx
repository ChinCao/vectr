import { TabsTrigger } from "@radix-ui/react-tabs";
import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const ApplyTabTrigger = ({
  value,
  text,
  direction,
}: {
  value: "general-questions" | "department-questions" | "personal-info";
  text: string;
  direction: "left" | "right";
}) => {
  return (
    <TabsTrigger
      value={value}
      className="flex flex-row items-center justify-center rounded gap-2 bg-[#f7c325] text-white w-full py-2 hover:opacity-90"
    >
      <h3 className={`${direction == "right" ? "order-[0]" : "order-1"}`}>
        {text}
      </h3>
      {direction == "right" ? (
        <FaLongArrowAltRight color="white" className="order-1" />
      ) : (
        <FaLongArrowAltLeft color="white" className="order-[0]" />
      )}
    </TabsTrigger>
  );
};

export default ApplyTabTrigger;
