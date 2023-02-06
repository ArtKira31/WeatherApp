<script setup lang="ts">
import {ref} from "vue";

defineProps<{
  locations: string[],
  addLocation: (newLocation: string) => void,
  deleteLocation: (deletedLocation: string) => void
}>();

const inputValue = ref<string>("");

</script>

<template>
  <div class="search-box">
    <input
        type="text"
        class="search-bar"
        v-model="inputValue"
        @change="() => addLocation(inputValue)"
        placeholder="Search..."/>

    <div v-for="location in locations">
      <div class="location">
        {{ location }}
        <button @click="() => deleteLocation(location)"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.search-box {
  margin-top: 10px;

  .location {
    display: flex;
    justify-content: space-between;
    background: rgb(0 0 0 / 25%);
    margin: 5px 0;
    padding: 10px;

    button {
      border: none;
      padding: 10px 10px;
      width: 20px;
      height: 20px;
      border-radius: 3px;
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
      background: no-repeat url("assets/trash-can-regular.svg") center;
      transition: 0.4s;

      &:hover {
        width: 23px;
        height: 23px;
      }
    }
  }
}

.search-box .search-bar {
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
  border-radius: 12px;
  transition: 0.4s;

  &:focus {
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 2px 12px 2px 12px;
  }
}


</style>
