<template>
  <div class="container mx-auto items-center justify-center" v-if="this.getUser.initialized">
    <div class="text-left mb-4">
      <h1 class="text-3xl text-purple-600">{{ this.title ? this.title : 'Error.' }}</h1>
      <hr>
      <a @click="$router.go(-1)" class="text-xs">back</a>
    </div>

    <div class="text-left mb-8">
      <h1 class="text-xl text-purple-400">List of Feeds in Collection</h1>
    </div>
    <div>
      <feeds-table :mycollections="getMyCollections" @unsubscribe="unsubscribe" :feeds="this.feeds"></feeds-table>
    </div>
  </div>
</template>

<script>
import FeedsInCollectionTable from '@/components/Feed/FeedsInCollectionTable'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  props: ['id'],
  components: {
    'feeds-table': FeedsInCollectionTable
  },
  data: () => {
    return {
      title: null,
      collection: null,
      feeds: []
    }
  },
  computed: {
    ...mapGetters(['getMyCollections', 'getFeeds', 'getUser', 'getCollectionName'])
  },
  methods: {
    ...mapMutations(['setLoading']),
    ...mapActions(['getCollectionsAsync', 'removeFeedFromCollectionAsync', 'getFeedsAsync']),
    async unsubscribe (feedId) {
      this.setLoading(true)
      await this.removeFeedFromCollectionAsync({ feedId: feedId, collectionId: this.id })
      this.setLoading(false)
    },
    createFeeds () {
      const feeds = []
      this.getFeeds.forEach(o => {
        o.feedInCollections.forEach(y => {
          if (y.collectionId === parseInt(this.id)) {
            feeds.push(o)
          }
        })
      })
      this.feeds = feeds
    }
  },
  watch: {
    getFeeds: {
      deep: true,
      handler () {
        this.createFeeds()
      }
    }
  },
  mounted: async function () {
    this.setLoading(true)
    await this.getCollectionsAsync()
    await this.getFeedsAsync()

    this.title = this.getCollectionName(this.id)

    this.createFeeds()

    this.setLoading(false)
  }
}
</script>
