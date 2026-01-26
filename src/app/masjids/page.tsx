import { Metadata } from "next";
import { fetchHongKongMasjidsInformation } from "../MasjidService";
import MasjidViewWrapper from "../components/MasjidViewWrapper";  // ← this line must match

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

export default async function Masjids({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const query = searchParams ? (await searchParams).query || "" : "";
  const masjids = await fetchHongKongMasjidsInformation();
  const filteredMasjids = masjids.filter((masjid) =>
    !query || masjid.name.toLowerCase().includes(query.toLowerCase())
  );

  return <MasjidViewWrapper masjids={filteredMasjids} />;
}