import {
  MasjidInformation,
  fetchHongKongMasjidsInformation,
} from "@/app/MasjidService";
import IqamahTimes from "@/app/components/IqamahTimes";
import { Metadata } from "next";
import Image from "next/image";

const createMasjidIqamahTimesDescription = (masjid?: MasjidInformation) => {
  return masjid
    ? `
      Jamaat Times -
       Fajr: ${masjid.times[0].iqamah.fajr},
       Zuhr: ${masjid.times[0].iqamah.zuhr},
       Asr: ${masjid.times[0].iqamah.asr},
       Maghrib: ${masjid.times[0].iqamah.maghrib},
       Isha: ${masjid.times[0].iqamah.isha}
     `
    : "";
};

export async function generateMetadata({
  params,
}: {
  params: { masjidName: string };
}): Promise<Metadata> {
  const masjids = await fetchHongKongMasjidsInformation();
  const masjid = masjids.find(
    (masjid) => masjid.name === decodeURIComponent(params.masjidName)
  );
  const masjidIqamahTimesDescription =
    createMasjidIqamahTimesDescription(masjid);

  return {
    title: masjid?.name,
    description: masjidIqamahTimesDescription,
    openGraph: {
      type: "website",
      description: masjidIqamahTimesDescription,
    },
  };
}

const Masjid = async ({ params }: { params: { masjidName: string } }) => {
  const masjids = await fetchHongKongMasjidsInformation();
  const masjid = masjids.find(
    (masjid) => masjid.name === decodeURIComponent(params.masjidName)
  );

  if (!masjid) return "Masjid not found!";

  return (
    <div>
      <h2 className="text-2xl">{masjid.name}</h2>

      {masjid.logo && (
        <div className="mb-2">
          <Image
            src={masjid.logo}
            alt={`${masjid.name} logo`}
            width={100}
            height={100}
          />
        </div>
      )}

      <IqamahTimes prayerTime={masjid.times[0]} />
    </div>
  );
};

export default Masjid;
