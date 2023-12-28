<template>
  <div>
    <h1>GitHub Organization Members</h1>
    <div>
      <label for="organization">Organization:</label>
      <input v-model="organizationName" id="organization" @keyup.enter="searchMembers" />
      <button @click="searchMembers">Search</button>
    </div>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error</div>
    <table v-else>
      <tr>
        <th>Avatar</th>
        <th>Id</th>
        <th>Name</th>
      </tr>
      <tr v-for="member in members" :key="member.id">
        <NuxtLink :to="`/members/${member.login}`">
          <td><img :src="member.avatar_url" alt="Avatar" width="200" height="200"/></td>
          <td>{{member.id}}</td>
          <td>{{member.login}}</td>
        </NuxtLink>
      </tr>
    </table>
    <div>
      <button @click="changePage(-1)" :disabled="currentPage <= 1">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="changePage(1)" :disabled="currentPage >= lastPage">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useMembers} from "#imports";

const pageSize = 10;
const {currentPage, error, lastPage, members, organization, pending} = useMembers(pageSize);
const organizationName = ref(organization.value);

const searchMembers = () => {
  organization.value = organizationName.value;
  currentPage.value = 1;
};

const changePage = (delta: number) => {
  currentPage.value += delta;
};

</script>
