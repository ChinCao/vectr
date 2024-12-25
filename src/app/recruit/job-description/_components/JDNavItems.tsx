"use client";

import Link from "next/link";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME, DepartmentsAbbreviation, DepartmentSchema} from "../../_constants/constants";
import useSound from "use-sound";

const JDNavItems = ({info, index, department}: {info: DepartmentSchema; index: number; department?: DepartmentsAbbreviation}) => {
  const [playClick] = useSound(CLICK_SOUND_URL, {volume: CLICK_SOUND_VOLUME});

  return (
    <>
      <Link
        onClick={() => playClick()}
        key={index}
        href={info["url"]}
        className="w-full block py-3 px-3 font-normal hover:text-primary"
        style={{
          borderBottom: info["abbreviation"] == department ? "1px solid #e77f1e" : "",
        }}
      >
        <h1 style={{color: info["abbreviation"] == department ? "#e77f1e" : ""}}>{info["abbreviation"].toUpperCase()}</h1>
      </Link>
    </>
  );
};

export default JDNavItems;
