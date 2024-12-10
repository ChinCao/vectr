import { ReactNode } from "react";

const JobLayout = ({ children }: { children: ReactNode }) => {
  return <div className="py-14 container">{children}</div>;
};

export default JobLayout;
