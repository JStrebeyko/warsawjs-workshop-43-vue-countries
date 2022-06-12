<template>
  <div class="country_details" v-if="countryData">
    <h1>{{countryData.name}}</h1>
    currency: {{countryData.currency}} <br/>
    population: {{countryData.population}} <br/>
    continent: {{countryData.continent}}
    <h2 @click="showCities = !showCities">Cities</h2>
    <ul v-if="showCities" class="cities">
      <li v-for="city in countryData.cities" :key="city.name">
        <h3>{{city.name}} - <span class="thin">Population: {{city.population || '???'}}</span></h3>
        <div class="scores" v-if="city.scores">
          <div class="row" v-for="row in city.scores" :key="row" :style="{color: row.color, paddingLeft: '20px'}">
            <div>{{row.name}}: {{parseInt(row.score_out_of_10)}} / 10</div>
            <div class="meter-container"><div class="meter" :style="{width: row.score_out_of_10*10 + '%', backgroundColor: row.color}"></div></div>
          </div>
        </div>
      </li>
    </ul>
    <h2 @click="showSalaries = !showSalaries">Salaries {{!countryData.salaries.length ? '- No info' : ''}}</h2>
    <ul v-if="showSalaries">
      <li v-for="occ in countryData.salaries" :key="occ.job.id">
        <span class="bold">{{occ.job.title}}</span> From ~ {{parseInt(occ.salary_percentiles.percentile_25)}} to {{parseInt(occ.salary_percentiles.percentile_75)}} {{countryData.currency_code}} / year
      </li>
    </ul>

  </div>
  <h1 v-else>Loading...</h1>
</template>

<script>
import { getCountryData} from '@/api'

export default {
  name: 'CountryDetailsView',
  data() {
    return {
      countryData: null,
      showSalaries: false,
      showCities: true,
    }
  },
  async created() {
    this.countryData = await getCountryData(this.countryName).catch(e => {
      this.$router.push({name: '404'})
      throw new Error(e)
    })
  },
  computed: {
    countryName() {
      return this.$route.params.country
    },
  }
}
</script>

<style scoped lang="scss">
.country_details {
  width: 100%;
  h2 {
    text-align: left;
    width: 100%;
  }
  h3 {
    margin-top: 50px;
  }
  ul {
    text-align: left;
  }
  li {
    list-style-type: none;
    margin: 10px 0;
  }

  .thin {
    font-weight: 100;
  }

  .bold {
    font-weight: 900;
  }
  .cities {
    .scores {
      .row {
        width: 100%;
        margin: 10px 0;
        > * {
          width: 50%;
        }
        .meter-container {
          background: rgba(0,0,0,0.05);
          .meter {
            height: 10px;
          }
        }
      }
    }
  }
}
</style>