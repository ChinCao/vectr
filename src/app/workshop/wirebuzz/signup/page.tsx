import SignUpForm from "../../_components/SignUpForm";
import {WORKSHOP_BANNER_SRC} from "../../constants/constants";

const page = () => {
  return (
    <div className="mt-20 w-full flex flex-col items-center justify-center">
      <SignUpForm
        bannerSrc={WORKSHOP_BANNER_SRC.wirebuzz}
        workshopType="wirebuzz"
      />
    </div>
  );
};

export default page;
