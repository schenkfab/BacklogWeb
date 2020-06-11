<template>
  <div class="container mx-auto items-center justify-center" v-if="this.getUser.initialized">
    <div class="text-left mb-4">
      <h1 class="text-3xl text-purple-600">Top Collections</h1>
      <hr>
    </div>
    <p class="mb-4">Publicly available collections including their number of followers, number of articles, and number of feeds.
    </p>
    <div class="mb-8">
      <top-collections-table :followed="this.getFollowed()"></top-collections-table>
    </div>
  </div>
</template>

<script>
import TopCollectionsTable from '@/components/Collection/TopCollectionsTable'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    TopCollectionsTable
  },
  data: () => {
    return {}
  },
  computed: {
    ...mapGetters(['getCollections', 'getUser', 'getPersonalCollection', 'getMyCollections', 'getFollows'])
  },
  methods: {
    ...mapMutations(['setLoading']),
    ...mapActions(['getCollectionStatisticsAsync', 'getCollectionsAsync', 'addCollectionAsync', 'getUserAsync', 'getFollowsAsync', 'addFollowsAsync', 'unfollowAsync']),
    getFollowed () {
      const followed = []
      this.getFollows.forEach(x => {
        followed.push(x.collection.id)
      })
      return followed
    }
  },
  mounted: async function () {
    this.setLoading(true)
    await this.getCollectionsAsync()
    await Promise.all([this.getFollowsAsync(), this.getCollectionStatisticsAsync()])
    this.setLoading(false)
  }
}
</script>
