<template>

    <div class="md:flex md:items-center mb-6 w-full">
  <form class="w-full">
  <div class="md:flex md:items-center mb-6 flex">
    <div class="md:w-1/6">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Name
      </label>
    </div>
    <div class="md:w-5/6">
      <input v-model="name" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="My Collection">
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div  class="md:w-1/6">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
        Description
      </label>
    </div>
    <div  class="md:w-5/6">
      <input v-model="description" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-username">
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/6"></div>
    <label class="md:w-2/3 block text-gray-500 font-bold">
      <input class="mr-2 leading-tight" type="checkbox" v-model="isPrivate">
      <span class="text-sm">
        Make this collection private!
      </span>
    </label>
  </div>
  <div class="md:flex md:items-center">
    <div class="md:w-1/6"></div>
    <div class="md:w-2/3">
      <button @click="addCollection" class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        Add Collection
      </button>
    </div>
  </div>
</form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => {
    return {
      name: null,
      isPrivate: false,
      description: null,
      error: false
    }
  },
  methods: {
    ...mapActions(['addCollectionAsync']),
    async addCollection () {
      await this.addCollectionAsync({ name: this.name, description: this.description, isPrivate: this.isPrivate })
    },
    discardError () {
      this.error = false
    }
  }
}
</script>

<style>
</style>
