import {TabsTrigger} from "@radix-ui/react-tabs";
import React from "react";
import {FaLongArrowAltLeft, FaLongArrowAltRight} from "react-icons/fa";
import {FormTabs} from "../_types/FormTypes";

const ApplyTabTrigger = ({value, text, direction}: {value: FormTabs; text: string; direction: "left" | "right"}) => {
  return (
    <TabsTrigger
      value={value}
      className="flex flex-row items-center justify-center rounded gap-2 bg-primary-yellow text-white w-full py-2 hover:opacity-90"
    >
      <h3 className={`${direction == "right" ? "order-[0]" : "order-1"}`}>{text}</h3>
      {direction == "right" ? (
        <FaLongArrowAltRight
          color="white"
          className="order-1"
        />
      ) : (
        <FaLongArrowAltLeft
          color="white"
          className="order-[0]"
        />
      )}
    </TabsTrigger>
  );
};

export default ApplyTabTrigger;
