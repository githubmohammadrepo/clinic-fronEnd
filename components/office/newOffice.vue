<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">

      <v-card color="grey darken-4">
        <v-card-title  align="center">
          <span class="headline mx-auto">ثبت نام مطب جدید</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="isValid">

              <v-row >

                <!-- firstname -->
                <v-col cols="12" sm="6" md="6" >
                  <v-text-field
                  clearable
                  label="نام"
                  hint="نام  خود را وارد کنید"
                  required
                  :rules="[value => !!value || 'نام باید وارد شود']"
                  counter
                  maxlength="28"
                  v-model="office.firstName"
                  >

                  </v-text-field>
                </v-col>

                <!-- lastname -->
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                  clearable
                  label="نام خانوادگی"
                  hint="نام خانوادگی خود را وارد کنید"
                  :rules="[value => !!value || 'نام خانوادگی باید وارد شود']"
                  counter
                  maxlength="38"
                  v-model="office.lastName"
                  >

                  </v-text-field>
                </v-col>

                <!-- statename -->
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                  clearable
                  label="استان"
                  hint="استان خود را وارد کنید"
                  required
                 :rules="[v => !!v || 'نام استان باید وارد شود']"
                  counter
                  maxlength="32"
                  v-model="office.state"
                  >
                  </v-text-field>
                </v-col>

                <!-- cityname -->
                <v-col cols="12" sm="6" md="6" class="d-r">
                  <v-text-field
                  clearable label="نام شهر"
                  class="d-r float-right"
                  hint="نام  شهر را وارد کنید"
                  required
                 :rules="[v => !!v || 'نام شهر باید وارد شود']"
                  counter
                  maxlength="28"
                  v-model="office.city"
                  >

                  </v-text-field>
                </v-col>


                <!-- phone -->
                <v-col cols="12">
                  <v-text-field
                  clearable
                  label="تلفن مطب"
                  hint=" تلفن مطب را وارد کنید"
                  required
                 :rules="[v => !!v || ' تلفن مطب باید وارد شود']"
                  counter
                  maxlength="18"
                  v-model="office.phone">
                  </v-text-field>
                </v-col>

                <!-- mobile -->
                <v-col cols="12">
                  <v-text-field
                  clearable
                  label="تلفن دکتر"
                  hint="تلفن همراه دکتر را وارد کنید"
                  required
                  :rules="[v => !!v || ' تلفن مطب باید وارد شود']"
                  counter
                  maxlength="15"
                  v-model="office.mobile">
                  </v-text-field>
                </v-col>

                <!-- startWork -->
                <v-col cols="6">
                  <v-text-field
                    label="نوبت کاری"
                    value="12:30:00"
                    type="time"
                    hint="شروع نوبت کاری"
                    append-icon
                    suffix="PST"
                    :rules="[v => !!v || ' نوبت کاری باید وارد شود']"
                    counter
                    maxlength="6"
                    v-model="office.startWork"
                  ></v-text-field>
                </v-col>

              <!-- endWorkd -->
                <v-col cols="6">
                  <v-text-field
                    label="نوبت کاری"
                    value="12:30:00"
                    hint="پایان نوبت کاری"
                    type="time"
                    append-icon
                    suffix="PST"
                    :rules="[v => !!v || ' نوبت کاری باید وارد شود']"
                    counter
                    maxlength="6"
                    v-model="office.endWork"
                  ></v-text-field>
                </v-col>


                <v-col cols="12" >
                  <v-text-field
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min,rules.max]"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-2"
                    label="رمز عبور"
                    hint="حداقل 8 کاراکتر را وارد کنید"
                    v-model="office.password"
                    class="input-group--focused"
                    @click:append="show2 = !show2"
                  ></v-text-field>
                </v-col>



                <v-col cols="12" sm="6">
                  <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="سن"
                    required
                    :rules="[v => !!v || ' سن باید وارد شود']"
                    counter
                    maxlength="5"
                    v-model="office.age"
                  ></v-select>
                </v-col>


                <v-col cols="12" sm="6">
                  <v-autocomplete
                    :items="['عمومی', 'متخصص', 'متخصص چشم','متخصص قلب و عروق','متخصص مغز و اعصاب','متخصص اعصاب و روان','متخصص بیهوشی','متخصص زیبایی','متخصص فیزیوتراپی','متخصص داخلی','متخصص گوش','متخصص استخوان','متخصص جنسی']"
                    label="Interests"
                    :rules="[v => !!v || ' تخصص باید وارد شود']"
                    counter
                    maxlength="25"
                    v-model="office.profission"
                  ></v-autocomplete>
                </v-col>



                <!-- credential office image -->
                <v-col cols="12">
                    <template>
                      <v-file-input
                      prepend-icon="mdi-camera"
                      label="اسکن مجوز مطب"
                      required
                      counter
                      :rules="[
                        value => !!value || 'عکس مجوز مطب الزامی است!',
                        v =>  v.size < 3000000 || 'عکس باید کمتر از 3 مگابایت باشد',
                        val => (RegExp('image/[a-z]{3,}','gmi').test(val.type) || 'نوع فایل باید حتما عکس باشد'),
                      ]"
                      show-size
                      accept="image/*"
                      v-model="office.credential"
                      >
                      </v-file-input>

                    </template>
                </v-col>


                <!-- <v-col cols="12" >

                  <template>
                    <v-file-input
                    prepend-icon="mdi-camera"

                    show-size
                    counter

                    label="اسکن کارت ملی"
                    :rules="[
                        vle => !!vle || 'عکس کارت ملی الزامی است',
                        va =>  va.size < 3000000 || 'عکس باید کمتر از 3 مگابایت باشد',
                        val => {
                          return (RegExp('image/[a-z]{3,}','gmi').test(val.type) || 'نوع فایل باید حتما عکس باشد');
                        },
                      ]"

                      accept="image/*"
                      v-model="office.nationalCard">
                    </v-file-input>
                  </template>
                </v-col> -->


              </v-row>
            </v-form>

          </v-container>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" text @click="openDialog">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import newClinickVue from "../newClinick.vue"

  export default({
    computed:{
      dialog:{
        get(){
           return  this.$store.state.counter
        },
        set(value){
          this.$store.commit('openDialog')
        }
      },
    },
    methods:{

      closeDialog(){
        this.$store.commit('closeDialog');
      },
      openDialog(){
        this.$store.commit('openDialog');
      },


    },
    data () {
      return {
        show2: true,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'حداقل هشت کاراکتر را وارد کنید',
          max: vl => vl.length < 30 || 'بیشترین کاراکتر نباید بیشتر از 30 کاراکتر باشد',

          },
          v:'',
        office:{
          firstName:'',
          lastName:'',
          phone:'',
          mobile:'',
          profission:'',
          city:'',
          startWork:'',
          endWork:'',
          nationalCard:'',
          credential:'',
          password:'',
          state:''
      },
        isValid:true,
      }
    },

  })
</script>


<style lang="scss">


</style>

