<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import type WeatherData from "@/types/weatherData";
import Loader from "@/components/loader/Loader.vue";
import Settings from "@/components/settings/Settings.vue";
import WeatherCard from "@/components/weatherCard/WeatherCard.vue";

const locations = ref<string[]>([]);
const weatherCard = ref<WeatherData[]>([]);

const settingsOpened = ref<boolean>(false);

const key = "7712a229ba9720e907414a3912d3bb48";

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?';

const getUserLocationWeather = async () => {
  try {
    let userLocation;
    await navigator.geolocation.getCurrentPosition(async (position) => {
      userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      const response = await axios(`${weatherUrl}lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${key}&units=metric`);
      weatherCard.value.push(response.data);
      locations.value.push(response.data.name);
    });
  } catch (error) {
    console.error(error);
  }
};

const getFromLocalStorage = (): string[] | null => {
  const item = localStorage.getItem('weatherCards');
  return item && JSON.parse(item);
}

const saveToLocalStorage = (locationsArray: string[]) => {
  localStorage.setItem('weatherCards', JSON.stringify(locationsArray));
}

const getResponse = async (city: string) => {
  try {
    const {data} = await axios(`${weatherUrl}q=${city}&appid=${key}&units=metric`);
    weatherCard.value.push(data);
    locations.value.push(data.name);
  } catch (error) {
    console.error(error);
  }
};

const toggleSettings = (): void => {
  settingsOpened.value = !settingsOpened.value;
}

const addLocation = (newLocation: string) => {
  getResponse(newLocation);
};

const deleteLocation = (deletedLocation: string) => {
  locations.value = locations.value.filter(l => l !== deletedLocation);
  weatherCard.value = weatherCard.value.filter(l => l.name !== deletedLocation);
  saveToLocalStorage(locations.value);
};

watch(locations.value, (newValue) => {
  saveToLocalStorage(newValue);
})

onMounted(() => {
  let localStorageCities = getFromLocalStorage();

  if (!localStorageCities) {
    return getUserLocationWeather();
  }

  localStorageCities.forEach((city) => {
    getResponse(city)
  });
});

</script>

<template>
  <div id="weatherApp">
    <div class="weatherWidget">

      <button class="settings__btn" @click="toggleSettings" v-text="settingsOpened ? 'Done' : 'Settings'"> </button>

      <Loader :spinning="!weatherCard.length"/>

      <div class="settings-box" v-if="settingsOpened">
        <Settings
            :locations="locations"
            :add-location="addLocation"
            :delete-location="deleteLocation"/>
      </div>

      <div class="weather-box" v-else>
        <WeatherCard :weatherCard="weatherCard"/>
      </div>

    </div>
  </div>
</template>

<style lang="scss">

#weatherApp {
  background-image: url("assets/day.webp");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;

  max-width: 300px;
  margin: 0 auto;
}

.settings__btn {
  display: block;
  width: 100%;
  padding: 10px;

  color: #313131;
  font-size: 16px;

  appearance: none;
  border: none;
  outline: none;

  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  transition: 0.4s;
  border-radius: 12px;

  &:hover {
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 2px 12px 2px 12px;
  }
}

.weatherWidget {
  padding: 25px;
  color: #efefef;
  min-height: 200px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}

</style>
