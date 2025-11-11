"use client";

import { MasjidInformation } from "../MasjidService";
import Link from "next/link";
import IqamahTimes from "./IqamahTimes";
import PoweredByMasjidal from "./PoweredByMasjidal";
import MasjidLogo from "./MasjidLogo";
import Image from "next/image";
import SearchBar from "./SearchBar";
import UpcomingIqamah from "./UpcomingIqamah";

const ListGroup = ({ masjids }: { masjids: MasjidInformation[] }) => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <Image
          className="inline-block"
          src="/favicon.ico"
          alt="Hong Kong Masjid Prayer Times icon"
          width={50}
          height={50}
        />
        <h1 className="text-2xl mb-2">Hong Kong Masjid Prayer times</h1>
      </div>

      <div className="flex justify-center mb-8">
        <div className="w-full max-w-2xl">
          <SearchBar />
        </div>
      </div>

      {/* List View Container */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {masjids.map((masjid) => (
          <Link
            key={masjid.id}
            href={`/masjids/${encodeURIComponent(masjid.name)}`}
            className="border-b last:border-b-0 p-4 hover:bg-gray-50 cursor-pointer transition-colors block"
          >
            <div className="flex items-center gap-3 min-h-[80px]">
              {/* Masjid Logo */}
              {masjid.logo && (
                <div className="flex-shrink-0 w-12 h-12 object-contain">
                  <MasjidLogo name={masjid.name} url={masjid.logo} />
                </div>
              )}

              {/* Masjid Info */}
              <div className="flex-grow min-w-0">
                <h2 className="text-base font-semibold text-gray-800 mb-1 truncate">
                  {masjid.name}
                </h2>
                <UpcomingIqamah prayerTime={masjid.times[0]} />
              </div>

              {/* Arrow Indicator */}
              <div className="flex-shrink-0 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <PoweredByMasjidal />
    </div>
  );
};

export default ListGroup;
