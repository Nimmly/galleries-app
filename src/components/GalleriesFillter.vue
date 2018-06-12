<template>
  <div>
    <b-input
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Find Gallery"
      @input="emitInputChangeEvent"
    />
  </div>
</template>

<script>
export default {
  name: 'GalleriesFillter',
  methods: {
    emitInputChangeEvent(term) {
      this.$emit('search-term-change', term)
    }
  }
}
</script>