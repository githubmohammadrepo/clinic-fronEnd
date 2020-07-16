<template>
    <div>
      <newOffice  />
      <newClinic  />
      <v-list>
        <v-list-item
          v-for="item in lists"
          :key="item.text"
          @click="makeItDone(item)"
        >
          <v-list-item-icon>
            <v-icon v-if="item.done" color="pink">mdi-star</v-icon>

            <v-icon v-if="!item.done" color="gray">mdi-star</v-icon>
          </v-list-item-icon>


          <v-list-item-content>
            <v-list-item-title text-md-center v-text="item.text"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>
        </v-list-item>
    </v-list>




      <v-form>
        <v-row>
          <v-col>
            <v-form v-model="isValid">
              <v-text-field
                v-model="data"
                single-line
                :rules="[value => !!value || 'value is required']"
              ></v-text-field>
              <v-btn @click="add" small elevation="" color="pink">add</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-form>



    </div>
</template>

<script>
import newOffice from '~/components/office/newOffice'
import newClinic from '~/components/clinic/newClinic'
  export default {
    components:{
      newOffice,
      newClinic
    },
  data(){
    return {
      data:"",

      isValid:null
    }
  },
    computed: {
      lists(){
        return this.$store.state.admin.list;
      },

    },
    methods:{
      add(){
        if(this.isValid){
          this.$store.commit('admin/add',this.data)
          this.data = ""
        }
      },
      makeItDone(item){
        this.$store.commit('admin/makeDone',item)
      }
    }
  }
</script>
