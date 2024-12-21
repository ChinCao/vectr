import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";

const MissionCard = ({image_url, image_alt, title, content}: {image_url: string; image_alt: string; title: string; content: string}) => {
  return (
    <div className="flex flex-col items-start justify-start gap-2 w-full md:w-[33%]">
      <Card className="w-full">
        <CardContent className="px-0 pt-6">
          <Image
            src={image_url}
            width={400}
            height={400}
            alt={image_alt}
          />
        </CardContent>
      </Card>
      <h3 className="font-semibold text-xl text-center">{title}</h3>
      <p className="text-gray-500 text-justify">{content}</p>
    </div>
  );
};

export default MissionCard;
