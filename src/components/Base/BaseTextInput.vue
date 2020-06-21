<template>
  <input type="text" class="border p-1 m-1 rounded-md" v-bind:value="value" v-on:input="updateValue($event.target.value)">
</template>
<script>
export default {
  props: {
    value: {
      type: String
    }
  },
  methods: {
    updateValue (val) {
      console.log(val)
      this.$emit('input', val)
    }
  }
}
</script>
