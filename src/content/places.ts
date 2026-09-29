import { featuredDestinations, type Destination } from "./destinations";
import { tourPackages } from "./packages";
import { regions, toSlug, type Region } from "./regions";

export type Place = {
  slug: string;
  name: string;
  region?: Region;
  // Only the featured destinations have a photo, Hindi name and highlights so far.
  destination?: Destination;
};

// Every place the site links to: featured destinations plus each region's places.
const placeMap = new Map<string, Place>();
for (const destination of featuredDestinations) {
  placeMap.set(destination.slug, {
    slug: destination.slug,
    name: destination.name,
    destination,
    region: regions.find((region) => region.places.some((place) => destination.name.includes(place))),
  });
}
for (const region of regions) {
  for (const name of region.places) {
    const slug = toSlug(name);
    if (!placeMap.has(slug)) placeMap.set(slug, { slug, name, region });
  }
}

export const places = [...placeMap.values()];

export const findPlace = (slug: string) => placeMap.get(slug);

export const packagesFor = (place: Place) =>
  tourPackages.filter((pkg) => pkg.stops.some((stop) => place.name.includes(stop)));
