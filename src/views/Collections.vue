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
      <collections-table @follow="follow" :collections="this.getCollections" :followed="this.getFollowed"></collections-table>
    </div>
    <div class="text-left mb-8">
      <h1 class="text-xl text-purple-400">All Collections</h1>
    </div>
    <div>
      <collections-table @subscribe="subscribe" :collections="this.getCollections" :followed="this.getFollowed"></collections-table>
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
    ...mapGetters(['getCollections', 'getUser', 'getPersonalCollection'])
  },
  methods: {
    ...mapActions(['getCollectionsAsync', 'addCollectionAsync', 'getUserAsync', 'getFollowsAsync'])
  },
  mounted: async function () {
    await this.getCollectionsAsync()
    await this.getFollowsAsync()
    console.log(this.getPersonalCollection)
  }
}
</script>
