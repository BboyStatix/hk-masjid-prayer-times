import Image from "next/image";

const MasjidLogo = ({ name, url }: { name: string; url: string }) => (
  <Image src={url} alt={`${name} logo`} width={100} height={100} />
);

export default MasjidLogo;
