<template>
  <h1>🌍 World stats 🌎</h1>
  <input type="text" name="countryFilter" id="" v-model="countryFilter">
  <ul v-if="countries.length">
    <li v-for="country in filteredCountry" :key="country.name">
      <RouterLink :to="getURL(country.href)">{{country.name}}</RouterLink>
      </li>
  </ul>
  <div class="loading" v-else>Loading....</div>
</template>

<script>
import { getCountryList,
extractAlphaCode
} from '@/api'

export default {
  name: 'Home',
  data() {
    return {
      countries: [],
      countryFilter: '',
      cityFilter: '',
    }
  },
  async created() {
    this.countries = await getCountryList()
  },
  methods: {
    getURL(apistring) {
      return extractAlphaCode(apistring)
    }
  },
  computed: {
    filteredCountry() {
      return this.countryFilter ?
        this.countries.filter(country => country.name.toLowerCase()
          .includes(this.countryFilter.toLowerCase())) :
        this.countries
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.loading {
  font-size: 50px;
}
</style>
