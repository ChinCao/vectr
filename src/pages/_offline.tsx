import Image from "next/image";

const _offline = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/favicon.ico" height={300} width={300} alt="Logo" />
      <h1>Bạn hiện đang không có kết nối đến Internet!</h1>
    </div>
  );
};

export default _offline;
