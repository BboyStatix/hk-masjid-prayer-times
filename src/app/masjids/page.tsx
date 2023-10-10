import { fetchHongKongMasjidsInformation } from "../MasjidService";
import Link from "next/link";
import IqamahTimes from "../components/IqamahTimes";
import PoweredByMasjidal from "../components/PoweredByMasjidal";
import MasjidLogo from "../components/MasjidLogo";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hong Kong Masjid Prayer Times",
    description: "Prayer times across masjids/madrassas in Hong Kong",
    openGraph: {
      type: "website",
      title: "Hong Kong Masjid Prayer Times",
      images: "favicon.ico",
    },
  };
}

const Masjids = async () => {
  const masjids = await fetchHongKongMasjidsInformation();

  return (
    <div>
      <div className="text-center">
        <Image className="inline-block" src="/favicon.ico" alt="Hong Kong Masjid Prayer Times icon" width={50} height={50} />
        <h1 className="text-3xl mb-2">Hong Kong Masjid Prayer times</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {masjids.map((masjid) => (
          <Link
            key={masjid.id}
            className="border p-4 text-center hover:bg-gray-300"
            href={`/masjids/${masjid.name}`}
          >
            <h2 className="text-2xl font-bold">{masjid.name}</h2>

            {masjid.logo && (
              <div className="flex justify-center mb-2">
                <MasjidLogo name={masjid.name} url={masjid.logo} />
              </div>
            )}

            <IqamahTimes prayerTime={masjid.times[0]} />
            <br />
          </Link>
        ))}
      </div>
      <PoweredByMasjidal />
    </div>
  );
};

export default Masjids;
