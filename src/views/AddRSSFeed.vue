<template>
  <div class="container mx-auto items-center justify-center mb-8" v-if="this.getUser.initialized">
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
  </div>
</template>

<script>
import AddFeed from '@/components/Feed/AddFeed'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    AddFeed
  },
  data: () => {
    return {}
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    ...mapMutations(['setLoading']),
    ...mapActions(['getFeedsAsync', 'getCollectionsAsync'])
  },
  mounted: async function () {
    this.setLoading(true)
    await this.getFeedsAsync()
    await this.getCollectionsAsync()
    this.setLoading(false)
  }
}
</script>
