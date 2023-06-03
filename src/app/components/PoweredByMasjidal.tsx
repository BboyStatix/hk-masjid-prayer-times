import Image from "next/image";

const PoweredByMasjidal = () => (
  <div className="flex justify-center">
    <a href="https://app.masjidal.com" target="_blank">
      Powered by
      <div className="flex justify-center">
        <Image
          alt="Powered by MasjidAl logo"
          src="/masjidal-logo.png"
          width={50}
          height={50}
        />
      </div>
    </a>
  </div>
);

export default PoweredByMasjidal;
