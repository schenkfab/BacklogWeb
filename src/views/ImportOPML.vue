<template>
  <div class="container mx-auto items-center justify-center mb-8">
    <BaseTitle>Add OPML XML</BaseTitle>
    <p class="mb-4 text-center">
      Adding all the feeds and collections contained in a Feedly OPML XML file.<br><br>
      <b>Note: As we go and check each of the feeds in the XML, this might take a lot of time.</b>
    </p>
    <ImportXML />
  </div>
</template>

<script>
import ImportXML from '@/components/Feed/ImportXML'

export default {
  components: {
    ImportXML
  },
  data: () => {
    return {}
  }
}
</script>
