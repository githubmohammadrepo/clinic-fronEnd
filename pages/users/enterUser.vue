<template>
  <v-row>
    <v-col md="6" sm="12" class="mx-auto">
          <v-bottom-navigation
            color="purple lighten-1"
          >
            <v-btn @click="showLogin">
              <span>ورود</span>
              <v-icon>mdi-login</v-icon>
            </v-btn>

            <v-btn @click="showRegister">
              <span>ثبت نام</span>
              <v-icon>mdi-account</v-icon>
            </v-btn>

          </v-bottom-navigation>
      <v-card>
        <v-card-title primary-title >
          {{showRegisterForm==true ? 'Register User' : 'Login User'}}
        </v-card-title>

        <v-card-text>
          <register v-if="showRegisterForm" />
          <login v-else />
        </v-card-text>
      </v-card>
    </v-col>

  </v-row>
</template>


<script>
import register from '~/components/users/register'
import login from '~/components/users/login'
export default {
  components:{
    register,
    login,
  },
  data(){
    return {
      showRegisterForm:true,
    }
  },
  methods: {
    showLogin(){
      this.showRegisterForm=false;
    },
    showRegister(){
      this.showRegisterForm = true;
    }
  },
}
</script>
