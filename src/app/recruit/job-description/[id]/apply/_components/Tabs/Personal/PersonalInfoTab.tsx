"use client";
import { useState } from "react";
import { PersonalInfoProps } from "./Inputs/_types/PersonalProps";
import Class from "./Inputs/Class";
import Facebook from "./Inputs/Facebook";
import Instagram from "./Inputs/Instagram";
import Name from "./Inputs/Name";
import PrivateEmail from "./Inputs/PrivateEmail";
import SchoolEmail from "./Inputs/SchoolEmail";
import StundentID from "./Inputs/StundentID";

const PersonalInfo = ({ form, isFetching }: PersonalInfoProps) => {
  const [studentID, setStudentID] = useState("VS");
  const [schoolEmail, setSchoolEmail] = useState("@stu.vinschool.edu.vn");
  const [manual, setManual] = useState(false);
  return (
    <>
      <h1 className="font-bold text-2xl text-primary">Thông tin cá nhân</h1>
      <Name form={form} isFetching={isFetching} />
      <StundentID
        form={form}
        isFetching={isFetching}
        manual={manual}
        studentID={studentID}
        setSchoolEmail={setSchoolEmail}
        setStudentID={setStudentID}
      />
      <Class isFetching={isFetching} form={form} />
      <SchoolEmail
        form={form}
        isFetching={isFetching}
        manual={manual}
        schoolEmail={schoolEmail}
        setManual={setManual}
        setSchoolEmail={setSchoolEmail}
      />
      <PrivateEmail form={form} isFetching={isFetching} />
      <Facebook form={form} isFetching={isFetching} />
      <Instagram form={form} isFetching={isFetching} />
    </>
  );
};

export default PersonalInfo;
