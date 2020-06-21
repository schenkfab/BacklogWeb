<template>
  <div class="container mx-auto items-center justify-center mb-8" v-if="this.getUser.initialized">
    <BaseTitle>Feeds</BaseTitle>
    <p class="mb-4">Feeds are shared across all users and can be added by anyone who is registered. Once added, everyone can subscribe to them by adding a feed to one of their collections.<br>
      As not all feeds are the same, there is a chance, that adding one may fail. If it fails, simply submit the error to us and we will make sure to improve backlog and add the feed ourselves.
    </p>
    <BaseSubtitle>List of Feeds</BaseSubtitle>
    <div>
      <feeds-table :feeds="this.getFeeds"></feeds-table>
    </div>
  </div>
</template>

<script>
import FeedsTable from '@/components/Feed/FeedsTable'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    FeedsTable
  },
  data: () => {
    return {}
  },
  computed: {
    ...mapGetters(['getFeeds', 'getSubscribed', 'getUser'])
  },
  methods: {
    ...mapMutations(['setLoading']),
    ...mapActions(['getFeedsAsync', 'getFeedStatisticsAsync', 'getCollectionsAsync', 'addSubscriptionAsync', 'deleteSubscriptionAsync', 'getUserAsync']),
    subscribe: async function (id) {
      await this.addSubscriptionAsync(id)
    },
    unsubscribe: async function (feedId) {
      var subs = this.getUser.subscriptions
      subs.forEach(async o => {
        if (o.feed.id === feedId) {
          await this.deleteSubscriptionAsync(o.id)
        }
      })
      //
    }
  },
  mounted: async function () {
    this.setLoading(true)
    await this.getFeedStatisticsAsync()
    await this.getFeedsAsync()
    await this.getCollectionsAsync()
    this.setLoading(false)
  }
}
</script>
