// components/UpcomingIqamahTime.tsx
import { PrayerTime } from "../MasjidService";
import { useEffect, useState } from "react";

interface Props {
  prayerTime: PrayerTime;
}

const UpcomingIqamah = ({ prayerTime }: Props) => {
  const [upcomingPrayer, setUpcomingPrayer] = useState<{ name: string; time: string } | null>(null);

  useEffect(() => {
    const convertTo24Hour = (timeStr: string): number => {
      // Example: "6:30 AM" or "6:30 PM"
      const [time, period] = timeStr.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      
      let hour24 = hours;
      if (period === 'PM' && hours !== 12) {
        hour24 = hours + 12;
      } else if (period === 'AM' && hours === 12) {
        hour24 = 0;
      }
      
      return hour24 * 60 + minutes;
    };

    const findUpcomingPrayer = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      const prayers = [
        { name: "Fajr", time: prayerTime.iqamah.fajr },
        { name: "Zuhr", time: prayerTime.iqamah.zuhr },
        { name: "Asr", time: prayerTime.iqamah.asr },
        { name: "Maghrib", time: prayerTime.iqamah.maghrib },
        { name: "Isha", time: prayerTime.iqamah.isha },
      ];

      // Convert all prayer times to minutes for comparison
      const prayerTimesInMinutes = prayers.map(prayer => ({
        ...prayer,
        minutes: convertTo24Hour(prayer.time)
      }));

      // Sort by time to ensure correct order
      prayerTimesInMinutes.sort((a, b) => a.minutes - b.minutes);

      // Find the next prayer
      const nextPrayer = prayerTimesInMinutes.find(prayer => 
        prayer.minutes > currentTime
      );

      if (nextPrayer) {
        setUpcomingPrayer({ name: nextPrayer.name, time: nextPrayer.time });
      } else {
        // If no prayer found for today, use first prayer of tomorrow (Fajr)
        setUpcomingPrayer(prayers[0]);
      }
    };

    findUpcomingPrayer();

    // Update every minute to keep it current
    const interval = setInterval(findUpcomingPrayer, 60000);
    return () => clearInterval(interval);
  }, [prayerTime]);

  if (!upcomingPrayer) {
    return <div className="text-sm text-gray-600">Loading...</div>;
  }

  return (
    <div className="text-sm text-gray-600">
      <div className="font-medium">Next: {upcomingPrayer.name}</div>
      <div>{upcomingPrayer.time}</div>
    </div>
  );
};

export default UpcomingIqamah;