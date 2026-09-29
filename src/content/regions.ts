export type Region = {
  id: string;
  name: string;
  hindi: string;
  blurb: string;
  places: string[];
};

// Each place links to its SEO page at /destinations/[slug].
export const regions: Region[] = [
  {
    id: "purvanchal",
    name: "Purvanchal",
    hindi: "पूर्वांचल",
    blurb: "Kashi, the Sangam and the Buddhist sites of the east, plus Gorakhpur and the Vindhya hills.",
    places: [
      "Varanasi", "Sarnath", "Prayagraj", "Gorakhpur", "Kushinagar", "Mirzapur", "Vindhyachal",
      "Jaunpur", "Ghazipur", "Azamgarh", "Ballia", "Chandauli", "Bhadohi", "Deoria", "Mau",
      "Sonbhadra", "Basti",
    ],
  },
  {
    id: "awadh",
    name: "Awadh",
    hindi: "अवध",
    blurb: "Nawabi Lucknow, Ayodhya on the Saryu and the forest shrine of Naimisharanya.",
    places: [
      "Lucknow", "Ayodhya", "Naimisharanya", "Kanpur", "Unnao", "Raebareli", "Sultanpur", "Amethi",
      "Barabanki", "Sitapur", "Hardoi", "Lakhimpur Kheri", "Bahraich", "Shravasti", "Gonda",
      "Pratapgarh",
    ],
  },
  {
    id: "braj",
    name: "Braj and West UP",
    hindi: "ब्रज",
    blurb: "Mathura, Vrindavan and Agra, and the fast highways to Noida, Meerut and Saharanpur.",
    places: [
      "Mathura", "Vrindavan", "Govardhan", "Barsana", "Agra", "Fatehpur Sikri", "Firozabad",
      "Aligarh", "Hathras", "Etah", "Mainpuri", "Noida", "Ghaziabad", "Meerut", "Hapur",
      "Bulandshahr", "Muzaffarnagar", "Saharanpur",
    ],
  },
  {
    id: "rohilkhand",
    name: "Rohilkhand",
    hindi: "रुहेलखंड",
    blurb: "Bareilly, Moradabad and the Pilibhit tiger reserve along the Nepal border.",
    places: [
      "Bareilly", "Moradabad", "Rampur", "Pilibhit", "Shahjahanpur", "Budaun", "Bijnor", "Amroha",
      "Sambhal",
    ],
  },
  {
    id: "bundelkhand",
    name: "Bundelkhand",
    hindi: "बुंदेलखंड",
    blurb: "Chitrakoot, the forts of Jhansi and Kalinjar, and quiet river towns.",
    places: ["Chitrakoot", "Jhansi", "Kalinjar", "Banda", "Lalitpur", "Mahoba", "Hamirpur", "Orai"],
  },
];

export const toSlug = (place: string) => place.toLowerCase().replace(/\s+/g, "-");
