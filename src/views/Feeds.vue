<template>
  <div class="container mx-auto items-center justify-center" v-if="this.getUser.initialized">
    <div class="text-left mb-4">
      <h1 class="text-3xl text-purple-600">Feeds</h1>
      <hr>
    </div>
    <p class="mb-4">Feeds are shared across all users and can be added by anyone who is registered. Once added, everyone can subscribe to them by adding a feed to one of their collections.<br>
      As not all feeds are the same, there is a chance, that adding one may fail. If it fails, simply submit the error to us and we will make sure to improve backlog and add the feed ourselves.
    </p>
    <div class="text-left mb-8">
      <h1 class="text-xl text-purple-400">Add Feed</h1>
    </div>
    <add-feed></add-feed>
    <div class="text-left mb-8">
      <h1 class="text-xl text-purple-400">List of Feeds</h1>
    </div>
    <div>
      <feeds-table :mycollections="getMyCollections" @subscribe="subscribe" @unsubscribe="unsubscribe" :feeds="this.getFeeds" :subscribed="this.getSubscribed"></feeds-table>
    </div>
  </div>
</template>

<script>
import AddFeed from '@/components/Feed/AddFeed'
import FeedsTable from '@/components/Feed/FeedsTable'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    AddFeed, FeedsTable
  },
  data: () => {
    return {}
  },
  computed: {
    ...mapGetters(['getFeeds', 'getSubscribed', 'getUser', 'getMyCollections'])
  },
  methods: {
    ...mapMutations(['setLoading']),
    ...mapActions(['getFeedsAsync', 'getCollectionsAsync', 'addSubscriptionAsync', 'deleteSubscriptionAsync', 'getUserAsync']),
    subscribe: async function (id) {
      await this.addSubscriptionAsync(id)
    },
    unsubscribe: async function (feedId) {
      var subs = this.getUser.subscriptions
      console.log(subs)
      subs.forEach(async o => {
        console.log(o)
        if (o.feed.id === feedId) {
          await this.deleteSubscriptionAsync(o.id)
        }
      })
      //
    }
  },
  mounted: async function () {
    this.setLoading(true)
    await this.getFeedsAsync()
    await this.getCollectionsAsync()
    this.setLoading(false)
  }
}
</script>
