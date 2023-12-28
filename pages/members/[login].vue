<template>
  <div>
    <NuxtLink to="/">Back to home</NuxtLink>
    <h1>{{username}} Details</h1>
    <div v-if="member">
      <h2>Avatar</h2>
      <img :src="member.avatar_url" alt="Avatar" width="200" height="200" />
      <h2>Id</h2>
      <span>{{member.id}}</span>
      <h2>Name</h2>
      <span>{{member.name}}</span>
      <h2>Company</h2>
      <span>{{member.company ?? 'N/A'}}</span>
      <h2>Location</h2>
      <span>{{member.location ?? 'N/A'}}</span>
      <h2>Public repositories</h2>
      <span>{{member.public_repos}}</span>
      <h2>Public gists</h2>
      <span>{{member.public_gists}}</span>
      <h2>Number of followers</h2>
      <span>{{member.followers}}</span>
      <h2>Number of following</h2>
      <span>{{member.following}}</span>
    </div>
    <div v-else-if="error">
      {{error.name}}
    </div>
  </div>
</template>

<script async setup lang="ts">
import { ref } from 'vue';
import {useFetch, useRoute} from "#app";
import type {TDetailedMember} from "~/types/member";

const route = useRoute();
const username = ref(route.params.login ?? '');
const member = ref<TDetailedMember | null>();

const {data, error} = await useFetch<TDetailedMember, Error>(() => `https://api.github.com/users/${username.value}`);

member.value = data.value;

</script>
