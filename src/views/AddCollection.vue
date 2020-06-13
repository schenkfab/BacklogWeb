<template>
  <div class="container mx-auto items-center justify-center" v-if="this.getUser.initialized">
    <BaseTitle>Add Collection</BaseTitle>
    <p class="mb-4">Everyone has by default one collection which is private. It is being created during registration and is called "My Collection".
    </p>
    <p class="mb-8">
    In addition to that, Backlog allows users to create several private and public collections which can be shared across the platform.<br>
    If you create a public collection, other users can see the collection and follow it but will not be able to edit it.
    </p>
    <add-collection></add-collection>
  </div>
</template>

<script>
import AddCollection from '@/components/Collection/AddCollection'
import { mapGetters } from 'vuex'

export default {
  components: {
    AddCollection
  },
  data: () => {
    return {}
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>
