const ProcessBlock = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className="flex flex-col gap-5 w-full sm:w-[25%]">
      <p className="text-5xl font-bold text-gray-400 opacity-40">{title}</p>
      <p className="font-semibold capitalize">{text}</p>
    </div>
  );
};

export default ProcessBlock;
