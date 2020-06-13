<template>
  <button class="bg-white hover:bg-purple-300 font-semibold text-gray-800 py-1 px-3 hover:underline border rounded" @click="follow()">
    Follow
  </button>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'FollowButton',
  props: ['id'],
  methods: {
    ...mapMutations(['setLoading']),
    ...mapActions(['addFollowsAsync']),
    async follow () {
      this.setLoading(true)
      await this.addFollowsAsync(this.id)
      this.setLoading(false)
    }
  }
}
</script>
