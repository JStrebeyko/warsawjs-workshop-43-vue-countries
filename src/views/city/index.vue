<template>
  <!-- <h1>{{cityDetials.full_name}}</h1> -->
  <div>a city</div>
</template>

<script>
// import {getCityData} from  '@/api'

export default {
  name: 'CityDetailsView',
  data() {
    return {
      cityDetails: null
    }
  },
  created() {
    fetch(`https://api.teleport.org/api/cities/?search=${this.$route.params.city}&embed=city%3Asearch-results%2Fcity%3Aitem%2Fcity%3Aurbanarea%2Fua%3Ascores`)
    .then(response => response.json()).then(data => {
      console.warn(data)
        // for (const city of data['_embedded']['city:search-results']) {
        //   this.cityDetails.push(city._embedded["city:item"])
        // }
        // console.log(data._embedded['city:search-results'][0])
        // this.cityDetails = data._embedded["city:item"]
    })
    // getCityData(this.$route.params.city).then((data) => this.cityDetials = data)
  }
}
</script>

<style>

</style>