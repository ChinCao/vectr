import Image from "next/image";
import ValuesCard from "./ValuesCard";

const Values = () => {
  return (
    <section id="values">
      <div className="container flex flex-col pt-40 gap-7">
        <h1 className="text-5xl font-bold text-center sm:text-left">Giá trị của chúng mình</h1>
        <p className="text-gray-500 text-[15px] text-center sm:text-left">
          Các giá trị cốt lõi của VECTR định hướng hành vi, quyết định và hành động của chúng mình, cho phép hợp tác thống nhất giữa các ban đa dạng
          trong tổ chức.
        </p>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          <div className="border rounded col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col lg:flex-col items-center sm:flex-row">
            <div className="flex flex-col items-start justify-center p-10 pt-0 sm:pt-10 gap-4 order-[1] sm:order-0 ">
              <h3 className="font-semibold text-2xl">Tập trung vào cộng đồng</h3>
              <p className="text-gray-500 ">
                Chúng mình đặt nhu cầu của cộng đồng lên hàng đầu và cung cấp dịch vụ chất lượng để giải quyết các vấn đề thực tế.
              </p>
            </div>
            <Image
              className="w-[150px] lg:w-[300px] order-[0] sm:order-1 pt-5 sm:pt-0"
              src="/user-focused2.svg"
              width={300}
              height={300}
              alt="community"
            />
          </div>
          <ValuesCard
            title="Sự hợp tác"
            content="Chúng mình giao tiếp cởi mở và thoải mái. Chúng mình làm
              việc theo nhóm hướng tới mục tiêu chung là cùng nhau xây
              dựng cồng động và mang lại giá trị hữu ích."
            image_url="/collaboration2.svg"
            image_alt="community"
          />
          <ValuesCard
            title="Táo bạo"
            content="Chúng mình hướng tới kết quả. Chúng mình hoàn thành và vượt
              chỉ tiêu mọi việc. Chúng mình đam mê và làm việc chăm chỉ.
              Khi thất bại, đó sẽ là cơ hội cho chúng mình học hỏi và tự
              đứng dậy vững vàng hơn."
            image_url="/hardcore3.svg"
            image_alt="hardcore"
          />
          <ValuesCard
            title="Tự do"
            content="Chúng mình thực hiện một cách có trách nhiệm và tự chủ.
              Chúng mình trao quyền cho những người xung quanh. Nhóm của
              chúng mình đa dạng và chúng mình thách thức hiện trạng."
            image_url="/freedom3.svg"
            image_alt="freedome"
          />
          <ValuesCard
            title="Khiêm nhường"
            content="Chúng mình chấp nhận phản hồi mang tính phê bình. Chúng mình
              đối xử với mọi người như nhau. Chúng mình khiêm tốn về thành
              công của mình."
            image_url="/humility3.svg"
            image_alt="humility"
          />
          <div className="border-primary border rounded flex items-center justify-center col-span-2">
            <div className="flex flex-col items-center justify-center p-10 gap-4">
              <h3 className="text-center text-primary font-bold text-2xl uppercase">{`"Chúng ta cùng có thể tạo nên những kỳ tích phi thường!"`}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
