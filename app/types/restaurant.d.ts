export interface Restaurant {
  id: string;
  displayName: DisplayName;
  primaryTypeDisplayName: PrimaryTypeDisplayName;
  formattedAddress: string;
  photos: Photo[];
  googleMapsUri: string;
  editorialSummary: EditorialSummary;
  location: Location;
  regularOpeningHours: RegularOpeningHours;
  internationalPhoneNumber: string;
  priceLevel: string;
}
type EditorialSummary = {
  text: string;
};
type RegularOpeningHours = {
  weekdayDescriptions: string[];
};

type Location = {
  latitude: number;
  longitude: number;
};

type Photo = {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: AuthorAttributions[];
};

type AuthorAttributions = {
  displayName: string;
  uri: string;
  photoUri: string;
};
type DisplayName = {
  text: string;
  languageCode: string;
};

type PrimaryTypeDisplayName = {
  text: string;
  languageCode: string;
};
