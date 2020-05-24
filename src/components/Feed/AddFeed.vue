<template>
  <form>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/4">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >Feed URL:</label>
      </div>
      <div class="md:w-2/4 pr-4">
        <input
          placeholder="https://cloudblogs.microsoft.com/sqlserver/feed/"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          v-model="url"
        />
      </div>
      <div class="md:w-1/4 md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button
            class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            @click="getFeed"
          >Get Feed</button>
        </div>
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/4">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >Feed Title:</label>
      </div>
      <div class="md:w-2/4 pr-4">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          v-model="title"
        />
      </div>
      <div class="md:w-1/4 md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button
            class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            @click="addFeed"
          >Add Feed</button>
        </div>
      </div>
    </div>
    <div v-if="created">
      <div
        class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 pb-2"
        role="alert"
        v-if="this.title"
      >
        <p class="text-sm">{{ `Feed ${this.title} has been added.` }}</p>
      </div>
    </div>
    <div v-if="error">
      <div
        class="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 pb-2"
        role="alert"
      >
        <p
          class="text-sm mb-4"
        >{{ `There was an error with the feed ${this.url}. Do you want to submit the error to help us improve our software?` }}</p>
        <button @click="submitError" class="mr-2 bg-green-300 hover:bg-green-400 text-green-800 font-bold py-2 px-4 rounded inline-flex items-center">
          <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
          <span>Yes</span>
        </button>
        <button @click="discardError" class="bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4 rounded inline-flex items-center">
          <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
          <span>No</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import Parser from 'rss-parser'

export default {
  data: () => {
    return {
      url: null,
      created: false,
      title: null,
      error: false
    }
  },
  methods: {
    ...mapMutations(['setLoading']),
    ...mapActions(['addFeedAsync', 'submitErrorAsync']),
    async addFeed () {
      await this.addFeedAsync({ name: this.title, url: this.url })
      this.created = true
    },
    async getFeed () {
      this.setLoading(true)
      try {
        const parser = new Parser()
        const o = await parser.parseURL(
          `https://cors-anywhere.herokuapp.com/${this.url}`
        )
        this.title = o.title
      } catch (ex) {
        this.error = true
      }
      this.setLoading(false)
    },
    discardError () {
      this.error = false
    },
    submitError () {
      this.setLoading(true)
      this.submitErrorAsync(this.url)
      this.error = false
      this.setLoading(false)
    }
  }
}
</script>

<style>
</style>
