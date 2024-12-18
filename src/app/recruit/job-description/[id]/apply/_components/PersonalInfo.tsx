import Name from "./PersonalInfo/Name";
import { PersonalInfoProps } from "./PersonalInfo/_types/PersonalProps";
import StundentID from "./PersonalInfo/StundentID";
import Class from "./PersonalInfo/Class";
import SchoolEmail from "./PersonalInfo/SchoolEmail";
import PrivateEmail from "./PersonalInfo/PrivateEmail";
import Facebook from "./PersonalInfo/Facebook";
import Instagram from "./PersonalInfo/Instagram";

const PersonalInfo = ({
  form,
  studentID,
  isFetching,
  setStudentID,
  schoolEmail,
  setSchoolEmail,
  manual,
  setManual,
}: PersonalInfoProps) => {
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
