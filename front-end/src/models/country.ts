export interface Country {
  countryCode: string;
  name: string;
}

export interface CountryDetails {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
}

export interface Flag {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}
export interface BorderCountries extends CountryDetails {
  borders: CountryDetails[];
}
export interface PopulationCount {
  year: number;
  value: number;
}
export interface Population {
  country: string;
  code: string;
  iso3: string;
  populationCounts: PopulationCount[];
}

export interface ICountryInfo {
  borderCountries: BorderCountries;
  population?: Population;
  flag?: Flag;
}
