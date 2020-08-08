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
      <v-card color="teal" dark >
        <v-card-title
          class="headline"
          v-text="user.name"
        ></v-card-title>

        <v-card-text>
          <p>{{user.id}}</p>
          <p>{{user.email}}</p>
        </v-card-text>

      </v-card>
    </v-col>

  </v-row>
</template>


<script>
import Cookie from 'js-cookie'
import axios from '~/assets/js/axios'


export default {
  middleware:['users/homePage'],
  async fetch() {
    // Adds header: `Authorization: 123` to all requests
    let users = await this.$axios.$get('http://localhost:80/api/auth/users',{
      headers: {
        Authorization: 'Bearer ' + this.authData.access_token //the token is a variable which holds the token
      }
    })
    this.users =users.data;
  },
  fetchOnServer: false,
  components:{

  },
  data(){
    return {
      users:{}
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
  },


}
</script>
