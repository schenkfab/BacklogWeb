<template>
  <div class="container mx-auto items-center justify-center" v-if="this.getUser.initialized">
    <div class="text-left mb-4">
      <BaseTitle>Collections</BaseTitle>
    </div>
    <p class="mb-4">Everyone has by default one collection which is private. It is being created during registration and is called "My Collection". Feel free to head over to the feeds page and add some feeds to your "My Collection".<br>
    In addition to that, Backlog allows users to create several private and public collections which can be shared across the platform.
    </p>
      <BaseSubtitle>My Collections</BaseSubtitle>
    <div class="mb-8">
      <collections-table :collections="this.getMyCollections"></collections-table>
    </div>
      <BaseSubtitle>All Collections</BaseSubtitle>
      <collections-table :collections="this.getCollections"></collections-table>
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
    ...mapActions(['getCollectionStatisticsAsync', 'getCollectionsAsync', 'addCollectionAsync', 'getUserAsync', 'getFollowsAsync', 'addFollowsAsync', 'unfollowAsync'])
  },
  mounted: async function () {
    this.setLoading(true)
    await Promise.all([this.getCollectionsAsync(), this.getFollowsAsync(), this.getCollectionStatisticsAsync()])
    this.setLoading(false)
  }
}
</script>
