<script setup lang="ts">
import {DateTime} from "@/utils/DateTime";
import type WeatherData from "@/types/weatherData";

defineProps<{
  weatherCard: WeatherData[]
}>();

</script>

<template>
  <div class="weather-wrap" v-for="card in weatherCard">
    <div class="location-box">
      <div class="location">
        {{ card.name }}
      </div>
      <div class="date">{{ DateTime(card.timezone, card.dt) }}
      </div>
    </div>


    <div class="weather-box">
      <div class="weather">
        <div>
          <div class="weather__icon">
            <img
                :src="(`http://openweathermap.org/img/wn/${card.weather[0].icon}.png`)"
                alt="weather icon">
          </div>
          <div class="weather__desc">
            {{ card.weather[0].main }},
            <div>
              {{ card.weather[0].description }}
            </div>
          </div>
        </div>

        <div class="weather__detail">
                <span class="humidity">
                  {{ card.main.humidity }}%
                </span>

          <span class="wind">
                   {{ card.wind.speed }} m/s
                </span>
        </div>
      </div>

      <div class="temp">
        <div class="temp__degree">
          {{ card.main.temp }}°c
        </div>

        <div class="temp__desc">
          Feels like {{ card.main.feels_like }}°C.
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped lang="scss">

.weather-wrap {
  margin: 15px 0;
  padding: 10px;
  background: rgb(0 0 0 / 25%);
  border-radius: 12px;

  .location-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    .location {
      font-size: 14px;
      text-transform: uppercase;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 1px;
        left: -16px;
        background-image: url("assets/compass-regular.svg");
        width: 13px;
        height: 13px;
      }
    }

    .date {
      font-size: 12px;
      font-weight: 300;
    }
  }

  .weather-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .temp {
      width: 57%;
    }

    .weather {

      &__icon {
        font-size: 60px;
        font-weight: 200;
        line-height: 0.6;
      }

      &__desc {
        font-size: 14px;
      }

      &__detail {
        font-weight: 300;
        font-size: 12px;

        .humidity {
          position: relative;
          margin: 0 12px;

          &::before {
            content: '';
            position: absolute;
            top: 2px;
            left: -10px;

            width: 9px;
            height: 9px;
            background: no-repeat url(assets/droplet-solid.svg);
          }
        }

        .wind {
          position: relative;

          &::before {
            content: '';
            position: absolute;
            top: 2px;
            left: -12px;

            width: 9px;
            height: 9px;
            background: no-repeat url("assets/wind-solid.svg");
          }
        }
      }
    }

    .temp {
      font-size: 40px;
      font-weight: 300;
      text-align: right;

      &__desc {
        font-size: 12px;
      }
    }
  }
}
</style>
