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
  const [initialFavorites, setInitialFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);  // ← moved here

  useEffect(() => {
    const saved = localStorage.getItem("favoriteMasjids");
    if (saved) {
      const parsedFavorites = JSON.parse(saved);
      setFavorites(parsedFavorites);
      setInitialFavorites(parsedFavorites); // Store initial state for sorting
    }
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

  // Sort masjids based on initial favorites (on mount), not current favorites
  // This prevents jarring reordering when toggling favorites during the session
  const sortedMasjids = [...masjids].sort((a, b) => {
    const aIsFavorite = initialFavorites.includes(a.id);
    const bIsFavorite = initialFavorites.includes(b.id);
    
    // If both are favorites or both are not favorites, maintain original order
    if (aIsFavorite === bIsFavorite) return 0;
    
    // If a is favorite and b is not, a comes first (return -1)
    // If b is favorite and a is not, b comes first (return 1)
    return aIsFavorite ? -1 : 1;
  });

  return (
    <div>
      <div className="hidden md:block">
        <MasjidCards
          masjids={sortedMasjids}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          showFavoritesOnly={showFavoritesOnly}           // ← pass down
          setShowFavoritesOnly={setShowFavoritesOnly}     // ← pass down
        />
      </div>

      <div className="md:hidden">
        <MasjidLists
          masjids={sortedMasjids}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          showFavoritesOnly={showFavoritesOnly}           // ← pass down
          setShowFavoritesOnly={setShowFavoritesOnly}     // ← pass down
        />
      </div>
    </div>
  );
}