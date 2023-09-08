<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg border-bottom bg-white">
        <div class="container-fluid">
          <button class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                   aria-expanded="false">
                  <img src="../assets/avatar.png" width="36" height="36" alt="Avatar">
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="#">My Profile</a></li>
                  <li><a class="dropdown-item" href="#">Log out</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <aside class="border-end">
      <a href="#" class="logo">
        <icon-logo />
      </a>
      <nav class="nav">
        <a class="nav-link" href="#">
          <icon-union />
        </a>
      </nav>
    </aside>

    <main>

      <div class="report-column border-end">
        <h3 class="mb-5 fw-bold">Weather Reports</h3>
        <div class="row">
          <template v-for="weather in weathers">
            <div class="col-md-4 mb-4">
              <div class="weather-report-card">
                <h5 class="mb-2 text-white">{{weather.city.name}}</h5>
                <small class="d-block mb-2 text-white">{{weather.city.country}}</small>
                <div class="text-center">
                  <icon-clear width="91" height="95" class="img-fluid mb-4" v-if="weather.weather_condition == 'Clear'"/>
                  <icon-rain width="91" height="95" class="img-fluid mb-4" v-if="weather.weather_condition == 'Rain'"/>
                  <icon-sunny width="91" height="95" class="img-fluid mb-4" v-if="weather.weather_condition == 'Sunny'"/>
                  <icon-cloudy width="91" height="95" class="img-fluid mb-4" v-if="weather.weather_condition == 'Clouds'"/>
                  <icon-rain width="91" height="95" class="img-fluid mb-4" v-if="weather.weather_condition == 'Fog'"/>
                </div>
                <h2 class="weather-temperature">28<span class="degree">º</span></h2>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="statistics-column">
        <h3 class="mb-5 fw-bold">Statistics</h3>

        <div class="row">
          <div class="col-md-12 mb-4">
            <div class="rounded">
              <apexchart type="line" :options="lineOptions" :series="lineSeries"></apexchart>
            </div>
          </div>
          <div class="col-md-12 mb-4">
            <div class="rounded" >
              <apexchart type="area" height="200" :options="windAreaOptions" :series="windAreaSeries"></apexchart>
            </div>
          </div>
          <div class="col-md-12 mb-4">
            <div class="rounded">
              <apexchart type="bar" height="200" :options="huminidityBarOptions" :series="huminidityAreaSeries"></apexchart>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

</template>

<script lang="js">

import IconUnion from "@/components/icons/IconUnion.vue";
import axios from "axios";
import IconMoonCloudyRain from "@/components/icons/IconMoonCloudyRain.vue";
import IconClear from "@/components/icons/IconClear.vue";
import IconCloudySun from "@/components/icons/IconCloudySun.vue";
import IconSunny from "@/components/icons/IconSunny.vue";
import IconCloudy from "@/components/icons/IconCloudy.vue";
import IconRain from "@/components/icons/IconRain.vue";
import IconLogo from "@/components/icons/IconLogo.vue";

export default{
  name: "WeatherCardView",
  components: {
    IconLogo,
    IconRain, IconCloudy, IconSunny, IconCloudySun, IconClear, IconMoonCloudyRain, IconUnion},
  data() {
    return {
      weathers: [],
      lineOptions: {
        colors: ['#4CDFE8'],
        fill: {
          colors: ['#4CDFE8']
        },
        chart: {
          id: 'vuechart-example',
          height: 350,
          type: 'area',
          zoom: {
            enabled: false
          }
        },
        title: {
          text: 'Temperature (Last 24 hours)',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['00', '02', '04', '10', '12', '14', '16', '18', '20', '22', '24']
        }
      },
      lineSeries: [{
        name: 'series-1',
        data: []
      }],
      windAreaOptions: {
        colors: ["#FF2F5E"],
        chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: ['00', '02', '04', '10', '12', '14', '16', '18', '20', '22', '24']
        },
        title: {
          text: 'Wind (Last 24 hours)',
          align: 'left'
        },
        fill: {
          colors: ['#FF2F5E']
        },
      },
      windAreaSeries: [{name: 'series1', data: []}],
      huminidityBarOptions: {
        chart: {
          type: 'bar',
          height: 200
        },
        colors: ['#7947F7'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: [0, 2, 4, 6, 7, '14', '16', '18', '20', '22', '24']
        },
        yaxis: {
          title: {
            text: '80 %'
          }
        },
        title: {
          text: 'Humidity (Last 24 Hours)',
          align: 'left'
        },
        fill: {
          opacity: 1
        },
      },
      huminidityAreaSeries: [{name: 'series1', data: []}],
    }
  },

  created() {
    this.getWeather()
    this.$nextTick(function () {
      window.setInterval(() => {
        this.getWeather()
      },50000);
    })
  },
  methods: {
    getWeather() {
      axios.get('/weather').then(({data}) =>{
        this.weathers = data.data
        this.generateLineSeries(this.weathers[0])
        this.generateLineSeries(this.weathers[0])
      }).catch(()=>{
      })
    },
    generateLineSeries(weathers) {
      this.lineSeries[0].data.push(weathers.temperature)
      this.windAreaSeries[0].data.push(weathers.wind_speed)
      this.huminidityAreaSeries[0].data.push(weathers.humidity)
      this.huminidityBarOptions.xaxis.categories.push()
    }

  }
}

</script>

<style scoped lang="scss">
body {
  font-family: "Noto Sans", sans-serif;
}

header nav {
  padding-left: 117px;
}

header nav .dropdown-toggle:after {
  display: none;
}

aside {
  width: 117px;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 22px 31px;
  background-color: #fff;
}

aside .logo {
  display: block;
  margin-bottom: 40px;
}

aside nav a {
  width: 55px;
  height: 55px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: 0.35s;
}

aside nav a:hover {
  background-color: #faf7f7;
}

main {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: stretch;
  padding-left: 117px;
}

main .report-column {
  padding: 50px;
}

main .statistics-column {
  flex-shrink: 0;
  padding: 50px;
}

.weather-report-card {
  padding: 27px 21px;
  border-radius: 25px;
  background-color: #736099;
}

.weather-report-card .weather-temperature {
  color: #f7f8fc;
  font-size: 64px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  text-align: center;
  background: linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0) 187.46%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.weather-report-card .weather-temperature .degree {
  color: #8497C9;
  background: linear-gradient(180deg, #8497C9 0%, rgba(255, 255, 255, 0) 187.46%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

</style>