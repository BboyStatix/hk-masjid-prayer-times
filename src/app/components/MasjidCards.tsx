"use client";

import { MasjidInformation } from "../MasjidService";
import Link from "next/link";
import PoweredByMasjidal from "./PoweredByMasjidal";
import MasjidLogo from "./MasjidLogo";
import Image from "next/image";
import SearchBar from "./SearchBar";
import IqamahTimes from "./IqamahTimes";
import { useState, useEffect } from 'react';

const CardGroup = ({ masjids }: { masjids: MasjidInformation[] }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("favoriteMasjids");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteMasjids", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (masjidId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(masjidId)
        ? prev.filter((id) => id !== masjidId)
        : [...prev, masjidId]
    );
  };

  const isFavorite = (masjidId: string) => favorites.includes(masjidId);

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
            ? "No favorites yet. Tap the heart on any masjid to add it!"
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
              {/* Heart button - always top-right */}
              <button
                onClick={(e) => toggleFavorite(masjid.id, e)}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm transition"
                aria-label={isFavorite(masjid.id) ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite(masjid.id) ? (
                  <svg className="w-7 h-7 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7 text-gray-400 group-hover:text-red-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )}
              </button>

              {/* Content - conditional centering when no logo */}
              <div className="p-4 flex flex-col items-center flex-grow">
                {masjid.logo ? (
                  // With logo: normal layout
                  <>
                    <div className="mb-3">
                      <MasjidLogo name={masjid.name} url={masjid.logo} />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center line-clamp-2">
                      {masjid.name}
                    </h2>
                    <div className="mt-auto w-full">
                      <IqamahTimes prayerTime={masjid.times[0]} />
                    </div>
                  </>
                ) : (
                  // No logo: center name vertically, add extra top padding for heart clearance
                  <div className="flex flex-col items-center justify-center flex-grow pt-10 pb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center line-clamp-3">
                      {masjid.name}
                    </h2>
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

export default CardGroup;