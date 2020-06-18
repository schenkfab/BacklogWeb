<template>
  <div class="container mx-auto items-center text-center justify-center mb-8">
    <BaseTitle>Good Day!</BaseTitle>
    <p class="mb-4">You are successfuly logged in to Backlog. Enjoy your stay and especially your day!
    </p>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  methods: {
    ...mapMutations(['setLoading']),
    ...mapActions(['getFeedsAsync', 'getCollectionsAsync', 'getCollectionStatisticsAsync', 'getFollowsAsync'])
  },
  mounted: async function () {
    this.setLoading(true)
    await Promise.all([this.getFeedsAsync(), this.getCollectionsAsync(), this.getFollowsAsync(), this.getCollectionStatisticsAsync()])
    this.setLoading(false)
  }
}
</script>

<style>

</style>
