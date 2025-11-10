import Image from "next/image";

const MasjidLogo = ({ name, url }: { name: string; url: string }) => {
  if (!url) return null;

  return <Image src={url} alt={`${name} logo`} width={100} height={100} />;
};

export default MasjidLogo;
