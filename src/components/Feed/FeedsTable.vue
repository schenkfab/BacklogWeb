<template>
  <table class="table-auto w-full" v-if="this.feeds">
      <thead>
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Url</th>
          <th class="px-4 py-2">Last Crawl</th>
          <th class="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="feed in this.feeds" :key="feed.id">
          <td class="border px-4 py-2">{{ feed.name }}</td>
          <td class="border px-4 py-2"><a :href="feed.url" target="_blank">{{ feed.url }}</a></td>
          <td class="border px-4 py-2">{{ new Date(feed.lastCrawl).toLocaleString() }}</td>
          <td class="border px-4 py-2">
            <span class="text-xs">Add to Collection:</span>
            <select v-model="feed.selected" class="ml-2 text-xs border border-purple-400 ">
              <option v-for="col in getCollectionsForFeed(feed)" v-bind:key="col.id" v-bind:value="col.id">{{ col.name }}</option>
            </select>
            <button class="ml-2 text-xs bg-white hover:bg-purple-100 text-purple-800 py-1 px-1" @click="addFeedToCollection(feed)">Add</button>
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
    addFeedToCollection: function (feed) {
      const obj = {
        feedId: feed.id,
        collectionId: feed.selected
      }
      if (feed.selected) {
        this.addFeedToCollectionAsync(obj)
        feed.selected = null
      }
    }
    // subscribe: function (id) {
    //   this.$emit('subscribe', id)
    // },
    // unsubscribe: function (feedId) {
    //   this.$emit('unsubscribe', feedId)
    // },
    // alreadySubscribed: function (id) {
    //   return this.subscribed.includes(id)
    // }
  }
}
</script>

<style>

</style>
