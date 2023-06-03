import Image from "next/image";
import { fetchHongKongMasjidsInformation } from "./MasjidService";
import Link from "next/link";
import IqamahTimes from "./components/IqamahTimes";
import PoweredByMasjidal from "./components/PoweredByMasjidal";

const Masjids = async () => {
  const masjids = await fetchHongKongMasjidsInformation();

  return (
    <div>
      <h1 className="text-3xl mb-2">Hong Kong Masjid Prayer times</h1>
      <div className="grid grid-cols-4 gap-4">
        {masjids.map((masjid) => (
          <Link
            key={masjid.id}
            className="border p-4 text-center hover:bg-gray-300"
            href={`/masjids/${masjid.name}`}
          >
            <h2 className="text-2xl font-bold">{masjid.name}</h2>

            {masjid.logo && (
              <div className="flex justify-center mb-2">
                <Image
                  src={masjid.logo}
                  alt={`${masjid.name} logo`}
                  width={100}
                  height={100}
                />
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
