<template>
  <v-container grid-list-xs>

    <v-row align="center">
      <v-col class="mx-auto" md="3">
        <v-btn block color="primary" @click="increment" dark>Increment</v-btn>
      </v-col>

      <v-col class="mx-auto" md="3">
        <v-btn block color="teal">count: {{count}}</v-btn>
      </v-col>

      <v-col class="mx-auto" md="3">
        <v-btn block color="pink"  @click="decrement" dark>Decrement</v-btn>
      </v-col>

      <v-col class="mx-auto" md="3">
        <v-btn block color="pink"  @click="getUsers" dark>get Users</v-btn>
      </v-col>
    </v-row>

    <v-row align="center" color="primary">
      <v-col cols="8" class="mx-auto">
        <v-card color="teal lighten-4" light>
      <v-card-title primary-title class="text-center">
        login
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            name="name"
            label="label"
            value="admin"
            single-line
          ></v-text-field>


           <v-text-field
            name="name"
            label="label"
            value="admin@gmail.com"
            single-line
          ></v-text-field>

          <v-btn block color="success darken-2" @click="login" dark>Login</v-btn>
        </v-form>


      </v-card-text>
    </v-card>
      </v-col>
    </v-row>
    <p>auth: {{auth}}</p>
    <ul>
      <li v-for="user in users" :key="user.id">{{user.name}}</li>
    </ul>
  </v-container>


</template>


<script>
export default {
  data(){
    return {
      email:'admin@gmail.com',
      password:'mohammad',

      users:Array()
    }
  },
  middleware:'inspire',
  computed: {
    count() {
      return this.$store.state.auth.count;
    },
    auth(){
      return this.$store.state.auth.auth;
    },
  },
  methods: {
    increment() {
      this.$store.commit('auth/increment');
    },
    decrement() {
      this.$store.commit('auth/decrement');
    },
    login(){
      this.$store.dispatch('auth/loginAuth',{email:this.email,password:this.password})
    },
    async getUsers(){
      this.$axios.setToken(this.auth.access_token, 'Bearer')
      let users = await this.$axios.$get('http://localhost:80/api/auth/users');
      users = users.data;
      this.users = users;
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
