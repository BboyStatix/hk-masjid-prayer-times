"use client";

import { MasjidInformation } from "../MasjidService";
import Link from "next/link";
import PoweredByMasjidal from "./PoweredByMasjidal";
import MasjidLogo from "./MasjidLogo";
import Image from "next/image";
import SearchBar from "./SearchBar";
import IqamahTimes from "./IqamahTimes";

interface MasjidCardsProps {
  masjids: MasjidInformation[];
  toggleFavorite: (masjidId: string, e: React.MouseEvent) => void;
  isFavorite: (masjidId: string) => boolean;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: React.Dispatch<React.SetStateAction<boolean>>;
}

const MasjidCards = ({
  masjids,
  toggleFavorite,
  isFavorite,
  showFavoritesOnly,
  setShowFavoritesOnly,
}: MasjidCardsProps) => {
  const displayedMasjids = showFavoritesOnly
    ? masjids.filter((masjid) => isFavorite(masjid.id))
    : masjids;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <Image
          className="inline-block"
          src="/favicon.ico"
          alt="Hong Kong Masjid Prayer Times icon"
          width={60}
          height={60}
        />
        <h1 className="text-3xl font-bold mt-2">Hong Kong Masjid Prayer Times</h1>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-2xl px-4">
          <SearchBar />
        </div>
      </div>

      {/* Favourite Toggle */}
      <div className="flex justify-center mb-8">
        <button
          type="button"
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`
            px-6 py-3 rounded-full font-medium text-base transition-all duration-200
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

      {/* Card Grid */}
      {displayedMasjids.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          {showFavoritesOnly
            ? "No favorites yet. Tap the star on any masjid to add it!"
            : "No masjids available at the moment."}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {displayedMasjids.map((masjid) => (
            <Link
              key={masjid.id}
              href={`/masjids/${encodeURIComponent(masjid.name)}`}
              className="group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
            >
              <button
                onClick={(e) => toggleFavorite(masjid.id, e)}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm transition"
                aria-label={isFavorite(masjid.id) ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite(masjid.id) ? (
                  <svg className="w-7 h-7 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7 text-gray-400 group-hover:text-yellow-400 transition" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )}
              </button>

              <div className="p-4 flex flex-col items-center flex-grow">
                {masjid.logo ? (
                  <>
                    <div className="mb-3">
                      <MasjidLogo name={masjid.name} url={masjid.logo} />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-1 text-center line-clamp-2">
                      {masjid.name}
                    </h2>
                    {masjid.state && (
                      <div className="mb-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {masjid.state}
                        </span>
                      </div>
                    )}
                    <div className="mt-auto w-full">
                      <IqamahTimes prayerTime={masjid.times[0]} />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center flex-grow pt-10 pb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center line-clamp-3">
                      {masjid.name}
                    </h2>
                    {masjid.state && (
                      <div className="mb-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {masjid.state}
                        </span>
                      </div>
                    )}
                    <div className="mt-auto w-full">
                      <IqamahTimes prayerTime={masjid.times[0]} />
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12">
        <PoweredByMasjidal />
      </div>
    </div>
  );
};

export default MasjidCards;