<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <!-- <header class="header" v-bind:title="title"></header> -->
  <Footer class="footer" v-bind:message="footerMessage"></Footer>
  <banner class="banner" v-bind:bannerMessage="messageToDisplay" v-bind:bannerType="messageType"></banner>
  <weather>
  </weather>
  <Search></Search>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
// import Header from './components/Header.vue';
import Footer from '@/components/Footer.vue'
import Banner from '@/components/Banner.vue'
import Search from '@/components/Search.vue'
import Weather from '@/components/Weather.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // Header,
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
      openweathermapApiKey: '',
      // Batul: ""
    }
  },

}
</script>

