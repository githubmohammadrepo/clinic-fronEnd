<template>
    <v-row>
      <v-col cols="12" >

      <v-card>
        <v-card-text>

      <h2>Auth user</h2>
      <ul>
        <li>{{authData}}</li>
      </ul>
      <v-btn color="success" @click="getUsers">getUsers</v-btn>

        </v-card-text>
      </v-card>
    </v-col>


    <v-col cols="6" v-for="user in users" :key="user.id">
      <v-card color="teal"  dark >
        <v-card-title
          class="headline"
          v-text="user.name"
        ></v-card-title>

        <v-card-subtitle v-text="user.email"></v-card-subtitle>
      </v-card>
    </v-col>

  </v-row>
</template>


<script>
import Cookie from 'js-cookie'
import axios from 'axios'

const myaxios = axios.create({
  // ...
})
myaxios.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    console.log(error)
  }
)
export default {
  async asyncData({ $axios }) {
    const ip = await myaxios.get('http://localhost:80/api/test')
    return {users:ip}
  },
  components:{

  },
  data(){
    return {

    }
  },
  methods:{
    getUsers(){

    }
  },
  computed:{
    authData(){

      return this.$store.getters['auth/authData'];

    }
  }

}
</script>
