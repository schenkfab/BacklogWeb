<template>
    <li class="p-3 mb-2 bg-white rounded-lg cursor-move" style="min-width: 300px;">
      <div v-if="this.isBig" class="text-right"  style="margin-bottom: -20px;">
          <div>
            <button @click="more" class="text-xs"><MoreHorizontalIcon class="w-6 h-6 text-purple-500 hover:text-purple-600" /></button>
            <button aria-label="Go to Link"
                    class="p-1 focus:outline-none focus:shadow-outline text-purple-500 hover:text-purple-600"
                    @click="$emit('onExternalLink', data)">
                <ExternalLinkIcon/>
            </button>
          </div>
        </div>
      <div v-if="this.isBig" class="items-center text-center">
        <img class="w-32 h-32 rounded-full mx-auto" v-if="data.picture" :src="data.picture" :alt="data.name">
            <img class="w-32 h-32 rounded-full mx-auto" v-if="!data.picture" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Generic_Feed-icon.svg/1024px-Generic_Feed-icon.svg.png" :alt="data.name">
      </div>
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <img v-if="!this.isBig && data.picture" :class="this.imgClass" :src="data.picture" :alt="data.name">
            <img class="w-8 h-8 rounded-full" v-if="!this.isBig && !data.picture" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Generic_Feed-icon.svg/1024px-Generic_Feed-icon.svg.png" :alt="data.name">
            <p v-if="!this.isBig" class="ml-2 text-gray-700 font-sans tracking-wide text-sm text-left">{{data.name}}</p>
            <p v-if="this.isBig" class="font-sans pb-4 pt-2 tracking-wide text-sm text-left">{{data.name}}</p>
          </div>
          <div v-if="!this.isBig" class="flex">
            <button @click="more" class="text-xs"><MoreHorizontalIcon class="w-6 h-6 text-purple-500 hover:text-purple-600"  /></button>
            <button aria-label="Go to Link"
                    class="p-1 focus:outline-none focus:shadow-outline text-purple-500 hover:text-purple-600"
                    @click="$emit('onExternalLink', data)">
                <ExternalLinkIcon/>
            </button>
          </div>
        </div>
        <div v-if="this.isBig" class="text-xs text-left" v-html="data.description"></div>
        <p class="text-purple-600 font-sans text-xs">{{(new Date(data.date)).toLocaleDateString()}} - {{ getFeedNameShort(data.feed.name) }}</p>
        <div v-if="this.isBig" class="text-xs">
          <span>Move to: </span>
          <button @click="moveTo('Backlog')" class="m-1 border p-1 text-gray-600" v-if="this.board !== 'Backlog'">Backlog</button>
          <button @click="moveTo('To Do')" class="m-1 border p-1 text-purple-600" v-if="this.board !== 'To Do'">To Do</button>
          <button @click="moveTo('In Progress')" class="m-1 border p-1 text-blue-600" v-if="this.board !== 'In Progress'">In Progress</button>
          <button @click="moveTo('Done')" class="m-1 border p-1 text-green-600" v-if="this.board !== 'Done'">Done</button>
          <button @click="moveTo('Rejected')" class="m-1 border p-1 text-red-600" v-if="this.board !== 'Rejected'">Rejected</button>
        </div>
    </li>
</template>
<script>
import { ExternalLinkIcon, MoreHorizontalIcon } from 'vue-feather-icons'
export default {
  data () {
    return {
      isBig: false
    }
  },
  components: {
    ExternalLinkIcon, MoreHorizontalIcon
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    board: {
      type: String,
      default: () => ('Backlog')
    },
    itemId: {
      type: Number,
      default: () => (-1)
    }
  },
  computed: {
    imgClass () {
      return this.isBig ? 'w-13 h-13' : 'w-8 h-8 rounded-full'
    }
  },
  methods: {
    moveTo (destination) {
      this.$emit('updateTxt', this.itemId, destination)
    },
    more () {
      this.isBig = !this.isBig
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
