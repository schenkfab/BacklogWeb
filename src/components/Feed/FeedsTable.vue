<template>
  <div class="text-center">
    <label for="searchstring" class="text-sm">Search: </label>
    <input id="searchstring" type="text" class="w-3/4 text-sm border m-2 p-1 rounded-md" v-model="searchString" />
    <table class="table-auto text-left w-full" v-if="this.feeds">
      <thead>
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Statistics</th>
          <th class="px-4 py-2">Last Crawl (UTC)</th>
          <th class="px-4 py-2">Add to Collection</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="feed in this.feeds.filter(o => o.name.includes(this.searchString) || o.url.includes(this.searchString))" :key="feed.id">
          <td class="border px-4 py-2">{{ feed.name }}<br>
            <a class="text-xs" :href="feed.url" target="_blank">{{ feed.url.length > 50 ? `${feed.url.substring(0, 50)}...` : feed.url }}</a></td>
          <td class="border px-4 py-2 text-xs">Articles: {{ feed.nrOfArticles }}<br>Last 7 Days: {{ feed.nrOfArticlesLast7Days }}<br></td>
          <td class="border px-4 py-2 text-xs">{{ new Date(feed.lastCrawl).toLocaleString() }}</td>
          <td class="border px-4 py-2">
            <span class="text-xs" v-if="getCollectionsForFeed(feed).length > 0">Add to:</span>
            <select v-model="feed.selected" class="ml-2 text-xs border border-purple-400" v-if="getCollectionsForFeed(feed).length > 0">
              <option v-for="col in getCollectionsForFeed(feed)" v-bind:key="col.id" v-bind:value="col.id">{{ col.name }}</option>
            </select>
            <button v-if="getCollectionsForFeed(feed).length > 0" class="text-xs bg-white hover:bg-purple-100 text-purple-800 px-1" @click="addFeedToCollection(feed)">Add</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      searchString: ''
    }
  },
  props: {
    feeds: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getMyCollections'])
  },
  methods: {
    ...mapActions(['addFeedToCollectionAsync']),
    ...mapMutations(['setLoading']),
    getCollectionsForFeed: function (feed) {
      var x = []

      this.getMyCollections.forEach(all => {
        var alreadyAdded = false
        feed.feedInCollections.forEach(current => {
          if (current.collectionId === all.id) {
            alreadyAdded = true
          }
        })
        if (!alreadyAdded) {
          if (all.name === this.getUser.sub) {
            all.name = 'My Collection'
          }
          x.push(all)
        }
      })

      return x
    },
    addFeedToCollection: async function (feed) {
      const obj = {
        feedId: feed.id,
        collectionId: feed.selected
      }
      if (feed.selected) {
        this.setLoading(true)
        await this.addFeedToCollectionAsync(obj)
        feed.selected = null
        this.setLoading(false)
      }
    }
  }
}
</script>

<style>

</style>
