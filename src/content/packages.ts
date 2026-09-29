import type { StaticImageData } from "next/image";
import kashi from "@/assets/images/pkg-kashi.jpg";
import ayodhya from "@/assets/images/pkg-ayodhya.jpg";
import sangam from "@/assets/images/pkg-sangam.jpg";
import braj from "@/assets/images/pkg-braj.jpg";
import heritage from "@/assets/images/pkg-heritage.jpg";
import buddhist from "@/assets/images/pkg-buddhist.jpg";

export type TourPackage = {
  slug: string;
  title: string;
  duration: string;
  stops: string[];
  priceFrom: number;
  image: StaticImageData;
  alt: string;
};

// TODO(client): prices are samples for the design. Replace with real rates before launch.
export const tourPackages: TourPackage[] = [
  {
    slug: "kashi-darshan",
    title: "Kashi Darshan",
    duration: "2 nights, 3 days",
    stops: ["Varanasi", "Sarnath"],
    priceFrom: 6499,
    image: kashi,
    alt: "Boat with gulls on the Ganga at Varanasi",
  },
  {
    slug: "ayodhya-kashi-yatra",
    title: "Ayodhya and Kashi Yatra",
    duration: "4 nights, 5 days",
    stops: ["Varanasi", "Ayodhya", "Prayagraj"],
    priceFrom: 12999,
    image: ayodhya,
    alt: "Priests exchanging marigold garlands in Ayodhya",
  },
  {
    slug: "sangam-and-kashi",
    title: "Sangam Snan and Kashi",
    duration: "3 nights, 4 days",
    stops: ["Prayagraj", "Varanasi"],
    priceFrom: 8999,
    image: sangam,
    alt: "Boats and flags at the Sangam in Prayagraj",
  },
  {
    slug: "braj-yatra",
    title: "Braj Yatra",
    duration: "3 nights, 4 days",
    stops: ["Mathura", "Vrindavan", "Govardhan", "Barsana"],
    priceFrom: 9499,
    image: braj,
    alt: "Holi celebrations in the lanes of Vrindavan",
  },
  {
    slug: "lucknow-agra-heritage",
    title: "Lucknow and Agra Heritage",
    duration: "4 nights, 5 days",
    stops: ["Lucknow", "Agra", "Fatehpur Sikri"],
    priceFrom: 13999,
    image: heritage,
    alt: "Bara Imambara seen through a carved arch in Lucknow",
  },
  {
    slug: "buddhist-circuit",
    title: "Buddhist Circuit",
    duration: "5 nights, 6 days",
    stops: ["Sarnath", "Kushinagar", "Shravasti"],
    priceFrom: 15999,
    image: buddhist,
    alt: "Temple entrance with prayer flags at Sarnath",
  },
];
