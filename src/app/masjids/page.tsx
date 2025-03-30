
import { Metadata } from "next";
import { fetchHongKongMasjidsInformation } from "../MasjidService";
import MasjidCards from "../components/MasjidCards"

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

const Masjids = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string
  }>;
}) => {
  const query = searchParams ? (await searchParams).query || '' : '';
  const masjids = await fetchHongKongMasjidsInformation();
  const filteredMasjids = masjids.filter(masjid =>
    !query || masjid.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <MasjidCards masjids={filteredMasjids} />
  );
};

export default Masjids;
