"use client";

import { MasjidInformation } from "../MasjidService";
import Link from "next/link";
import PoweredByMasjidal from "./PoweredByMasjidal";
import MasjidLogo from "./MasjidLogo";
import Image from "next/image";
import SearchBar from "./SearchBar";
import UpcomingIqamah from "./UpcomingIqamah";
import { useState, useEffect } from 'react';

const ListGroup = ({
  masjids,
}: {
  masjids: MasjidInformation[];
}) => {
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

  // Filter the list based on toggle
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

      {/* Favorites Toggle - Very light lime-green when active */}
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
              ? "No favorites yet. Heart some masjids!"
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
                {/* LEFT: Logo + Name */}
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

                {/* RIGHT: Heart + Arrow */}
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
                      <svg
                        className="w-7 h-7 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-7 h-7 text-gray-400 hover:text-red-500 transition"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
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

export default ListGroup;