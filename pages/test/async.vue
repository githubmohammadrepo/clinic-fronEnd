<template>
  <v-row>
    <v-col sm="4" md="3" v-for="post in posts" :key="post.id">

      <v-card>
        <v-card-title color="pink darken-4" primary-title>
          {{post.title}}
        </v-card-title>

        <v-card-text>
          {{post.body}}
        </v-card-text>
      </v-card>

    </v-col>
  </v-row>
</template>



<script>
import axios from "axios";
export default {
  // asyncData({
  //   isDev,
  //   route,
  //   store,
  //   env,
  //   params,
  //   query,
  //   req,
  //   res,
  //   redirect,
  //   error
  // }) {

  //   return axios.get(`https://jsonplaceholder.typicode.com/posts`)
  //    .then(response => {
  //      let result = response.data;
  //         for (const value in result) {
  //           result[value].title = result[value].title.substr(0,18)+' ...'
  //           result[value].body = result[value].body.substr(0,55)+' ...'
  //         }
  //         return {posts:result}
  //       })
  //    .catch(e => {
  //      console.log(e)
  //    })


  // },

  computed: {
    // posts(){
    //   return this.$store.getters['test/getPosts']
    // }
  },

  created() {
    // this.$store.dispatch('test/fetchPosts')
  },
  }



</script>
