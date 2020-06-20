<template>
  <button class="border p-2 rounded-md text-sm hover:bg-pink-400 hover:text-white font-semibold" @click="doClick"><slot /></button>
</template>
<script>
export default {
  props: ['click'],
  methods: {
    doClick: function () {
      this.$emit('click')
    }
  }
}
</script>
