<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <Header class="header" v-bind:title="title"></Header>
  <banner class="banner" v-bind:bannerMessage="messageToDisplay" v-bind:bannerType="messageType"></banner>
  <Search class="weather-search" v-on:search-city="searchCity"></Search>
  <weather class="weather-results" v-bind="weatherData" v-if="validWeatherData" v-on:clear-weather-data="resetData">
  </weather>
  <Footer class="footer" v-bind:message="footerMessage"></Footer>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import Header from './components/Header.vue';
import Footer from '@/components/Footer.vue'
import Banner from '@/components/Banner.vue'
import Search from '@/components/Search.vue'
import Weather from '@/components/Weather.vue'
import axios from 'axios';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Header,
    Footer,
    Banner,
    Search,
    Weather,
  },
  data() {
    return {

      title: 'Vue Weather App',

      footerMessage: 'testdriven.io 2020',
      // Weather data collected from openweathermap.org
      weatherData: {
        city: '',
        weatherSummary: '',
        weatherDescription: '',
        currentTemperature: 0.0,
        highTemperature: 0.0,
        lowTemperature: 0.0
      },
      // Flag indicating if valid weather data has been loaded
      validWeatherData: false,
      // Message to display on banner
      messageToDisplay: '',
      // Message type (Info, Success, or Error) to display on banner
      messageType: 'Info',
      // API key from openweathermap.org - Unique to each person
      openweathermapApiKey: '5b59d0f6dbbe87dd97035b964b2b163b',

    }
  },
  created() {
    // Perform a check that the API key from openweathermap.org is defined
    if (this.openweathermapApiKey === '') {
      this.messageType = 'Error'
      this.messageToDisplay = 'Error! API Key needs to be loaded to use openweathermap.org!'
    }
  },
  methods: {
    searchCity(inputCity) {
      // GET request for user data
      console.log(this.openweathermapApiKey);
      axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + inputCity + '&units=imperial&APPID=' + this.openweathermapApiKey)
        .then((response) => {
          // handle success
          // this.messageType = 'Success'
          // this.messageToDisplay = 'SUCCESS! Weather data was retrieved for ' + response.data.name + '!'
          console.log(response, "response")

          this.weatherData.city = response.data.name
          this.weatherData.weatherSummary = response.data.weather[0].main
          this.weatherData.weatherDescription = response.data.weather[0].description
          this.weatherData.currentTemperature = response.data.main.temp
          this.weatherData.lowTemperature = response.data.main.temp_min
          this.weatherData.highTemperature = response.data.main.temp_max
          this.validWeatherData = true
        })
        .catch((error) => {
          // handle error
          this.messageType = 'Error'
          this.messageToDisplay = 'ERROR! Unable to retrieve weather data for ' + inputCity + '!'
          console.log(error.message)
          this.resetData()
        })
        .finally(() => {
          // always executed
          console.log('HTTP GET Finished!')
        })
    },
    resetData() {
      this.weatherData = {
        city: '',
        weatherSummary: '',
        weatherDescription: '',
        currentTemperature: 0.0,
        lowTemperature: 0.0,
        highTemperature: 0.0
      }
      this.validWeatherData = false
    },
    clearMessage() {
      this.messageToDisplay = ''
      this.messageType = 'Info'
    }

  }
}
</script>

<style>

/* Overall Styling
 *****************/
* {
  box-sizing:border-box;
  padding: 0;
  margin: 0;
}

body {
  background: #f1f3f5;
  font-family: segoe ui,helvetica neue,sans-serif;
  color: #345;
  overflow-x: hidden;
}

/* CSS Grid Styling
*******************/
.header {
  grid-area: header;
}
.banner {
  grid-area: banner;
}
.weather-search {
  grid-area: search;
}
.weather-results {
  grid-area: results;
}
.footer {
  grid-area: footer;
}
.grid-container {
  display: grid;
  grid-template-columns: 10% 35% 35% 10%;
  grid-auto-rows: minmax(20px, auto);
  grid-gap: 10px;
  max-width: 1080px;
  margin: auto;
  grid-template-areas:
    "header   header     header    header"
    "banner   banner     banner    banner"
    "...      search     search    ..."
    "...      results    results   ..."
    "footer   footer     footer    footer";
}
</style>
