import Image from "next/image";
import NavigationButton from "../NavigationButton";

const BenefitsSection = () => {
  return (
    <section
      id="benefits"
      className="relative"
    >
      <div className="container flex flex-col pt-20 w-full   sm:w-[70%] items-center gap-10 ">
        <h1 className="text-5xl font-bold text-center">Các quyền lợi khi gia nhập VECTR</h1>
        <NavigationButton
          href="/recruit/benefits"
          noArrow={true}
          text="Xem quyền lợi"
          button_className="bg-[#f7c325] w-[200px]  sm:w-[305px] border-2 border-black rounded-bl-none rounded-br-none"
        />
      </div>
      <Image
        src="/header-rebrand-2x.png"
        width={1216}
        height={190}
        alt="benefits"
        className="absolute bottom-0 border-b-2 border-b-black border-t-none z-[-1]"
      />
    </section>
  );
};

export default BenefitsSection;
