const Anchor = ({href, text}: {href: string; text: string}) => {
  return (
    <a
      href={href}
      className="w-full block py-3 px-3 font-light"
    >
      {text}
    </a>
  );
};

export default Anchor;
