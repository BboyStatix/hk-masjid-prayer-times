"use client";

import { MasjidInformation } from "../MasjidService";
import Link from "next/link";
import IqamahTimes from "./IqamahTimes";
import PoweredByMasjidal from "./PoweredByMasjidal";
import MasjidLogo from "./MasjidLogo";
import Image from "next/image";
import SearchBar from "./SearchBar";

const CardGroup = ({ masjids }: { masjids: MasjidInformation[] }) => {
  return (
    <div>
      <div className="text-center">
        <Image
          className="inline-block"
          src="/favicon.ico"
          alt="Hong Kong Masjid Prayer Times icon"
          width={50}
          height={50}
        />
        <h1 className="text-3xl mb-2">Hong Kong Masjid Prayer times</h1>
      </div>

      <div className="flex justify-center mt-8 mb-8">
        <div className="w-full max-w-2xl px-4">
          <SearchBar />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {masjids.map((masjid) => (
          <Link
            key={masjid.id}
            href={`/masjids/${encodeURIComponent(masjid.name)}`}
            className="border p-4 text-center hover:bg-gray-300 cursor-pointer"
          >
            <h2 className="text-2xl font-bold">{masjid.name}</h2>
            {masjid.logo && (
              <div className="flex justify-center mb-2">
                <MasjidLogo name={masjid.name} url={masjid.logo} />
              </div>
            )}
            <IqamahTimes prayerTime={masjid.times[0]} />
          </Link>
        ))}
      </div>

      <PoweredByMasjidal />
    </div>
  );
};

export default CardGroup;
