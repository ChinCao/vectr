import {ReactNode} from "react";

const JobDescriptionLayout = async ({children}: {children: ReactNode}) => {
  return <div className="min-h-screen flex flex-col justify-start items-center">{children}</div>;
};

export default JobDescriptionLayout;
