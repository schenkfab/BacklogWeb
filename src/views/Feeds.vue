<template>
  <div class="container mx-auto items-center justify-center" v-if="this.getUser.initialized">
    <add-feed></add-feed>
    <div>
      <feeds-table @subscribe="subscribe" @unsubscribe="unsubscribe" :feeds="this.getFeeds" :subscribed="this.getSubscribed"></feeds-table>
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
    ...mapGetters(['getFeeds', 'getSubscribed', 'getUser'])
  },
  methods: {
    ...mapMutations(['setLoading']),
    ...mapActions(['getFeedsAsync', 'addSubscriptionAsync', 'deleteSubscriptionAsync', 'getUserAsync']),
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
    await this.getUserAsync()
    await this.getFeedsAsync()
    this.setLoading(false)
  }
}
</script>
