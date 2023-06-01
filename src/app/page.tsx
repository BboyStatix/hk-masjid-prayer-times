import Image from "next/image";
import { fetchHongKongMasjidsInformation } from "./MasjidService";
import Link from "next/link";

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
            <h2 className="text-2xl">{masjid.name}</h2>

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

            <h3 className="text-xl">Iqamah</h3>
            <div>Fajr {masjid.times[0].iqamah.fajr}</div>
            <div>Zuhr {masjid.times[0].iqamah.zuhr}</div>
            <div>Asr {masjid.times[0].iqamah.asr}</div>
            <div>Maghrib {masjid.times[0].iqamah.maghrib}</div>
            <div>Isha {masjid.times[0].iqamah.isha}</div>

            <br />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Masjids;
