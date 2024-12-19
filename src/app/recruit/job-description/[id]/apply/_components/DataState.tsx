import React from "react";
import {
  MdOutlineCloudDone,
  MdOutlineCloudDownload,
  MdOutlineCloudUpload,
} from "react-icons/md";

const DataState = ({
  isSaved,
  isFetching,
}: {
  isSaved: boolean;
  isFetching: boolean;
}) => {
  return (
    <>
      {isSaved && !isFetching ? (
        <div className="flex items-center justify-start gap-4 mb-4 text-green-900 flex-col sm:flex-row">
          <MdOutlineCloudDone /> Mọi dữ liệu đã được lưu
        </div>
      ) : isFetching ? (
        <div className="flex items-center justify-start gap-4 mb-4 text-primary flex-col sm:flex-row">
          <MdOutlineCloudDownload />
          <p className="text-center">Đang lấy thông tin từ cơ sở dữ liệu</p>
        </div>
      ) : !isSaved ? (
        <div className="flex items-center justify-start gap-4 mb-4 text-red-600 flex-col sm:flex-row">
          <MdOutlineCloudUpload />
          Đang lưu câu trả lời của bạn
        </div>
      ) : null}
    </>
  );
};

export default DataState;
