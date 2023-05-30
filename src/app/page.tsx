interface PrayerTime {
  date: string;
  hijri_date: string;
  hijri_month: string;
  salah: {
    fajr: string;
    sunrise: string;
    zuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  iqamah: {
    fajr: string;
    zuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    jummah1: string;
    jummah2: string;
    jummah3: string;
  };
}

interface Masjid {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  longitude: string;
  latitude: string;
  zipcode: string;
  phone: string;
  meta: string;
  email: string;
  website_url: string;
  event_url: string;
  donation_url: string;
  audio_url: string;
  prayer_timing_url: string;
  app_premium_features: string;
  premium_features: {
    app: boolean;
    slideshow: boolean;
  };
  is_shell_account: boolean;
  distance: string;
  logo: string;
  times: PrayerTime[];
}

interface MasjidAlResponse {
  items: Masjid[];
}

const currentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

async function fetchMasjidsInformation(): Promise<Masjid[]> {
  const res = await fetch(
    `http://masjidal.com/api/v3/masjids/proximity?date_start=${currentDate()}&distance=30&expand=times&lat=22.44519279770756&long=114.0417109256271`
  );
  if (!res.ok) {
    throw new Error("Error occurred when fetching masjids");
  }
  const json = (await res.json()) as MasjidAlResponse;
  return json.items;
}

const Masjids = async () => {
  const masjids = await fetchMasjidsInformation();

  return (
    <div>
      <h1 className="text-3xl">HK Masjid Prayer times</h1>
      {masjids.map((masjid: Masjid) => (
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
