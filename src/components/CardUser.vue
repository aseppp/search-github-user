<template>
  <div class="w-full h-screen flex bg-gray-200 dark:bg-dark p-2 md:p-5">
    <div class="m-auto w-full md:w-box">
      <div class="mb-3 md:mb-7">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-xl md:text-3xl font-bold dark:text-white">
              devfinder
            </h1>
          </div>

          <div>
            <button
              @click="toggleDark()"
              v-if="isDark"
              class="flex items-center gap-2 dark:text-white font-md uppercase"
            >
              Light
              <SunIcon class="w-5 h-5" />
            </button>

            <button
              @click="toggleDark()"
              v-else
              class="flex items-center gap-2 font-md uppercase"
            >
              Dark
              <MoonIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div class="mb-3 md:mb-6">
        <div
          class="w-full relative flex items-center rounded-xl bg-white dark:bg-dark1 dark:text-gray-200"
        >
          <MagnifyingGlassIcon class="w-7 h-7 absolute my-2 mx-3" />
          <input
            v-model="username"
            type="name"
            placeholder="Search github username"
            class="w-full bg-white dark:bg-dark1 ml-14 focus:border-none focus:outline-none my-2"
          />

          <button
            @click="getUser()"
            class="my-2 mx-3 py-2 px-5 rounded-lg bg-dark1 dark:bg-blue1 text-white"
          >
            Search
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-dark1 p-3 md:p-10 rounded-xl">
        <div
          class="flex gap-10 flex-col md:flex-row items-center md:items-start"
        >
          <div>
            <img
              src="../assets/profile.jpeg"
              alt="profile"
              class="w-36 h-36 rounded-full"
              v-if="!detailUser?.data?.avatar_url"
            />
            <img
              :src="detailUser?.data?.avatar_url"
              alt="profile"
              class="w-36 h-36 rounded-full"
              v-else
            />
          </div>

          <div class="dark:text-gray-200 flex-1">
            <div class="flex justify-between items-center">
              <h1 class="text-lg" v-if="!detailUser?.data?.name">
                Asep Saepudin
              </h1>
              <h1 class="text-lg" v-else>{{ detailUser?.data?.name }}</h1>
              <p class="text-xs" v-if="!detailUser">Joined 25 July 2022</p>
              <p class="text-xs" v-else>
                Joined {{ formatDate(detailUser?.data?.created_at) }}
              </p>
            </div>

            <div>
              <h1 class="text-blue1" v-if="!detailUser?.data?.login">
                @aseppp
              </h1>
              <h1 class="text-blue1" v-else>@{{ detailUser?.data?.login }}</h1>
              <p class="mt-5 text-gray-400" v-if="!detailUser?.data?.bio">
                This profile has no bio
              </p>
              <p class="mt-5 text-gray-400" v-else>
                {{ detailUser?.data?.bio }}
              </p>
            </div>

            <div
              class="my-7 py-3 px-5 bg-dark1 dark:bg-dark rounded-lg text-white"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h1 class="text-blue1">Repos</h1>
                  <p v-if="!detailUser?.data?.public_repos">100</p>
                  <p v-else>{{ detailUser?.data?.public_repos }}</p>
                </div>

                <div>
                  <h1 class="text-blue1">Followers</h1>
                  <p v-if="!detailUser?.data?.followers">100</p>
                  <p v-else>{{ detailUser?.data?.followers }}</p>
                </div>

                <div>
                  <h1 class="text-blue1">Following</h1>
                  <p v-if="!detailUser?.data?.following">100</p>
                  <p v-else>{{ detailUser?.data?.following }}</p>
                </div>
              </div>
            </div>

            <div>
              <div class="grid gap-3 grid-cols-2">
                <div class="flex items-center gap-3">
                  <MapPinIcon class="w-5 h-5 text-blue1" />
                  <p class="text-xs" v-if="!detailUser?.data?.location">
                    Not found!
                  </p>
                  <p class="text-xs" v-else>{{ detailUser?.data?.location }}</p>
                </div>

                <div class="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style="fill: #5773ff; transform: ; msfilter: "
                    class="text-blue1"
                  >
                    <path
                      d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                    ></path>
                  </svg>
                  <p class="text-xs" v-if="!detailUser?.data?.twitter_username">
                    null
                  </p>
                  <p class="text-xs" v-else>
                    {{ detailUser?.data?.twitter_username }}
                  </p>
                </div>

                <div class="flex items-center gap-3">
                  <LinkIcon class="w-5 h-5 text-blue1" />
                  <p class="text-xs" v-if="!detailUser?.data?.blog">
                    https://example.com
                  </p>
                  <p class="text-xs" v-else>{{ detailUser?.data?.blog }}</p>
                </div>

                <div class="flex items-center gap-3">
                  <HomeModernIcon class="w-5 h-5 text-blue1" />
                  <p class="text-xs" v-if="!detailUser?.data?.type">
                    Organization
                  </p>
                  <p class="text-xs" v-else>{{ detailUser?.data?.type }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core';
import {
  SunIcon,
  MoonIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline';
import { MapPinIcon, LinkIcon, HomeModernIcon } from '@heroicons/vue/24/solid';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
export default {
  name: 'githubUser',
  data() {
    return {
      username: null,
      detailUser: [],
    };
  },
  methods: {
    async getUser() {
      const res = await axios.get(
        `https://api.github.com/users/${this.username}`
      );
      this.detailUser = res;
    },
    formatDate(dateString) {
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format('MMM D, YYYY');
    },
  },
};
</script>
