const root = "https://api.teleport.org/api/";
const citiesEndpointRoot = root + "cities/";
const countriesEndpointRoot = root + "countries/";
const getCountryUrl = (country_code) =>
  `${countriesEndpointRoot}iso_alpha2:${country_code}/?embed=country:salaries&embed=country:continent`;
const getCountryUbranScoreUrl = (country_name) =>
  `${citiesEndpointRoot}?search=${country_name}&embed=city:search-results/city:item/city:urban_area/ua:scores/`;
//helperr
export const extractAlphaCode = (string) => {
  return string.slice(-3, -1);
};

export const getCountryList = async () => {
  return fetch(countriesEndpointRoot)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data._links["country:items"];
    });
};

export const getCountryData = async (country_code) => {
  return fetch(getCountryUrl(country_code))
    .then((response) => response.json())
    .then((data) => {
      const countryData = {
        currency: data.currency_code,
        name: data.name,
        population: data.population,
        continent: data._embedded["country:continent"].name,
        salaries: data._embedded["country:salaries"].salaries,
      };
      return fetch(getCountryUbranScoreUrl(countryData.name))
        .then((response) => response.json())
        .then((citiesData) => {
          const cities = [];
          const entries = citiesData._embedded["city:search-results"];
          for (const entry of entries) {
            const cityItemRoot = entry._embedded["city:item"];
            cities.push({
              name: cityItemRoot.name,
              population: cityItemRoot.population,
              scores: cityItemRoot._embedded
                ? cityItemRoot._embedded["city:urban_area"]._embedded[
                    "ua:scores"
                  ].categories
                : null,
            });
          }
          return { ...countryData, cities };
        });
    });
};
