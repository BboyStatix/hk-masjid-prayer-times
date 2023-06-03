import {
  MasjidInformation,
  fetchHongKongMasjidsInformation,
} from "@/app/MasjidService";
import { Metadata } from "next";

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
      <h2 className="text-xl mb-2">{masjid.name}</h2>
      <iframe
        src={`https://timing.athanplus.com/masjid/widgets/embed?theme=1&masjid_id=${masjid.id}`}
        height="560"
      />
    </div>
  );
};

export default Masjid;
