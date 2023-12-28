<template>
  <article>
    <v-btn block="true" variant="tonal" to="/">Back to home</v-btn>
    <v-card v-if="member">
      <v-container fluid="true">
        <v-row>
          <v-col>
            <v-card height="100%">
              <v-img :src="member.avatar_url" cover="true" />
              <v-tooltip text="Name">
                <template v-slot:activator="{ props }">
                  <v-card-title
                    v-bind="props"
                    v-text="member.name"
                  ></v-card-title>
                </template>
              </v-tooltip>
              <v-tooltip text="Login">
                <template v-slot:activator="{ props }">
                  <v-card-subtitle v-bind="props">{{
                    member.login
                  }}</v-card-subtitle>
                </template>
              </v-tooltip>
            </v-card>
          </v-col>
          <v-col>
            <v-expansion-panels variant="accordion" mandatory="force">
              <v-expansion-panel
                title="Id"
                :text="member.id.toString()"
              ></v-expansion-panel>
              <v-expansion-panel
                title="Company"
                :text="member.company ?? 'N/A'"
              ></v-expansion-panel>
              <v-expansion-panel
                title="Location"
                :text="member.location ?? 'N/A'"
              ></v-expansion-panel>
              <v-expansion-panel
                title="Public repositories"
                :text="member.public_repos?.toString() ?? '0'"
              ></v-expansion-panel>
              <v-expansion-panel
                title="Public gists"
                :text="member.public_gists?.toString() ?? '0'"
              ></v-expansion-panel>
              <v-expansion-panel
                title="Number of followers"
                :text="member.followers?.toString() ?? '0'"
              ></v-expansion-panel>
              <v-expansion-panel
                title="Number of following"
                :text="member.following?.toString() ?? '0'"
              ></v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <span v-else-if="error">
      {{ error.name }}
    </span>
  </article>
</template>

<script async setup lang="ts">
import { ref } from "vue";
import { useFetch, useRoute } from "#app";
import type { TDetailedMember } from "~/types/member";

const route = useRoute();
const username = ref(route.params.login ?? "");
const member = ref<TDetailedMember | null>();

const { data, error } = await useFetch<TDetailedMember, Error>(
  () => `https://api.github.com/users/${username.value}`,
);

member.value = data.value;
</script>
