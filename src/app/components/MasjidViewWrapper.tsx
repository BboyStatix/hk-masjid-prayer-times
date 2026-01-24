"use client";

import { useState, useEffect } from "react";
import MasjidCards from "./MasjidCards";
import MasjidLists from "./MasjidLists";
import { MasjidInformation } from "../MasjidService";

interface MasjidViewWrapperProps {
  masjids: MasjidInformation[];
}

export default function MasjidViewWrapper({ masjids }: MasjidViewWrapperProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);  // ← moved here

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

  return (
    <div>
      <div className="hidden md:block">
        <MasjidCards
          masjids={masjids}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          showFavoritesOnly={showFavoritesOnly}           // ← pass down
          setShowFavoritesOnly={setShowFavoritesOnly}     // ← pass down
        />
      </div>

      <div className="md:hidden">
        <MasjidLists
          masjids={masjids}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          showFavoritesOnly={showFavoritesOnly}           // ← pass down
          setShowFavoritesOnly={setShowFavoritesOnly}     // ← pass down
        />
      </div>
    </div>
  );
}