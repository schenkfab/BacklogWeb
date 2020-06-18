<template>
  <a class="block lg:inline-block hoverable hover:bg-pink-500 hover:text-white p-5" v-if="this.getUser.initialized">
    <a href="#" class="relative font-bold hover:bg-pink-500 hover:text-white">Collections</a>
      <div class="mega-menu mb-16 sm:mb-0 shadow-xl p-6 mt-5">
        <div class="container mx-auto w-full flex flex-wrap justify-between mx-2">
          <div class="w-full text-white mb-8">
            <h2 class="font-bold text-2xl">Backlog Collections</h2>
            <p>A collection is a combination of feeds. Structure your feeds in collections or follow already created collections!</p>
          </div>
          <ul class="px-4 w-full sm:w-1/2 lg:w-1/3 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
            <div class="flex items-center">
              <svg class="h-8 mb-3 mr-3 fill-current text-white"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M8.627,7.885C8.499,8.388,7.873,8.101,8.13,8.177L4.12,7.143c-0.218-0.057-0.351-0.28-0.293-0.498c0.057-0.218,0.279-0.351,0.497-0.294l4.011,1.037C8.552,7.444,8.685,7.667,8.627,7.885 M8.334,10.123L4.323,9.086C4.105,9.031,3.883,9.162,3.826,9.38C3.769,9.598,3.901,9.82,4.12,9.877l4.01,1.037c-0.262-0.062,0.373,0.192,0.497-0.294C8.685,10.401,8.552,10.18,8.334,10.123 M7.131,12.507L4.323,11.78c-0.218-0.057-0.44,0.076-0.497,0.295c-0.057,0.218,0.075,0.439,0.293,0.495l2.809,0.726c-0.265-0.062,0.37,0.193,0.495-0.293C7.48,12.784,7.35,12.562,7.131,12.507M18.159,3.677v10.701c0,0.186-0.126,0.348-0.306,0.393l-7.755,1.948c-0.07,0.016-0.134,0.016-0.204,0l-7.748-1.948c-0.179-0.045-0.306-0.207-0.306-0.393V3.677c0-0.267,0.249-0.461,0.509-0.396l7.646,1.921l7.654-1.921C17.91,3.216,18.159,3.41,18.159,3.677 M9.589,5.939L2.656,4.203v9.857l6.933,1.737V5.939z M17.344,4.203l-6.939,1.736v9.859l6.939-1.737V4.203z M16.168,6.645c-0.058-0.218-0.279-0.351-0.498-0.294l-4.011,1.037c-0.218,0.057-0.351,0.28-0.293,0.498c0.128,0.503,0.755,0.216,0.498,0.292l4.009-1.034C16.092,7.085,16.225,6.863,16.168,6.645 M16.168,9.38c-0.058-0.218-0.279-0.349-0.498-0.294l-4.011,1.036c-0.218,0.057-0.351,0.279-0.293,0.498c0.124,0.486,0.759,0.232,0.498,0.294l4.009-1.037C16.092,9.82,16.225,9.598,16.168,9.38 M14.963,12.385c-0.055-0.219-0.276-0.35-0.495-0.294l-2.809,0.726c-0.218,0.056-0.351,0.279-0.293,0.496c0.127,0.506,0.755,0.218,0.498,0.293l2.807-0.723C14.89,12.825,15.021,12.603,14.963,12.385"></path>
              </svg>
              <h3 class="font-bold text-xl text-white text-bold mb-2">My Collections</h3>
            </div>
            <p class="text-gray-100 text-sm">See all collections you have created or you follow.</p>
            <div class="flex items-center py-3">
              <svg class="h-6 pr-3 fill-current text-purple-300"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z"/>
              </svg>
              <router-link
                class="text-white bold border-b-2 border-purple-300 hover:text-purple-300"
                to="/collections"
              >Collections</router-link>
            </div>
          </ul>
          <ul class="px-4 w-full sm:w-1/2 lg:w-1/3 border-gray-600 border-b sm:border-r-0 lg:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
            <div class="flex items-center">
              <svg class="h-8 mb-3 mr-3 fill-current text-white"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M11.709,7.438H8.292c-0.234,0-0.427,0.192-0.427,0.427v8.542c0,0.234,0.192,0.427,0.427,0.427h3.417c0.233,0,0.426-0.192,0.426-0.427V7.865C12.135,7.63,11.942,7.438,11.709,7.438 M11.282,15.979H8.719V8.292h2.563V15.979zM6.156,11.709H2.74c-0.235,0-0.427,0.191-0.427,0.426v4.271c0,0.234,0.192,0.427,0.427,0.427h3.417c0.235,0,0.427-0.192,0.427-0.427v-4.271C6.583,11.9,6.391,11.709,6.156,11.709 M5.729,15.979H3.167v-3.416h2.562V15.979zM17.261,3.167h-3.417c-0.235,0-0.427,0.192-0.427,0.427v12.812c0,0.234,0.191,0.427,0.427,0.427h3.417c0.234,0,0.427-0.192,0.427-0.427V3.594C17.688,3.359,17.495,3.167,17.261,3.167 M16.833,15.979h-2.562V4.021h2.562V15.979z"></path>
              </svg>
              <h3 class="font-bold text-xl text-white text-bold mb-2">Top Collections</h3>
            </div>
            <p class="text-gray-100 text-sm">All collections ordered by the amount of followers.</p>
            <div class="flex items-center py-3">
              <svg class="h-6 pr-3 fill-current text-purple-300"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z"/>
              </svg>
              <router-link
                class="text-white bold border-b-2 border-purple-300 hover:text-purple-300"
                to="/collections/top"
              >Top Collections</router-link>
            </div>
          </ul>
          <ul class="px-4 w-full sm:w-1/2 lg:w-1/3 border-gray-600 border-b sm:border-b-0 sm:border-r md:border-b-0 pb-6 pt-6 lg:pt-3">
            <div class="flex items-center">
              <svg class="h-8 mb-3 mr-3 fill-current text-white"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
              </svg>
              <h3 class="font-bold text-xl text-white text-bold mb-2">Add Collection</h3>
            </div>
            <p class="text-gray-100 text-sm">Create a new public or private collection.</p>
            <div class="flex items-center py-3">
              <svg class="h-6 pr-3 fill-current text-purple-300"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z"/>
              </svg>
              <router-link
                class="text-white bold border-b-2 border-purple-300 hover:text-purple-300"
                to="/collections/add"
              >Add Collection</router-link>
            </div>
          </ul>
        </div>
      </div>
  </a>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getUser', 'getFollows', 'getCollectionName'])
  }
}
</script>

<style>

</style>
