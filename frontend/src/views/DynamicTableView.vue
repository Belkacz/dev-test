<script setup>
import DyanmicTable from "../components/DynamicTable.vue";
import { ref, computed } from "vue";

const cities = [
  {
    name: "New York",
    country: "USA",
    population: 8398748,
  },
  {
    name: "Los Angeles",
    country: "USA",
    population: 3990456,
  },
  {
    name: "London",
    country: "UK",
    population: 8982000,
  },
];

const animals = [
  {
    name: "Lion",
    species: "Panthera leo",
    habitat: "Grasslands and savannas",
    lifespan: 10,
  },
  {
    name: "Elephant",
    species: "Loxodonta africana",
    habitat: "African savannas and forests",
    lifespan: 60,
  },
  {
    name: "Tiger",
    species: "Panthera tigris",
    habitat: "Various, including forests and grasslands",
    lifespan: 15,
  },
];

const citiesRef = ref(cities);
const animalsRef = ref(animals);

function filterData(table, key, value) {
  return table.filter(item => {
    // console.log(item[key]);
    if (item[key] && item[key].toString().toLowerCase().includes(value.toLowerCase())) {
      return true;
    }
    return false;
  });
}

// in my first idea this fn should take as args citiesRef as tableRef example = function filterCities(key, value, table. tableRef)  and set it in step #2.
function filterCities(key, value, table) { // btw. i try to set here type such as key:string but its doesn't work, probably due to project configuration and lack of typescript support
  // as I wrote 2 lines above try to pass here ref to the table Ref (citiesRef and animalsRef) but this i't work probably vue don't let to do that in case of some circular
  // dependencies error. My first idea was to build a function that takes args, such as table, key and input value and filter tables. Without hardcoded references to
  // the citi or animalsRef but it wont work so I do it in this way pulling out filterData() fn to be reusable in both main filter functions
  // console.log(table)
  const filteredData = filterData(table, key, value);

  if (filteredData.length > 0) {
    // #2 and here set tableRef.value = filteredData, but this did't work
    citiesRef.value = filteredData;
  } else {
	// i don't like this solution with new array with object, but I try change to empty array i got error at DyanmicTable and even v-if did't help here
	// i know its possible to make but right now i don't have a better idea.
    citiesRef.value = [{
      name: "Not Found",
      country: "Not Found",
      population: 0,
    }];
  }
}

function filterAnimals(key, value, table) {
  // console.log(table)
  const filteredData = filterData(table, key, value);

  if (filteredData != undefined && filteredData.length > 0) {
    animalsRef.value = filteredData;
  }
  else {
    animalsRef.value = [{
      name: "Not Found",
      species: "Not Found",
      habitat: "Not Found",
      lifespan: 0,
    }];
  }
}
// so above I do my first interpretation of solution, I feel it should be done with computed. But this demanded from me to set other tables souch as animalFilters.
//.. I guess
// I try to make it with computed but i'm already not that familair with this fn so i do only a part of it. This first solution also take me some time.
// const animalsFilters = ref({
//   name: "",
//   species: "",
//   habitat: "",
//   lifespan: "",
// });

// const filteredAnimals = computed(() => {
//   return animalsRef.value.filter(animal => {
//     return (
//       // here shold be filter conditions
//     );
//   });
// });


// function setFilters() {
//   console.log(animalsFilters)
// }

// const changes = () => {
//   console.log('Filters:', animalsFilters.value);
// };

</script>

<template>
  <h4>Dyanmic table</h4>
  <div class="alert alert-secondary mt-3" role="alert">
    <b>Task</b><br />
    In this view, the dynamic table component is used to render a table for an array of unknown objects. Your task is to
    implement filtering to the dynamic
    table component. The table should only display rows matching the filter criteria. The filtering can be a single
    input field, an input field per column or
    any other kind of filtering function.
  </div>
  <div class="alert alert-light my-3" role="alert">
    <pre>{{ cities }}</pre>
  </div>
  <p>filters:</p>
  <div style="display: flex;">
    <div v-for="(citie, key) in cities[0]" :key="key" style="width: 15rem;">
      <div style="padding: 10px;">
        <label for="index">{{ key }}</label>
        <input @input="filterCities(key, $event.target.value, cities)" type="text" id="key" name="key" />
        <!-- <input @input="setFilters(key, $event.target.value, cities, citiesRef)" type="text" id="key" name="key"/> -->
      </div>
    </div>
  </div>
  <DyanmicTable class="my-3" :data="citiesRef" />
  <div class="alert alert-light mt-3" role="alert">
    <pre>{{ animals }}</pre>
  </div>
  <p>filters:</p>
  <div style="display: flex;">
    <div v-for="(animal, key) in animals[0]" :key="key" style="width: 15rem;">
      <div style="padding: 10px;">
        <label for="index">{{ key }}</label>
        <input @input="filterAnimals(key, $event.target.value, animals)" type="text" id="key" name="key" />
        <!-- <input v-model="animalsFilters[key]" @input="changes" type="text" id="key" name="key"/> -->
         <!-- i really like this v-model :) -->
      </div>
    </div>
  </div>
  <DyanmicTable :data="animalsRef" />
  <!-- <DyanmicTable :data="filteredAnimals" /> -->
</template>
