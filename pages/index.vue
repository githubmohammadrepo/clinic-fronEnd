<template>
  <div>
    <h2>Auth user</h2>
    <ul>
      <li>{{authData}}</li>
    </ul>


    <v-btn color="success" @click="getUsers">getUsers</v-btn>
  </div>
</template>


<script>
export default {
  components:{

  },
  data(){
    return {

    }
  },
  methods:{
    async getUsers(){
      let res = await this.$axios.$get('http://localhost:80/api/auth/user',{'_token':this.authData.access_token})
      console.log(res)
    }
  },
  computed:{
    authData(){

      return this.$store.getters['auth/authData'];

    }
  },

}
</script>
