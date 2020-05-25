<template>
  <div class="container mx-auto items-center justify-center" v-if="this.getUser.initialized">
    <div class="text-center mb-8">
      <h1 class="text-3xl">Feeds</h1>
      <hr>
    </div>
    <add-feed></add-feed>
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
