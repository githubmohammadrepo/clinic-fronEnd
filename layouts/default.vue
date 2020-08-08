<template>
  <v-app id="inspire" v-show="showPage">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      right
    >
      <v-list dense
      align="center"
      >
        <template v-for="item in filtedItems">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
            align="center"
          >

            <template v-slot:activator >
              <v-list-item-content
              >
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link

              @click="actionButton(child)"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            link
            @click="sidebarBtnAction(item)"
          >
            <v-list-item-action >
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-right="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Google Contacts</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn
        icon
        large
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          ></v-img></v-avatar>
      </v-btn>

    </v-app-bar>
    <v-main >
      <v-container
        class="fill-height"
        fluid

        @click.stop="hideDrawer"
      >
          <nuxt />
      </v-container>
    </v-main>

    <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      @click="dialog = !dialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

  </v-app>
</template>

<script>
import register from '~/components/users/register'
import login from '~/components/users/login'

export default {
  components:{
    register,
    login
  },
  props: {
    source: String,
  },
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: 'mdi-account', text: 'ورود',identity:"login" },
      { icon: 'mdi-login', text: 'ثبت نام',identity:"signup" },
      { icon: 'mdi-logout', text: 'خروج',identity:"logout" },
      { icon: 'mdi-contacts', text: 'کاربران' },
      { icon: 'mdi-history', text: 'تعیین زمانبندی' },
      { icon: 'mdi-message', text: 'ارسال پیامک' },
      { icon: 'mdi-doctor', text: 'پزشکان' },
      { icon: 'mdi-hospital', text: 'کلینیک ها' },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'افزودن مشتری جدید',
        model: false,
        children: [
          { icon: 'mdi-doctor', text: 'مطب جدید' ,identity:"new-office"},
          { icon: 'mdi-hospital', text: 'کلینیک جدید',identity:"new-clinic" },
          { icon: 'mdi-account-star', text: 'نمایندگی جدید',identity:"new-agency" },
        ],
      },


    ],
  }),
  computed: {
    filtedItems(){
      return this.items.filter((item)=>{
        if(item.identity=='login'){
          return this.showLoginLink;
        }else if(item.identity=='signup'){
          return this.showRegisterLink;
        }else if(item.identity=='logout'){
          return this.showExitLink;
        }else{
          return true;
        }
      })
    },
    showPage(){
      return this.$store.state.auth.showPageContent;
    },
    showLoginLink(){
      if(Object.keys(this.$store.getters['auth/authData']).length){
        return false;
      }else{
        return true;
      }
    },
    showRegisterLink(){
      if(Object.keys(this.$store.getters['auth/authData']).length){
        return false;
      }else{
        return true;
      }
    },
    showExitLink(){
      if(Object.keys(this.$store.getters['auth/authData']).length){
        return true;
      }else{
        return false;
      }
    }

  },
  methods:{
    hideDrawer(){
      this.drawer=false;

    },
    actionButton(child){
      if(child.identity=="new-office"){

        this.$store.commit('office/openNewOfficeForm')

      }else if(child.identity=="new-clinic"){

        this.$store.commit('clinic/openNewClinicForm')

      }else if(child.identity=="new-agency"){

        this.$store.commit('agency/openNewAgencyForm')

      }else {

      }
    },
    sidebarBtnAction(item){
      if(item.identity=='login'){
        this.$router.push('/users/enterUser')
      }else if(item.identity=="signup"){
        this.$store.commit('user/openNewUserForm')
      }else if(item.identity=="logout"){
        this.$store.commit('auth/clearAuth')
        this.$router.push('/users/enterUser')
      }
      else{

      }
    }
  }
}
</script>
