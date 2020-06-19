<template>
  <a class="block lg:inline-block hoverable hover:bg-pink-500 hover:text-white p-5" v-if="this.getUser.initialized">
    <a href="#" class="relative font-bold hover:bg-pink-500 hover:text-white">Boards</a>
      <div class="mega-menu mb-16 sm:mb-0 shadow-xl p-6 mt-5">
        <div class="container mx-auto w-full flex flex-wrap justify-between mx-2">
          <div class="w-full text-white mb-8">
            <h2 class="font-bold text-2xl">Boards</h2>
            <p>Each collection you follow, will be a board with the appropriate actions.</p>
          </div>
          <ul class="px-4 w-full sm:w-1/2 lg:w-1/2 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
            <div class="flex items-center">
              <svg class="h-8 mb-3 mr-3 fill-current text-white"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M8.627,7.885C8.499,8.388,7.873,8.101,8.13,8.177L4.12,7.143c-0.218-0.057-0.351-0.28-0.293-0.498c0.057-0.218,0.279-0.351,0.497-0.294l4.011,1.037C8.552,7.444,8.685,7.667,8.627,7.885 M8.334,10.123L4.323,9.086C4.105,9.031,3.883,9.162,3.826,9.38C3.769,9.598,3.901,9.82,4.12,9.877l4.01,1.037c-0.262-0.062,0.373,0.192,0.497-0.294C8.685,10.401,8.552,10.18,8.334,10.123 M7.131,12.507L4.323,11.78c-0.218-0.057-0.44,0.076-0.497,0.295c-0.057,0.218,0.075,0.439,0.293,0.495l2.809,0.726c-0.265-0.062,0.37,0.193,0.495-0.293C7.48,12.784,7.35,12.562,7.131,12.507M18.159,3.677v10.701c0,0.186-0.126,0.348-0.306,0.393l-7.755,1.948c-0.07,0.016-0.134,0.016-0.204,0l-7.748-1.948c-0.179-0.045-0.306-0.207-0.306-0.393V3.677c0-0.267,0.249-0.461,0.509-0.396l7.646,1.921l7.654-1.921C17.91,3.216,18.159,3.41,18.159,3.677 M9.589,5.939L2.656,4.203v9.857l6.933,1.737V5.939z M17.344,4.203l-6.939,1.736v9.859l6.939-1.737V4.203z M16.168,6.645c-0.058-0.218-0.279-0.351-0.498-0.294l-4.011,1.037c-0.218,0.057-0.351,0.28-0.293,0.498c0.128,0.503,0.755,0.216,0.498,0.292l4.009-1.034C16.092,7.085,16.225,6.863,16.168,6.645 M16.168,9.38c-0.058-0.218-0.279-0.349-0.498-0.294l-4.011,1.036c-0.218,0.057-0.351,0.279-0.293,0.498c0.124,0.486,0.759,0.232,0.498,0.294l4.009-1.037C16.092,9.82,16.225,9.598,16.168,9.38 M14.963,12.385c-0.055-0.219-0.276-0.35-0.495-0.294l-2.809,0.726c-0.218,0.056-0.351,0.279-0.293,0.496c0.127,0.506,0.755,0.218,0.498,0.293l2.807-0.723C14.89,12.825,15.021,12.603,14.963,12.385"></path>
              </svg>
              <h3 class="font-bold text-xl text-white text-bold mb-2">Private Boards</h3>
            </div>
            <div class="inline-block items-center py-1" >
              <div class="flex items-center py-1" v-for="follow in this.getFollows.filter(o => o.collection.isPrivate)" v-bind:key="follow.id">
                <router-link
                  class="text-white bold border-b-2 border-purple-300 hover:text-purple-300 text-xs"
                  :to='`/board/${follow.id}`'
                >{{ getCollectionName(follow.collection.id) }} {{ follow.newItems > 0 ? `(${follow.newItems})` : '' }}</router-link>
              </div>
            </div>
          </ul>
          <ul class="px-4 w-full sm:w-1/2 lg:w-1/2 border-gray-600 border-b sm:border-r-0 lg:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
            <div class="flex items-center">
              <svg class="h-8 mb-3 mr-3 fill-current text-white"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
              </svg>
              <h3 class="font-bold text-xl text-white text-bold mb-2">Public Boards</h3>
            </div>
            <div class="inline-block items-center py-1" >
              <div class="flex items-center py-1" v-for="follow in this.getFollows.filter(o => !o.collection.isPrivate)" v-bind:key="follow.id">
                <router-link
                  class="text-white text-xs bold border-b-2 border-purple-300 hover:text-purple-300"
                  :to='`/board/${follow.id}`'
                >{{ getCollectionName(follow.collection.id) }} {{ follow.newItems > 0 ? `(${follow.newItems})` : '' }}</router-link>
              </div>
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
