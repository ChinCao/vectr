import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import React, {useState} from "react";
import {MdOutlineCloudDone, MdOutlineCloudDownload, MdOutlineCloudUpload} from "react-icons/md";
import ScrollToTop from "./ScrollToTop";
import {PRIMARY_ORANGE_HEX} from "@/constants/constants";

const DataState = ({isSaving, isFetching}: {isSaving: boolean; isFetching: boolean}) => {
  const [clicked, setClicked] = useState(false);
  const color = !isSaving && !isFetching ? "#14532d" : isFetching ? PRIMARY_ORANGE_HEX : isSaving ? "#dc2626" : null;
  const text =
    !isSaving && !isFetching
      ? "Mọi dữ liệu đã được lưu"
      : isFetching
      ? "Đang lấy thông tin từ cơ sở dữ liệu"
      : isSaving
      ? "Đang lưu câu trả lời của bạn"
      : null;

  return (
    <>
      {!isSaving && !isFetching ? (
        <div
          className="flex items-center justify-start gap-4 mb-4 flex-col sm:flex-row"
          style={{color: color!}}
        >
          <MdOutlineCloudDone /> {text}
        </div>
      ) : isFetching ? (
        <div
          className="flex items-center justify-start gap-4 mb-4 flex-col sm:flex-row"
          style={{color: color!}}
        >
          <MdOutlineCloudDownload />
          <p className="text-center">{text}</p>
        </div>
      ) : isSaving ? (
        <div
          className="flex items-center justify-start gap-4 mb-4 flex-col sm:flex-row"
          style={{color: color!}}
        >
          <MdOutlineCloudUpload />
          {text}
        </div>
      ) : null}

      <TooltipProvider>
        <Tooltip
          open={clicked}
          delayDuration={500}
        >
          <TooltipTrigger asChild>
            <div className="left-[5%] bottom-[5%] z-50 fixed flex flex-col gap-3">
              <ScrollToTop />
              <div
                id="save-state"
                className="w-[50px] h-[50px] border-2 bg-white flex items-center justify-center hover:cursor-pointer"
                style={{borderColor: color!}}
                onClick={() => setClicked(!clicked)}
              >
                {!isSaving && !isFetching ? (
                  <MdOutlineCloudDone
                    fill={color!}
                    size={30}
                  />
                ) : isFetching ? (
                  <MdOutlineCloudDownload
                    fill={color!}
                    size={30}
                  />
                ) : isSaving ? (
                  <MdOutlineCloudUpload
                    fill={color!}
                    size={30}
                  />
                ) : null}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent style={{background: color!}}>
            <p>{text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default DataState;
