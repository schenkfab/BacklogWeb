<template>
<div class="w-full max-w-md text-center p-1" v-if="this.entities">
  <div :class="this.class">
    <p class="mb-2 text-gray-700 font-semibold font-sans tracking-wide">{{ title }}</p>
    <draggable
      tag="ul"
      class="w-full max-w-md"
      ghost-class="moving-card"
      :list="entities"
      :animation="200"
      :style="this.style"
      group="all"
      @change="onUpdate"
    >
      <card
        v-for="entity in entities"
        :data="entity.article"
        :key="entity.article.id"
        :board="title"
        :itemId="entity.id"
        @onEdit="triggerEdit"
        @onDelete="triggerDelete"
        @onExternalLink="triggerExternalLink"
        @updateTxt="updateTxt"
      ></card>
    </draggable>
  </div>
  </div>
</template>

<script>
import Card from '@/components/kanban/Card'
import Draggable from 'vuedraggable'
export default {
  components: {
    Card,
    Draggable
  },
  data () {
    return {
      data: null
    }
  },
  computed: {
    class: function () {
      return `w-full max-w-md text-center p-2 mb-4 bg-${this.color}-200 rounded-lg`
    },
    style: function () {
      if (this.title === 'Done' || this.title === 'Rejected') {
        return 'min-height:364px'
      } else {
        return 'min-height:800px'
      }
    }

  },
  props: {
    entities: {
      type: Array,
      default: () => (null)
    },
    group: {
      type: String,
      default: () => 'all'
    },
    title: {
      type: String,
      default: () => 'Column'
    },
    onDelete: {
      type: Function
    },
    onEdit: {
      type: Function
    },
    onExternalEdit: {
      type: Function
    },
    color: {
      type: String,
      default: () => 'Blue'
    }
  },
  methods: {
    triggerEdit (entity) {
      this.$emit('onEdit', entity)
    },
    triggerDelete (entity) {
      this.$emit('onDelete', entity)
    },
    triggerExternalLink (entity) {
      this.$emit('onExternalLink', entity)
    },
    updateTxt (id, destination) {
      this.$emit('updateTxt', id, destination)
    },
    onUpdate (event, x) {
      if (event.added) {
        this.$emit('onUpdate', event, this.title)
      }
    }
  }
}
</script>

<style>
</style>
