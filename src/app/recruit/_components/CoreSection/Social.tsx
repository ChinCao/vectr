import {FaFacebook, FaInstagram} from "react-icons/fa";

const Social = ({facebook, instagram, size}: {facebook: string; instagram: string; size: number}) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <a
        href={facebook}
        target="_blank"
        rel="noopener"
        title="Facebook link"
      >
        <FaFacebook
          className="hover:cursor-pointer text-primary hover:text-primary-facebook_blue"
          size={size}
        />
      </a>
      <a
        href={instagram}
        target="_blank"
        rel="noopener"
        title="Facebook link"
      >
        <FaInstagram
          className="hover:cursor-pointer text-primary hover:text-primary-instagram_pink"
          size={size}
        />
      </a>
    </div>
  );
};

export default Social;
