<template>
  <v-row justify="center" class="overflow-y-auto">
    <v-dialog ref="dialog" v-model="dialog" persistent max-width="600px">
      <v-alert
        border="right"
        :color="alertColor"
        dark
        align="center"
        v-if="showAlert"
        class="dir-rtl"
      >
        <v-btn
          color="indigo lighten-1"
          background-color="lime darken-4"
          class="float-right"
          @click="closeDialog"
        >x</v-btn>
        {{errorMessage}}
      </v-alert>

      <v-card color="cyan darken-4" class="orange--text" active-class v-if="!showAlert">
        <v-card-title align="center" color="pink lighten-2">
          <span class="headline mx-auto">
            <v-icon class="float-right px-2">mdi-hospital</v-icon>ثبت نام کلینیک جدید
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="isValid">
              <v-row>
                <!-- firstname -->
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    color="lime accent-4"
                    clearable
                    class="custome-error--text"
                    label="نام کلینیک"
                    hint="نام  کلینیک را وارد کنید"
                    required
                    :rules="[rules.firstName,rules.min3,rules.stringSpace,rules.charInvalid]"
                    counter
                    maxlength="28"
                    v-model="clinic.firstName"
                  ></v-text-field>
                </v-col>

                <!-- creator -->
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    color="lime accent-4"
                    clearable
                    class="custome-error--text"
                    label="موسس"
                    hint="نام موسس را وارد کنید"
                    :rules="[value => !!value || 'نام موسس باید وارد شود',rules.min3,rules.string,rules.charInvalid]"
                    counter
                    maxlength="38"
                    v-model="clinic.creator"
                  ></v-text-field>
                </v-col>

                <!-- statename -->
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    color="lime accent-4"
                    clearable
                    class="custome-error--text"
                    label="استان"
                    hint="استان خود را وارد کنید"
                    required
                    :rules="[v => !!v || 'نام استان باید وارد شود',rules.string,rules.min3,rules.charInvalid]"
                    counter
                    maxlength="32"
                    v-model="clinic.state"
                  ></v-text-field>
                </v-col>

                <!-- cityname -->
                <v-col cols="12" sm="6" md="6" class="d-r">
                  <v-text-field
                    color="lime accent-4"
                    clearable
                    class="custome-error--text"
                    label="نام شهر"
                    hint="نام  شهر را وارد کنید"
                    required
                    :rules="[v => !!v || 'نام شهر باید وارد شود',rules.string,rules.min3,,rules.charInvalid]"
                    counter
                    maxlength="28"
                    v-model="clinic.city"
                  ></v-text-field>
                </v-col>


                <!-- description -->
                <v-col cols="12">
                  <v-textarea
                    label="توضیحات"
                    placeholder="کلینیک ما در سه سال گذشته باعث شده ما دو بار به لندن سفر بکنیم"
                    auto-grow
                    color="lime accent-4"
                    class="custome-error--text"
                    :rules="[v => !!v || 'توشیحات باید وارد شود',rules.min,,rules.charInvalid]"
                    filled
                    counter
                    clearable
                    maxlength="1100"
                    v-model="clinic.charInvalid"

                  ></v-textarea>
                </v-col>

                <!-- phone -->
                <v-col cols="12">
                  <v-text-field
                    color="lime accent-4"
                    class="custome-error--text"
                    label="تلفن کلینیک"
                    hint=" تلفن کلینیک را وارد کنید"
                    required
                    :rules="[v => !!v || ' تلفن کلینیک باید وارد شود',rules.number,rules.min]"
                    counter
                    maxlength="18"
                    v-model="clinic.phone"
                    clearable
                  ></v-text-field>
                </v-col>

                <!-- mobile -->
                <v-col cols="12">
                  <v-text-field
                    color="lime accent-4"
                    class="custome-error--text"
                    clearable
                    label="تلفن همراه"
                    hint="تلفن همراه دکتر را وارد کنید"
                    required
                    :rules="[v => !!v || ' تلفن همراه باید وارد شود',rules.number,rules.min]"
                    counter
                    maxlength="15"
                    v-model="clinic.mobile"
                  ></v-text-field>
                </v-col>

                <!-- startWork -->
                <v-col md="6" sm="12">
                  <v-text-field
                    color="lime accent-4"
                    class="custome-error--text"
                    label=" شروع نوبت کاری"
                    value="12:30:00"
                    type="time"
                    hint="شروع نوبت کاری"
                    append-icon
                    suffix="PST"
                    :rules="[v => !!v || ' نوبت کاری باید وارد شود']"
                    counter
                    maxlength="6"
                    v-model="clinic.startWork"
                  ></v-text-field>
                </v-col>

                <!-- endWorkd -->
                <v-col  md="6" sm="12">
                  <v-text-field
                    color="lime accent-4"
                    class="custome-error--text"
                    label=" پایان نوبت کاری"
                    value="12:30:00"
                    hint="پایان نوبت کاری"
                    type="time"
                    append-icon
                    suffix="PST"
                    :rules="[v => !!v || ' نوبت کاری باید وارد شود']"
                    counter
                    maxlength="6"
                    v-model="clinic.endWork"
                  ></v-text-field>
                </v-col>

                <!-- password -->
                <v-col cols="12">
                  <v-text-field
                    color="lime accent-4"
                    class="input-group--focused custome-error--text"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min,rules.max]"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-2"
                    label="رمز عبور"
                    hint="حداقل 8 کاراکتر را وارد کنید"
                    v-model="clinic.password"
                    @click:append="show2 = !show2"
                  ></v-text-field>
                </v-col>


                <!-- credential clinic image -->
                <v-col cols="12">
                  <template>
                    <v-file-input
                      color="lime accent-4"
                      class="custome-error--text"
                      prepend-icon="mdi-camera"
                      label="اسکن مجوز مطب"
                      required
                      :rules="rules.fileRules"
                      show-size
                      counter
                      accept="image/*;capture=camera"
                      v-model="clinic.credential"
                    ></v-file-input>
                  </template>
                </v-col>

                <!-- credential clinic image -->
                <v-col cols="12">
                  <template>
                    <v-file-input
                      color="lime accent-4"
                      class="custome-error--text"
                      prepend-icon="mdi-camera"
                      label="اسکن کارت ملی"
                      required
                      :rules="rules.fileRules"
                      show-size
                      counter
                      accept="image/*;capture=camera"
                      v-model="clinic.nationalCard"
                    ></v-file-input>
                  </template>
                </v-col>



              <!-- owner type -->
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    color="lime accent-4"
                    class="custome-error--text"
                    :items="['حقوقی','حقیقی']"
                    label="نوع مالکیت"
                    :rules="[v => !!v || ' تخصص باید وارد شود',rules.stringSpace,rules.charInvalid]"
                    counter
                    maxlength="25"
                    v-model="clinic.owner"
                  ></v-autocomplete>
                </v-col>

                <!-- discount code -->
                <v-col cols="12" sm="6" md="6" class="d-r">
                  <v-text-field
                    color="lime accent-4"
                    clearable
                    class="custome-error--text"
                    label="نام شهر"
                    hint="نام  شهر را وارد کنید"
                    required
                    :rules="[v => !!v || 'نام شهر باید وارد شود',rules.stringSpace,rules.min3,rules.charInvalid]"
                    counter
                    maxlength="28"
                    v-model="clinic.city"
                  ></v-text-field>
                </v-col>

              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <!-- <v-spacer></v-spacer> -->
          <v-btn
            color="red darken-1"
            background-color="pink darken-1"
            class="mx-auto"
            width="30%"
            @click="closeDialog"
          >Close</v-btn>
          <v-btn
            color="deep-orange"
            active-class="light-green accent-3"
            class="mx-auto"
            grow
            width="30%"
            @click="saveNewClinic"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="createStatus" max-width="65px">
      <v-card height="65">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      fab: true,
      show2: true,
      password: "Password",
      rules: {
        required: value => !!value || "فیلد باید پر شود.",
        min: value =>
          !value || value.length >= 8 || "حداقل هشت کاراکتر را وارد کنید",
        max: vl =>
          vl.length < 30 || "بیشترین کاراکتر نباید بیشتر از 30 کاراکتر باشد",
        fileRules: [
          value => !!value || "عکس مجوز مطب الزامی است!",
          value =>
            !value || value.size < 3000000 || "عکس باید کمتر از 3 مگابایت باشد",
          value =>
            !value ||
            RegExp("image/[a-z]{3,}", "gmi").test(value.type) ||
            "نوع فایل باید حتما عکس باشد"
        ],
        firstName: value => !!value || "نام باید وارد شود",
        min3: value => !value || value.length >= 3 || "باید حداقل 3 حرف باشد",
        string: value => {
          const regex = /([\d\s]+)/gim;
          let exec = regex.exec(value) == null;
          console.log(exec);
          return exec || "باید فقط حروف وارد شود";
        },
        stringSpace: value => {
          const regex = /([\d]+)/gim;
          let exec = regex.exec(value) == null;
          console.log(exec);
          return exec || "باید فقط حروف وارد شود";
        },
        number: value => {
          const regex = /([\D\s]+)/gim;
          let exec = regex.exec(value) == null;
          console.log(exec);
          return exec || "باید فقط عدد وارد شود";
        },
        charInvalid: value => {
          const regex = /([!@#$%^&*()_+<>?\/]{2,})/gim;
          let exec = regex.exec(value) == null;
          console.log(exec);
          return exec || "فقط کاراکتر های مجاز وارد کنید";
        }
      },
      v: "",
      clinic: {
        firstName: "",
        creator: "",
        phone: "",
        mobile: "",
        owner: "",
        city: "",
        startWork: "",
        endWork: "",
        nationalCard: null,
        credential: null,
        password: "",
        state: "",
        descripton:""
      },
      isValid: true,

      errorMessage: null,
      alertColor: null
    };
  },
  computed: {
    dialog: {
      get() {
        return this.$store.state.clinic.showNewClinicForm;
      },
      set(value) {
        this.$store.commit("clinic/openNewClinicForm");
      }
    },
    createStatus() {
      let status = this.$store.getters["clinic/getName"];
      console.log(status);
      if (status.start == true && status.end == false) {
        console.log(1);
        this.errorMessage = "ثبت مطب جدید با خطا مواجه شد";
        this.alertColor = "pink";
        return true;
      } else if (status.start == false && status.end == true) {
        console.log(2);
        this.errorMessage = "مطب جدید با موفقیت ثبت شد";
        this.alertColor = "success";
        return false;
      } else if (status.start == true && status.end == true) {
        console.log(3);
        this.errorMessage = null;
        this.alertColor = "white";
        return false;
      } else {
        this.errorMessage = "ثبت مطب جدید با خطا مواجه شد";
        this.alertColor = "pink";
        return false;
      }
    },
    showAlert() {
      return this.$store.state.clinic.showAlert;
    }
  },

  methods: {
    closeDialog() {
      this.$store.commit("clinic/closeNewClinicForm");
    },
    openDialog() {
      this.$store.commit("clinic/openNewClinicForm");
    },
    // save clinic
    saveNewClinic() {
      this.$store.dispatch("clinic/createNewClinic", "one");
    }
  }
};
</script>


<style lang="scss">
.custome-error--text.error--text,
.custome-error--text .error--text {
  color: #db8008 !important;
  caret-color: #8b2121 !important;
}

.dir-rtl {
  direction: rtl !important;
}
</style>

