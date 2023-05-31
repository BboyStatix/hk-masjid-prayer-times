import { fetchHongKongMasjidsInformation } from "./MasjidService";

const Masjids = async () => {
  const masjids = await fetchHongKongMasjidsInformation();

  return (
    <div>
      <h1 className="text-3xl">HK Masjid Prayer times</h1>
      {masjids.map((masjid) => (
        <div key={masjid.id}>
          <h2 className="text-2xl">{masjid.name}</h2>

          <h3 className="text-xl">Salah</h3>
          <div>Fajr {masjid.times[0].salah.fajr}</div>
          <div>Sunrise {masjid.times[0].salah.sunrise}</div>
          <div>Zuhr {masjid.times[0].salah.zuhr}</div>
          <div>Asr {masjid.times[0].salah.asr}</div>
          <div>Maghrib {masjid.times[0].salah.maghrib}</div>
          <div>Isha {masjid.times[0].salah.isha}</div>

          <h3 className="text-xl">Iqamah</h3>
          <div>Fajr {masjid.times[0].iqamah.fajr}</div>
          <div>Zuhr {masjid.times[0].iqamah.zuhr}</div>
          <div>Asr {masjid.times[0].iqamah.asr}</div>
          <div>Maghrib {masjid.times[0].iqamah.maghrib}</div>
          <div>Isha {masjid.times[0].iqamah.isha}</div>

          <br />
        </div>
      ))}
    </div>
  );
};

export default Masjids;
