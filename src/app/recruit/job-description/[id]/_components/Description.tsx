import {DepartmentsAbbreviation} from "@/app/recruit/_constants/constants";
import {GetSheetDataResponse} from "@/app/recruit/_lib/_types/GoogleResponseTypes";
import {GetSheetData} from "@/app/recruit/_lib/GoogleUtils";
import ErrorMessage from "@/components/ErrorMessage";

const Description = async ({id}: {id: DepartmentsAbbreviation}) => {
  const description_data: GetSheetDataResponse = await GetSheetData(id, "jd");

  if (description_data.status == 500) {
    return (
      <ErrorMessage
        message="Không thể lấy job description từ cơ sở dữ liệu."
        href="/recruit/job-description"
        link_message="Chọn ban khác"
        jdError={true}
        department={id!}
      />
    );
  }

  if ("data" in description_data) {
    return (
      <div className="pt-4  flex flex-col gap-y-16 items-start justify-center">
        {description_data.data!.map((data: string[]) => {
          return (
            <div
              className="flex flex-col items-start justify-center"
              key={data[0]}
            >
              <h1 className="text-2xl font-semibold mb-3">{data[0]}</h1>
              <ul className="flex flex-col gap-2">
                {data.slice(1).map((item, index) => (
                  <li
                    key={index}
                    className="relative before:content-[''] before:block before:w-[3px] before:h-[3px] before:bg-current before:absolute before:right-[102%] before:top-[25%] sm:before:top-[50%] font-light"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Description;
