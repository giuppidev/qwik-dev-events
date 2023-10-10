export type EventItem = {
  featured: boolean;
  city: string;
  endDate: string;
  favicon: string;
  topics: string[];
  creationDate: string;
  url: string;
  twitter: string;
  countryCode: string;
  subtitle: string;
  name: string;
  category: string;
  startDate: string;
  continentCode: string;
  id: string;
  directUrl: string;
  country: string;
  cityCode: string;
};

export type Metadata = {
  limit: number;
  more: boolean;
  countries: Record<string, string>;
  topics: Record<string, number>;
  cursor: number;
  total: number;
};
