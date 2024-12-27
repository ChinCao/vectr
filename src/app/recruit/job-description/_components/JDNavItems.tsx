"use client";

import Link from "next/link";
import {CLICK_SOUND_URL, CLICK_SOUND_VOLUME, DepartmentsAbbreviation, DepartmentSchema} from "../../_constants/constants";
import useSound from "use-sound";
import {PRIMARY_ORANGE_HEX} from "@/constants/constants";

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
          borderBottom: info["abbreviation"] == department ? `1px solid ${PRIMARY_ORANGE_HEX}` : "",
        }}
      >
        <h1 style={{color: info["abbreviation"] == department ? PRIMARY_ORANGE_HEX : ""}}>{info["abbreviation"].toUpperCase()}</h1>
      </Link>
    </>
  );
};

export default JDNavItems;
