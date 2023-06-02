import { PrayerTime } from "../MasjidService";

interface Props {
  prayerTime: PrayerTime;
}

const IqamahTimes = ({ prayerTime }: Props) => (
  <div>
    <h3 className="text-xl">Iqamah</h3>
    <div>Fajr {prayerTime.iqamah.fajr}</div>
    <div>Zuhr {prayerTime.iqamah.zuhr}</div>
    <div>Asr {prayerTime.iqamah.asr}</div>
    <div>Maghrib {prayerTime.iqamah.maghrib}</div>
    <div>Isha {prayerTime.iqamah.isha}</div>
  </div>
);

export default IqamahTimes;
