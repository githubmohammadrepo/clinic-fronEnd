<template>
    <div>
      <newOffice  />

    </div>
</template>

<script>
import newOffice from '~/components/office/newOffice'
  export default {
    components:{
      newOffice
    },

    computed: {
      todos () {
        return this.$store.state.counter
      }
  },
  }
</script>
