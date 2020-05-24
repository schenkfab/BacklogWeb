<template>
  <nav class="flex items-center justify-between flex-wrap p-4 border-b">
    <div class="flex items-center flex-shrink-0 mr-6">
      <rss />
      <span class="font-semibold text-xl tracking-tight pl-4">News Backlog</span>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <router-link
          class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-400 mr-2 ml-2"
          to="/"
        >Home</router-link>
        <router-link
          v-if="this.getUser.initialized"
          class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-400 mr-2 ml-2"
          to="/board"
        >Board</router-link>
        <router-link
          v-if="this.getUser.initialized"
          class="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-400 mr-5 ml-2"
          to="/feeds"
        >Feeds</router-link>
        <span v-if="this.getUser.initialized">|</span>
        <router-link
          v-if="this.getUser.initialized"
          class="block mt-4 lg:inline-block lg:mt-0 text-green-400 hover:text-gray-400 mr-2 ml-5"
          to="/feeds"
        >Development</router-link>
      </div>
      <div>
        <router-link
          v-if="!this.getUser.initialized"
          class="block mt-4 lg:inline-block lg:mt-0 text-sm hover:text-gray-400 mr-4"
          to="/login"
        >Login</router-link>
        <button
          v-if="this.getUser.initialized"
          @click="logout"
          class="block mt-4 lg:inline-block lg:mt-0 text-sm hover:text-gray-400 mr-4"
        ><img
          v-if="this.getUser.initialized"
          :src="this.getUser.picture"
          style="float: left; margin-top:-4px;"
          class="h-8 w-8 rounded-lg border-solid border-2 border-green-600 mr-2"
        /><span class="underline">{{ this.getUser.name }}</span></button>
        <button
          v-if="this.getUser.initialized"
          @click="logout"
          class="block mt-4 lg:inline-block lg:mt-0 text-sm hover:text-gray-400 mr-4"
        >Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { RssIcon } from 'vue-feather-icons'
import { mapGetters, mapActions } from 'vuex'

require('dotenv').config()

export default {
  name: 'Nav',
  components: { rss: RssIcon },
  methods: {
    ...mapActions(['getUserAsync']),
    logout: function () {
      this.$auth.logout({
        returnTo: window.location.origin
      })
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>
