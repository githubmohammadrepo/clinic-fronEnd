<template>
  <div class="flex h-screen bg-light items-center justify-center">
      <h1 class="font-semibold mb-2 text-xl">
        Login
      </h1>
    <form ref="loginform" @submit.prevent="login()" class="w-1/4 mx-auto p-4">
      <div class="mb-4">
        <label for="email" class="block mb-1 text-sm">Email</label>
        <input
          type="email"
          name="email"
          class="w-full border rounded px-3 py-2"
          required
          v-model="email"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block mb-1 text-sm">Password</label>
        <input
          type="password"
          name="password"
          class="w-full border rounded px-3 py-2"
          required
          v-model="password"
        />
      </div>
      <div class="submit">
        <button
        type="submit"
        class="bg-blue-500 text-white font-semibold py-2 px-10 w-full rounded"
      >
        Login
      </button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        error: {},
        email:'',
        password:''
      };
    },
    mounted() {
      // Before loading login page, obtain csrf cookie from the server.

    },
    methods: {
      async login() {
        let form = {email:this.email,password:this.password}
        this.error = {};
        try {
          // Prepare form data
          this.$axios.get('http://localhost:80/sanctum/csrf-cookie')
           this.$axios.post('http://localhost:80/login',form)
           .then(data => {
            console.log(data)
          }).catch(function (error) {
          // handle error
          console.log(error);
        })




        }

        catch (err) {
          this.error = err;
          // do something with error
        }
      },
    },
  };
</script>

<style scoped lang="scss">
.bg-light{
  text-align: center;
  background:rgb(73, 61, 61) !important;
  & form  {
    text-align: left;
    padding:12px 12px;
    width: 50%;
    margin: auto;
    background-color: rgb(126, 49, 49) !important;
    & input,& input:hover & input:active{
      width:100%;
      border:1px solid yellow;
      border-color:green;
      box-shadow:green;
    }

    & div.submit{
      display: flex;
      & button[type="submit"]{
        margin:auto;
        background-color: cyan;
      }
    }
  }
}
</style>
