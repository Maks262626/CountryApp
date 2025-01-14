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
export interface BorderCountries extends CountryDetails{
  borders: CountryDetails[]
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

export class CountryService {
  async getCountries():Promise<Country[]> {
    const url = 'https://date.nager.at/api/v3/AvailableCountries';
    const dataResponce = await fetch(url);
    const data = await dataResponce.json();
    return data;
  }
  async getCountryDetails(code:string){
    const url1 = `${process.env.COUNTRY_LIST_BASE_API}/CountryInfo/${code}`;
    const url2 = `${process.env.COUNTRY_INFO_BASE_API}/countries/population`;
    const url3 =  `${process.env.COUNTRY_INFO_BASE_API}/countries/flag/images`;
    const urls = [url1,url2,url3];

    const responces = await Promise.all(urls.map(url => fetch(url)));
    const res = await Promise.all(responces.map(async res => {
      if(!res.ok){
        throw new Error(`Failed to fetch ${res.url}: ${res.status}`);
      }
      return res.json();
    }));

    const borderCountries:BorderCountries = res[0]; 
    const populationsData = res[1];
    const flagsData = res[2];

    const flags:Flag[] = flagsData.data;
    const populations:Population[] = populationsData.data;
    const {commonName,countryCode} = borderCountries;

    const population = populations.find(population => population.country === commonName || population.code === countryCode || population.iso3 === countryCode);
    const flag = flags.find(flag => flag.name === commonName || flag.iso2 === countryCode || flag.iso3 === countryCode);

    return {borderCountries,population,flag};
  }
}