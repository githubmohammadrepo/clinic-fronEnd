<template>
<div>
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
      :error="getErrors['name'] !=null"
      class="custome-error--text red--text"
      color="pink"
      :error-messages="Object.keys(getErrors).length>0 ? (getErrors['name'] !=null ? getErrors['name'] : null) : null"
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="rules.emailRules"
      label="ایمیل"
      required
      :error="getErrors['email'] !=null"
      class="custome-error--text red--text"
      color="pink"
      :error-messages="Object.keys(getErrors).length>0 ? (getErrors['email'] !=null ? getErrors['email'] : null) : null"
    ></v-text-field>


    <v-text-field
      v-model="password"
      :rules="[rules.passwordRules,rules.charInvalid]"
      label="رمز عبور"
      required
      :error="getErrors['name'] !=null"
      class="custome-error--text red--text"
      color="pink"
      :error-messages="Object.keys(getErrors).length>0 ? (getErrors['password'] !=null ? getErrors['password'] : null) : null"

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


  <h2>{{dialog}}- {{authData}}</h2>



  <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline" v-if="getEndProcess">{{getErrorMessage ==null ? 'success' : 'error'}}</v-card-title>

        <v-card-title class="headline" v-if="getStartProcess">
          <v-progress-linear
            indeterminate
            color="teal"
          ></v-progress-linear>
        </v-card-title>

        <v-card-text v-if="getEndProcess">
          {{getErrorMessage ==null ? getSuccessMessage : getErrorMessage}}
        </v-card-text>


        <v-card-actions>
          <v-spacer></v-spacer>



          <v-btn
            color="green darken-1"
            text
            @click="closeDialog"
          >
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
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
      submit(){
        let form = {
          'name': this.name,
          'email': this.email,
          'password': this.password,
          'password_confirmation': this.rePassword
        };

        return this.$store.dispatch('auth/registerAuth',{...form});
      },
      closeDialog(){
        this.$store.commit("auth/closeDialog")
      }

    },
    computed:{
      dialog(){
        return this.$store.getters['auth/getShowDialog']
      },
      authData(){
        return this.$store.getters['auth/authData'];
      },
      getErrors(){
        return this.$store.getters['auth/getErrors'];
      },
      getSuccessMessage(){
        return this.$store.getters['auth/getSuccessMessage'];
      },
      getErrorMessage(){
        return this.$store.getters['auth/getErrorMessage'];
      },
      getStartProcess(){
        return this.$store.getters['auth/getStartProcess'];
      },
      getEndProcess(){
        return this.$store.getters['auth/getEndProcess'];
      }
    }
  }
</script>


<style scoped>
  .custome-error--text.error--text,
  .custome-error--text .error--text {
    color: #db8008 !important;
    caret-color: #8b2121 !important;
  }
  .v-input__control >>> *,.v-messages__message {
    color: red !important;
  }
  .input-group__input *{
  color: rgba(0,0,0,0.87) !important
  }
</style>
