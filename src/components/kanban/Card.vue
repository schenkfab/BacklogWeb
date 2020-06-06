<template>
    <li class="p-2 mb-3 bg-white shadow rounded-lg cursor-move" style="min-width: 300px;">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <img :class="this.imgClass" @mouseover="bigImg()" @mouseout="smallImg()" v-if="data.picture" :src="data.picture" :alt="data.name">
            <img class="w-8 h-8 rounded-full" v-if="!data.picture" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Generic_Feed-icon.svg/1024px-Generic_Feed-icon.svg.png" :alt="data.name">
            <p v-if="!this.isBig" class="ml-2 text-gray-700 font-sans tracking-wide text-sm text-left">{{data.name}}</p>
          </div>
          <div class="flex" v-if="!this.isBig">
            <button aria-label="Go to Link"
                    class="p-1 focus:outline-none focus:shadow-outline text-purple-500 hover:text-purple-600"
                    @click="$emit('onExternalLink', data)">
                <ExternalLinkIcon/>
            </button>
          </div>
        </div>
        <p v-if="!this.isBig" class="text-purple-600 font-sans text-xs">{{(new Date(data.date)).toLocaleDateString()}} - {{ getFeedNameShort(data.feed.name) }}</p>
    </li>
</template>
<script>
import { ExternalLinkIcon } from 'vue-feather-icons'
export default {
  data () {
    return {
      isBig: false
    }
  },
  components: {
    ExternalLinkIcon
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    imgClass () {
      return this.isBig ? 'w-13 h-13' : 'w-8 h-8 rounded-full'
    }
  },
  methods: {
    bigImg () {
      this.isBig = true
    },
    smallImg () {
      this.isBig = false
    },
    getFeedNameShort (feedName) {
      if (feedName.length <= 30) {
        return feedName
      } else {
        return `${feedName.substring(0, 30)}...`
      }
    }
  }
}
</script>

<style>

</style>
