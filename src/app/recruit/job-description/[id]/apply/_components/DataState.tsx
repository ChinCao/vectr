import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import React from "react";
import {MdOutlineCloudDone, MdOutlineCloudDownload, MdOutlineCloudUpload} from "react-icons/md";

const DataState = ({isSaving, isFetching}: {isSaving: boolean; isFetching: boolean}) => {
  const color = !isSaving && !isFetching ? "#14532d" : isFetching ? "#e77f1e" : isSaving ? "#dc2626" : null;
  const text =
    !isSaving && !isFetching
      ? "Mọi dữ liệu đã được lưu"
      : isFetching
      ? "Đang lấy thông tin từ cơ sở dữ liệu"
      : isSaving
      ? "Đang lưu câu trả lời của bạn"
      : null;
  const borderColor = `border-[${color}]`;
  return (
    <>
      {!isSaving && !isFetching ? (
        <div className={`flex items-center justify-start gap-4 mb-4 text-[${color}] flex-col sm:flex-row`}>
          <MdOutlineCloudDone /> {text}
        </div>
      ) : isFetching ? (
        <div className={`flex items-center justify-start gap-4 mb-4 text-[${color}] flex-col sm:flex-row`}>
          <MdOutlineCloudDownload />
          <p className="text-center">{text}</p>
        </div>
      ) : isSaving ? (
        <div className={`flex items-center justify-start gap-4 mb-4 text-[${color}] flex-col sm:flex-row`}>
          <MdOutlineCloudUpload />
          {text}
        </div>
      ) : null}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`w-[50px] h-[50px] border-2 bg-white ${borderColor} right-[5%] bottom-[5%] fixed z-50 flex items-center justify-center`}>
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
          </TooltipTrigger>
          <TooltipContent>
            <p>{text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default DataState;
