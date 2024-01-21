export interface PrayerTime {
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

export interface MasjidInformation {
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

interface MasjidInformationResponse {
  items: MasjidInformation[];
}

const HONG_KONG_COORDINATES = {
  latitude: "22.321646798579437",
  longitude: "114.16894896857946",
};

const DEFAULT_DISTANCE = "30";

const getTodayDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export async function fetchHongKongMasjidsInformation(): Promise<
  MasjidInformation[]
> {
  const dateToday = getTodayDate();
  const url = new URL("https://masjidal.com/api/v3/masjids/proximity");
  const params = new URLSearchParams();
  params.set("date_start", dateToday);
  params.set("distance", DEFAULT_DISTANCE);
  params.set("expand", "times");
  params.set("lat", HONG_KONG_COORDINATES.latitude);
  params.set("long", HONG_KONG_COORDINATES.longitude);
  url.search = params.toString();

  const res = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });
  if (!res.ok) {
    throw new Error("Error occurred when fetching masjids");
  }
  const json: MasjidInformationResponse = await res.json();
  return json.items;
}
