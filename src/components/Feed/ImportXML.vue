<template>
  <form>
    <div class="flex flex-col">
      <div>
        <label
          class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >XML:</label>
      </div>
      <div>
        <textarea
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          v-model="xml"
        />
      </div>
      <div class="items-center">
        <div>
          <button
            class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            @click="getFeed"
          >Check Feeds</button>
        </div>
      </div>
      <div>
        <BaseSubtitle>Result</BaseSubtitle>
        <table class="table-auto w-full">
      <thead>
        <tr>
          <th class="px-4 py-2">Collection</th>
          <th class="px-4 py-2">Feed</th>
          <th class="px-4 py-2">Url</th>
          <th class="px-4 py-2">Error</th>
          <th class="px-4 py-2 w-24">Action</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="collection in this.opml">
          <tr :key="collection.id">
            <td class="border px-4 py-2 text-sm">
              <input class="border" v-model="collection.title"></td>
            <td class="px-4 py-2"></td>
            <td class="px-4 py-2 text-xs"></td>
            <td class="px-4 py-2 text-xs">{{ collection.error ? collection.error : '' }}</td>
            <td class="px-4 py-2 text-xs">
              <input type="checkbox" id="checkbox" v-model="collection.checked" @change="check($event, collection.feeds)">
              <label> Add</label>
<br>
              <input type="checkbox" id="checkbox" v-model="collection.private">
              <label> Private</label>
            </td>
          </tr>
          <tr v-for="feed in collection.feeds" :key="feed.xmlUrl">
            <td class="border px-4 py-2"></td>
            <td class="border px-4 py-2 text-sm">{{ feed.title }}</td>
            <td class="border px-4 py-2 text-xs">{{ feed.xmlUrl }}</td>
            <td class="border px-4 py-2 text-xs">{{ feed.error ? feed.error : '' }}</td>
            <td class="border px-4 py-2 text-xs">
              <input type="checkbox" :id="feed.id" v-model="feed.checked">
              <label :for="feed.id">{{ feed.error ? " Report" : " Add" }}</label>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
      </div>
      <div>
          <button v-if="this.opml"
            class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold mt-2 py-2 px-4 rounded"
            type="button"
            @click="submit"
          >Submit</button>
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
    <div v-if="alreadyExists">
      <div
        class="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 pb-2"
        role="alert"
      >
        <p
          class="text-sm mb-4"
        >{{ `The feed ${this.url} is already registered.` }}</p>
        <button @click="discardError" class="bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4 rounded inline-flex items-center">
          <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
          <span>Close</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  data: () => {
    return {
      xml: null,
      created: false,
      title: null,
      error: false,
      alreadyExists: false,
      opml: null
    }
  },
  mounted () {
    this.getCollectionsAsync()
  },
  computed: {
    ...mapGetters(['getFeedAlreadyExists', 'getOPML', 'getCollections', 'getUser'])
  },
  methods: {
    ...mapMutations(['setLoading']),
    ...mapActions(['addFeedAsync', 'submitErrorAsync', 'importOPMLAsync', 'submitOPMLAsync', 'getCollectionsAsync']),
    async addFeed () {
      if (this.getFeedAlreadyExists(this.url)) {
        this.alreadyExists = true
      } else {
        this.setLoading(true)
        await this.addFeedAsync({ name: this.title, url: this.url })
        this.created = true
        this.setLoading(false)
      }
    },
    async submit () {
      this.setLoading(true)
      var hasError = false
      // first check for names already present...
      this.opml.forEach(o => {
        if (o.private) {
          console.log(this.getUser)
          if (this.getCollections.filter(collection => collection.name === o.title && collection.isPrivate === true && collection.userId === this.getUser.id).length > 0) {
            o.error = 'A collection with this name already exists in your private collection list.'
            hasError = true
          } else {
            o.error = null
          }
        } else {
          if (this.getCollections.filter(collection => collection.name === o.title && collection.isPrivate === false).length > 0) {
            o.error = 'A collection with this name already exists. Please make it private or choose another name.'
            hasError = true
          } else {
            o.error = null
          }
        }
      })
      if (!hasError) {
        await this.submitOPMLAsync(this.opml)
      }
      this.setLoading(false)
    },
    async getFeed () {
      this.setLoading(true)
      await this.importOPMLAsync(this.xml)
      this.opml = this.getOPML
      this.setLoading(false)
    },
    discardError () {
      this.error = false
      this.alreadyExists = false
    },
    check (e, collection) {
      collection.forEach(o => {
        o.checked = e.target.checked
      })
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
