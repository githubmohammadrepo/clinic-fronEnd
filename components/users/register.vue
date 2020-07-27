<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="rules.nameRules"
      label="نام"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="rules.emailRules"
      label="ایمیل"
      required
    ></v-text-field>


    <v-text-field
      v-model="password"
      :rules="[rules.passwordRules,rules.charInvalid]"
      label="رمز عبور"
      required
    ></v-text-field>


    <v-text-field
      v-model="rePassword"
      :rules="[rules.repasswordRules,rules.charInvalid]"
      label="تکرار رمز عبور"
      required
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-row>
      <v-col align="center">
        <v-btn
          :color="valid ? 'success' : 'pink'"
          class="mr-4"
          @click.prevent="submit"
        >
          submit
        </v-btn>
      </v-col>
    </v-row>




  </v-form>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      email: '',
      password: '',
      rePassword: '',

      rules:{
         nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: v => !!v || 'password is required',

        repasswordRules:v => !!v || 'retry password is required',

        charInvalid: value => {
          const regex = /([!@#$%^&*()_+<>?\/]{2,})/gim;
          let exec = regex.exec(value) == null;
          console.log(exec);
          return exec || "فقط کاراکتر های مجاز وارد کنید";
        }
      },

      checkbox: false,
    }),

    methods: {

     async submit () {
       let form = {
         'name': this.name,
         'email': this.email,
         'password': this.password,
         'password_confirmation': this.rePassword,
       }


       try {
        let res = await this.$axios.$post('http://localhost:80/api/auth/register',{...form})
        console.log(res)
       } catch (error) {
         console.log(res)
       }
      },

    },
  }
</script>
