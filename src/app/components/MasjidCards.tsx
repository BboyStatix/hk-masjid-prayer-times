"use client"

import { fetchHongKongMasjidsInformation, MasjidInformation } from "../MasjidService";
import Link from "next/link";
import IqamahTimes from "./IqamahTimes";
import PoweredByMasjidal from "./PoweredByMasjidal";
import MasjidLogo from "./MasjidLogo";
import Image from "next/image";
import SearchBar from "./SearchBar"
import MasjidModal from '../components/MasjidModal';
import { useState, useEffect } from 'react';


const CardGroup = ({
  masjids,
}: {
  masjids: MasjidInformation[];
}) => {
  const [selectedMasjid, setSelectedMasjid] = useState<MasjidInformation | null>(null);

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
          <div
            key={masjid.id}
            className="border p-4 text-center hover:bg-gray-300 cursor-pointer"
            onClick={() => setSelectedMasjid(masjid)}
          >
            <h2 className="text-2xl font-bold">{masjid.name}</h2>
            {masjid.logo && (
              <div className="flex justify-center mb-2">
                <MasjidLogo name={masjid.name} url={masjid.logo} />
              </div>
            )}
            <IqamahTimes prayerTime={masjid.times[0]} />
          </div>
        ))}
      </div>

      {selectedMasjid && (
        <MasjidModal
          masjid={selectedMasjid}
          isOpen={true}
          onClose={() => setSelectedMasjid(null)}
        />
      )}

      <PoweredByMasjidal />
    </div>
  );
};

export default CardGroup;
