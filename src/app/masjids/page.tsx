import { Metadata } from "next";
import { fetchHongKongMasjidsInformation } from "../MasjidService";
import MasjidCards from "../components/MasjidCards"
import MasjidLists from "../components/MasjidLists"

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
    <div>
      {/* Desktop View - Hidden on mobile */}
      <div className="hidden md:block">
        <MasjidCards masjids={filteredMasjids} />
      </div>
      
      {/* Mobile View - Hidden on desktop */}
      <div className="md:hidden">
        <MasjidLists masjids={filteredMasjids} />
      </div>
    </div>
  );
};

export default Masjids;