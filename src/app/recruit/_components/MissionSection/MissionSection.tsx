import {MISSION_SECTION_INFORMATION} from "../../_constants/constants";
import MissionCard from "./MissionCard";

const MissionSection = () => {
  return (
    <section id="mission">
      <div className="container pt-24">
        <h1 className="text-5xl font-bold text-center">Sứ mệnh của VECTR</h1>
        <div className="flex flex-col lg:flex-row gap-14 mt-10">
          {MISSION_SECTION_INFORMATION.map((item, index) => (
            <MissionCard
              key={index}
              image_url={item.image_url}
              image_alt={item.image_alt}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
