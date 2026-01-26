"use client";

import { MasjidInformation } from "../MasjidService";
import Link from "next/link";
import PoweredByMasjidal from "./PoweredByMasjidal";
import MasjidLogo from "./MasjidLogo";
import Image from "next/image";
import SearchBar from "./SearchBar";
import UpcomingIqamah from "./UpcomingIqamah";

interface MasjidListsProps {
  masjids: MasjidInformation[];
  toggleFavorite: (masjidId: string, e: React.MouseEvent) => void;
  isFavorite: (masjidId: string) => boolean;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: React.Dispatch<React.SetStateAction<boolean>>;
}

const MasjidLists = ({
  masjids,
  toggleFavorite,
  isFavorite,
  showFavoritesOnly,
  setShowFavoritesOnly,
}: MasjidListsProps) => {
  const displayedMasjids = showFavoritesOnly
    ? masjids.filter((masjid) => isFavorite(masjid.id))
    : masjids;

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
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

      {/* Search */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-2xl">
          <SearchBar />
        </div>
      </div>

      {/* Favorites Toggle */}
      <div className="flex justify-center mb-8">
        <button
          type="button"
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`
            px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200
            border border-gray-300 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2
            ${showFavoritesOnly 
              ? 'bg-lime-100 text-lime-800 hover:bg-lime-200' 
              : 'bg-white text-gray-700 hover:bg-gray-100'}
          `}
        >
          Favourites
        </button>
      </div>

      {/* Card List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
        {displayedMasjids.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {showFavoritesOnly
              ? "No favorites yet. Star some masjids!"
              : "No masjids found."}
          </div>
        ) : (
          displayedMasjids.map((masjid) => (
            <Link
              key={masjid.id}
              href={`/masjids/${encodeURIComponent(masjid.name)}`}
              className="border-b last:border-b-0 p-4 hover:bg-gray-50 cursor-pointer transition-colors block"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {masjid.logo && (
                    <div className="flex-shrink-0 w-12 h-12">
                      <MasjidLogo name={masjid.name} url={masjid.logo} />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold text-gray-800 mb-1 truncate">
                      {masjid.name}
                    </h2>
                    <UpcomingIqamah prayerTime={masjid.times[0]} />
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(masjid.id, e);
                    }}
                    className="flex-shrink-0"
                  >
                    {isFavorite(masjid.id) ? (
                      <svg className="w-7 h-7 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-7 h-7 text-gray-400 hover:text-yellow-500 transition"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    )}
                  </button>

                  <svg
                    className="w-5 h-5 text-gray-400"
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
          ))
        )}
      </div>

      <PoweredByMasjidal />
    </div>
  );
};

export default MasjidLists;