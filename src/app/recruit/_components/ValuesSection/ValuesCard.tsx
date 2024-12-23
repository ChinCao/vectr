import Image from "next/image";

const ValuesCard = ({title, content, image_url, image_alt}: {title: string; content: string; image_url: string; image_alt: string}) => {
  return (
    <div className="border rounded flex col-span-2 lg:col-span-1 flex-col lg:flex-row sm:flex-row items-center">
      <div className="flex flex-col items-start justify-center p-10 pt-0 sm:pt-10 gap-4 order-[1] sm:order-0">
        <h3 className="font-semibold text-2xl">{title}</h3>
        <p className="text-gray-500 ">{content}</p>
      </div>
      <Image
        className="order-[0] sm:order-1 pt-5 sm:pt-0"
        src={image_url}
        width={150}
        height={300}
        alt={image_alt}
      />
    </div>
  );
};

export default ValuesCard;
