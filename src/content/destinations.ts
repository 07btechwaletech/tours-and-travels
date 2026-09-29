import type { StaticImageData } from "next/image";
import varanasi from "@/assets/images/varanasi.jpg";
import ayodhya from "@/assets/images/ayodhya.jpg";
import prayagraj from "@/assets/images/prayagraj.jpg";
import agra from "@/assets/images/agra.jpg";
import mathuraVrindavan from "@/assets/images/mathura-vrindavan.jpg";
import lucknow from "@/assets/images/lucknow.jpg";
import sarnath from "@/assets/images/sarnath.jpg";

export type Destination = {
  slug: string;
  name: string;
  hindi: string;
  highlights: string;
  image: StaticImageData;
  alt: string;
};

// Order matters: the homepage grid gives the first item the large tile.
export const featuredDestinations: Destination[] = [
  {
    slug: "varanasi",
    name: "Varanasi",
    hindi: "वाराणसी",
    highlights: "Kashi Vishwanath, Ganga aarti, sunrise boat ride",
    image: varanasi,
    alt: "Varanasi ghats and temple spires at sunset over the Ganga",
  },
  {
    slug: "ayodhya",
    name: "Ayodhya",
    hindi: "अयोध्या",
    highlights: "Ram Mandir, Hanuman Garhi, Saryu ghats",
    image: ayodhya,
    alt: "Carved sandstone temple facade in Ayodhya",
  },
  {
    slug: "prayagraj",
    name: "Prayagraj",
    hindi: "प्रयागराज",
    highlights: "Triveni Sangam by boat",
    image: prayagraj,
    alt: "Pilgrim boat surrounded by gulls on the Ganga at Prayagraj",
  },
  {
    slug: "agra",
    name: "Agra",
    hindi: "आगरा",
    highlights: "Taj Mahal, Agra Fort",
    image: agra,
    alt: "Taj Mahal in evening light, framed by trees",
  },
  {
    slug: "mathura-vrindavan",
    name: "Mathura & Vrindavan",
    hindi: "मथुरा वृंदावन",
    highlights: "Banke Bihari, Prem Mandir",
    image: mathuraVrindavan,
    alt: "Holi celebrations in Vrindavan",
  },
  {
    slug: "lucknow",
    name: "Lucknow",
    hindi: "लखनऊ",
    highlights: "Imambaras, Rumi Darwaza",
    image: lucknow,
    alt: "Chhota Imambara gateway reflected in rainwater, Lucknow",
  },
  {
    slug: "sarnath",
    name: "Sarnath",
    hindi: "सारनाथ",
    highlights: "Dhamek Stupa, museum, Buddhist temples",
    image: sarnath,
    alt: "Dhamek Stupa and old monastery ruins at Sarnath",
  },
];
