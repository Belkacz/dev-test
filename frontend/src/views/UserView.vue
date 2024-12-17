<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const users = ref([]);

// simple flag to check if we are still laoding
const loadingData = ref(false)

onMounted(() => {
  // after get we change flag to true
  axios.get("http://localhost:3000/api/users/").then(loadingData.value = true).then((res) => {
    users.value = res.data;
    // when its done we change it to false
    loadingData.value = false;
  });
});
</script>

<template>
  <h4>Users</h4>
  <div class="alert alert-secondary mt-3" role="alert">
    <b>Task</b><br />
    In this view, there is a four-second delay when fetching user data from the backend. During this time, the user table remains empty. Your task is to enhance
    the user experience by implementing a loading indicator that clearly communicates to the user that the data is currently being fetched.
  </div>
  <table v-if="!loadingData" class="table mt-3">
    <thead>
      <tr>
        <th scope="col">username</th>
        <th scope="col">firstName</th>
        <th scope="col">lastName</th>
        <th scope="col">country</th>
        <th scope="col">age</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users">
        <td>{{ user.username }}</td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.country }}</td>
        <td>{{ user.age }}</td>
      </tr>
    </tbody>
  </table>
  <div v-else>
    <p>Loading users data ...</p>
    <p>please wait ... </p>
    <p>I'm a clearly communicating indicator</p>
  </div>
</template>
