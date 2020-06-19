<template>
  <div class="text-center">
    <label for="searchstring" class="text-sm">Search: </label>
    <input id="searchstring" type="text" class="w-3/4 text-sm border m-2 p-1 rounded-md" v-model="searchString" />
    <table class="table-auto text-left w-full" v-if="this.feeds">
      <thead>
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Statistics</th>
          <th class="px-4 py-2">Last Crawl</th>
          <th class="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="feed in this.feeds.filter(o => o.name.includes(this.searchString) || o.url.includes(this.searchString))" :key="feed.id">
          <td class="border px-4 py-2">{{ feed.name }}<br><a class="text-xs" :href="feed.url" target="_blank">{{ feed.url }}</a></td>
          <td class="border px-4 py-2 text-xs">Nr of Articles: {{ feed.nrOfArticles }}<br>Nr of Articles Last 7 Days: {{ feed.nrOfArticlesLast7Days }}<br></td>
          <td class="border px-4 py-2">{{ new Date(feed.lastCrawl).toLocaleString() }}</td>
          <td class="border px-4 py-2">
            <span class="text-xs" v-if="getCollectionsForFeed(feed).length > 0">Add to Collection:</span>
            <select v-model="feed.selected" class="ml-2 text-xs border border-purple-400" v-if="getCollectionsForFeed(feed).length > 0">
              <option v-for="col in getCollectionsForFeed(feed)" v-bind:key="col.id" v-bind:value="col.id">{{ col.name }}</option>
            </select>
            <button v-if="getCollectionsForFeed(feed).length > 0" class="ml-2 text-xs bg-white hover:bg-purple-100 text-purple-800 py-1 px-1" @click="addFeedToCollection(feed)">Add</button>
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
    ...mapMutations(['setLoading']),
    getCollectionsForFeed: function (feed) {
      var x = []

      this.mycollections.forEach(all => {
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
