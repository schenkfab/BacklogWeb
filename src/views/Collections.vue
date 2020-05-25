<template>
  <div class="container mx-auto items-center justify-center" v-if="this.getUser.initialized">
    <div class="text-left mb-8">
      <h1 class="text-3xl text-purple-600">Collections</h1>
      <hr>
    </div>
    <div class="text-left mb-8">
      <h1 class="text-xl text-purple-400">Add Collection</h1>
    </div>
    <add-collection></add-collection>
    <div class="text-left mb-8">
      <h1 class="text-xl text-purple-400">My Collections</h1>
    </div>
    <div class="mb-8">
      <collections-table @follow="follow" @unfollow="unfollow" :collections="this.getCollections" :followed="this.getFollowed()"></collections-table>
    </div>
    <div class="text-left mb-8">
      <h1 class="text-xl text-purple-400">All Collections</h1>
    </div>
    <div>
      <collections-table @follow="follow" @unfollow="unfollow" :collections="this.getCollections" :followed="this.getFollowed()"></collections-table>
    </div>

  </div>
</template>

<script>
import AddCollection from '@/components/Collection/AddCollection'
import CollectionsTable from '@/components/Collection/CollectionsTable'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    AddCollection, CollectionsTable
  },
  data: () => {
    return {}
  },
  computed: {
    ...mapGetters(['getCollections', 'getUser', 'getPersonalCollection', 'getFollows'])
  },
  methods: {
    ...mapActions(['getCollectionsAsync', 'addCollectionAsync', 'getUserAsync', 'getFollowsAsync']),
    getFollowed () {
      const followed = []
      this.getFollows.forEach(x => {
        followed.push(x.collection.id)
      })
      return followed
    },
    follow (collectionId) {
      console.error('follow needs to be implemented', collectionId)
    },
    unfollow (collectionId) {
      console.error('unfollow needs to be implemented', collectionId)
    }
  },
  mounted: async function () {
    await this.getCollectionsAsync()
    await this.getFollowsAsync()
    console.log(this.getPersonalCollection)
  }
}
</script>
