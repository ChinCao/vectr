import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import NavigationButton from "../_components/NavigationButton";

const JobDescriptionPage = () => {
  const dimension = 225;
  return (
    <>
      <title>Chọn ban</title>
      <div className="py-24 container">
        <NavigationButton
          href="/recruit/"
          text="Trở lại trang recruit"
          direction="left"
        />
        <div className="flex flex-col mt-5 gap-6">
          <h1 className="capitalize text-center font-bold text-5xl">
            Chọn ban để apply
          </h1>
          <div className="flex flex-row gap-6 flex-wrap items-center justify-center ">
            <Link href="/recruit/job-description/coding">
              <Card className="py-3 hover:scale-[1.01]">
                <CardContent>
                  <Image
                    src="/special-relativity-ZZpyj9.png"
                    width={dimension}
                    height={dimension}
                    alt="Graphic"
                  />
                </CardContent>
                <CardTitle className="text-center uppercase text-2xl">
                  Coding
                </CardTitle>
              </Card>
            </Link>
            <Link href="/recruit/job-description/robotics">
              <Card className="py-3 hover:scale-[1.01]">
                <CardContent>
                  <Image
                    src="/electromagnetism-AzFMTl.png"
                    width={dimension}
                    height={dimension}
                    alt="Graphic"
                  />
                </CardContent>
                <CardTitle className="text-center uppercase text-2xl">
                  Robotics
                </CardTitle>
              </Card>
            </Link>
            <Link href="/recruit/job-description/hc">
              <Card className="py-3 hover:scale-[1.01]">
                <CardContent>
                  <Image
                    src="/puzzle-science-Te3zoj.png"
                    width={dimension}
                    height={dimension}
                    alt="Graphic"
                  />
                </CardContent>
                <CardTitle className="text-center uppercase text-2xl">
                  Hậu Cần
                </CardTitle>
              </Card>
            </Link>
            <Link href="/recruit/job-description/ph">
              <Card className="py-3 hover:scale-[1.01]">
                <CardContent>
                  <Image
                    src="/creative-coding-XgYZa1.png"
                    width={dimension}
                    height={dimension}
                    alt="Graphic"
                  />
                </CardContent>
                <CardTitle className="text-center uppercase text-2xl">
                  {`PH (DESIGN)`}
                </CardTitle>
              </Card>
            </Link>
            <Link href="/recruit/job-description/pr">
              <Card className="py-3 hover:scale-[1.01]">
                <CardContent>
                  <Image
                    src="/Text_Analysis_in_Python-rcga5J.png"
                    width={dimension}
                    height={dimension}
                    alt="Graphic"
                  />
                </CardContent>
                <CardTitle className="text-center uppercase text-2xl">
                  {`PR`}
                </CardTitle>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescriptionPage;
