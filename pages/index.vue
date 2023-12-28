<template>
  <main>
    <v-toolbar density="compact" :title="`GitHub organization members:`">
      <v-text-field
        hide-details
        v-model="organizationName"
        id="organization"
        @keyup.enter="searchMembers"
      />
      <v-btn icon="mdi-magnify" variant="flat" @click="searchMembers"></v-btn>
    </v-toolbar>
    <span v-if="pending">Loading...</span>
    <span v-else-if="error">Error</span>
    <v-list v-else
      ><v-list-item
        v-for="member in members"
        :key="member.id"
        :title="member.login"
        :prepend-avatar="member.avatar_url"
        :to="`/members/${member.login}`"
      ></v-list-item>
    </v-list>
    <v-pagination
      :model-value="currentPage"
      :length="lastPage"
      @update:modelValue="changePage"
    ></v-pagination>
  </main>
</template>

<script setup lang="ts">
import { useMembers } from "#imports";

const pageSize = 10;
const { currentPage, error, lastPage, members, organization, pending } =
  useMembers(pageSize);
const organizationName = ref(organization.value);

const searchMembers = () => {
  organization.value = organizationName.value;
  currentPage.value = 1;
};

const changePage = (page: number) => {
  currentPage.value = page;
};
</script>
