<template>
  <div class="container mx-auto items-center justify-center" v-if="this.getUser.initialized">
    <div class="text-left mb-4">
      <h1 class="text-3xl text-purple-600">Collections</h1>
      <hr>
    </div>
    <p class="mb-4">Everyone has by default one collection which is private. It is being created during registration and is called "My Collection". Feel free to head over to the feeds page and add some feeds to your "My Collection".<br>
    In addition to that, Backlog allows users to create several private and public collections which can be shared across the platform.
    </p>
    <div class="text-left mb-8">
      <h1 class="text-xl text-purple-400">My Collections</h1>
    </div>
    <div class="mb-8">
      <collections-table :collections="this.getMyCollections" :followed="this.getFollowed()"></collections-table>
    </div>
    <div class="text-left mb-8">
      <h1 class="text-xl text-purple-400">All Collections</h1>
    </div>
    <div>
      <collections-table :collections="this.getCollections" :followed="this.getFollowed()"></collections-table>
    </div>

  </div>
</template>

<script>
import CollectionsTable from '@/components/Collection/CollectionsTable'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    CollectionsTable
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
    await Promise.all([this.getCollectionsAsync(), this.getFollowsAsync(), this.getCollectionStatisticsAsync()])
    this.setLoading(false)
  }
}
</script>
