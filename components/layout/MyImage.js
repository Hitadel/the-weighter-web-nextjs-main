import Image from "next/image";

const MyImage = ({ alt, ref }) => {
  return <Image ref={ref} alt={alt} />;
};

export default MyImage;
