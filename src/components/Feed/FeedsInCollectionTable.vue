<template>
  <table class="table-auto w-full" v-if="this.feeds">
      <thead>
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Statistics</th>
          <th class="px-4 py-2">Last Crawl</th>
          <th class="px-4 py-2" v-if="ismycollection">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="feed in this.feeds" :key="feed.id">
          <td class="border px-4 py-2">{{ feed.name }}<br><a class="text-xs" :href="feed.url" target="_blank">{{ feed.url }}</a></td>
          <td class="border px-4 py-2 text-xs">Nr of Articles: {{ feed.nrOfArticles }}<br>Nr of Articles Last 7 Days: {{ feed.nrOfArticlesLast7Days }}<br></td>
          <td class="border px-4 py-2 text-xs">{{ new Date(feed.lastCrawl).toLocaleString() }}</td>
          <td class="border px-4 py-2" v-if="ismycollection">
            <button class="bg-white hover:bg-purple-100 text-purple-800" @click="removeFeedFromCollection(feed)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    feeds: {
      type: Array,
      default: () => ([])
    },
    ismycollection: {
      type: Boolean,
      default: () => (false)
    },
    mycollections: {
      type: Array,
      default: () => ([])
    },
    subscribed: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    ...mapActions(['addFeedToCollectionAsync']),
    removeFeedFromCollection: function (feed) {
      this.$emit('unsubscribe', feed.id)
    }
  }
}
</script>

<style>

</style>
