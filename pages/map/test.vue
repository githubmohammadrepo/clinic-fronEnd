<template>
  <div>
    <input class="input" ref="searchTextField" type="text">
  </div>
</template>


<script>
const apiKey ="AIzaSyAPSGC8owCqbQ2S1mSHCjy5-DEpjVrFV08"; // Package: @nuxtjs/dotenv
export default {
  head() {
    return {
      script: [
        {src: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
      ]
    };
  },
  methods: {

  },
  mounted() {
    var input = this.$refs.searchTextField; //.getElementById('searchTextField');
    new google.maps.places.Autocomplete(input);
  },
  data() {
    return {};
  }
};

</script>
