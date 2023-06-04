import {
  MasjidInformation,
  fetchHongKongMasjidsInformation,
} from "@/app/MasjidService";
import MasjidLogo from "@/app/components/MasjidLogo";
import PoweredByMasjidal from "@/app/components/PoweredByMasjidal";
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

  if (!masjid) return {};

  const masjidIqamahTimesDescription =
    createMasjidIqamahTimesDescription(masjid);

  return {
    title: `${masjid?.name} Prayer/Iqamah/Jamaat Times`,
    description: masjidIqamahTimesDescription,
    openGraph: {
      type: "website",
      description: masjidIqamahTimesDescription,
      images: masjid?.logo,
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
    <div className="flex justify-center">
      <div>
        <h2 className="text-xl mb-2 text-center font-bold">{masjid.name}</h2>
        <div className="flex justify-center mt-2 mb-4">
          <MasjidLogo name={masjid.name} url={masjid.logo} />
        </div>
        <div className="flex justify-center">
          <iframe
            className="text-center"
            src={`https://timing.athanplus.com/masjid/widgets/embed?theme=1&masjid_id=${masjid.id}`}
            height="560"
          />
        </div>
        <PoweredByMasjidal />
      </div>
    </div>
  );
};

export default Masjid;
