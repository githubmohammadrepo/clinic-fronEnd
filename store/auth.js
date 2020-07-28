export const state = () => ({
  auth:{},
  showDialog: false,
  errors: {},
  errorMessage: null,
  successMessage: null,

  startProcess: false,
  endProcess: false,

})

// commit action
export const mutations = {
  add (state, authData) {
    state.auth = authData;
    //store auth user to local storage
    if(process.client){
      localStorage.setItem('access_token',authData.access_token )
      localStorage.setItem('token_type',authData.token_type )
      localStorage.setItem('expires_in',authData.expires_in )

    }
  },
  closeDialog(context){
    context.showDialog = false;
  },
  openDialog(context){
    context.showDialog = true;
  },
  addErors(context,error){
    context.errors = error;
  },
  clearErrors(context){
    context.errors = {};
  },

  clearErrorMessage(context){
    context.errorMessage =null;
  },

  clearSuccess(context){
    context.successMessage =null;
  },
  addSuccess(context,message){
    context.successMessage = message;
  },
  addErrorMessage(context, message){
    context.errorMessage = message;
  },

  setStartProcess(context, payload){
    context.startProcess = payload;
  },

  setEndProcess(context, payload){
    context.endProcess = payload;
  },




}

// dispatch action
export const actions = {
  async loginAuth(context,payload) {
    alert("login")
    try {
      let form = {
        'email': payload.email,
        'password': payload.password,
      }
      let response = await this.$axios.$post( 'http://localhost:80/api/auth/login',{ ...form })
      context.commit("openDialog");
      context.commit("add",response)
    } catch (error) {
      console.log(error)
    }

  },

  // register user
  async registerAuth(context,payload){

    context.commit("openDialog");

    //set start process to true
    context.commit('setStartProcess',true);

    //set end process to false
    context.commit('setEndProcess',false);


    //clear errors
    context.commit('clearErrors');
    context.commit('clearSuccess');
    context.commit('clearErrorMessage')

    let form = {
      'name': payload.name,
      'email': payload.email,
      'password': payload.password,
      'password_confirmation': payload.password_confirmation,
    }
    try {
      let response = await this.$axios.$post('http://localhost:80/api/register', { ...form })

      //set start process to false
      context.commit('setStartProcess',false);

      //set end process to true
      context.commit('setEndProcess',true);

      if(response.access_token==null){
        //show error
        context.commit('addErors',{...response})
        context.commit('addErrorMessage','please fill form correctly')
      }else{
        //success register
        context.commit('addSuccess','you successfully registereed');

        setTimeout(() => {
          context.commit('closeDialog');
          this.$router.push('/')
        }, 3000);

      }
      context.commit("add",response)
    } catch (error) {
      console.log(error)
    }

  },



}


export const getters = {
  getShowDialog(state){
    return state.showDialog;
  },
  authData(state){
    if(process.client){

      console.log(Object.keys(state.auth).length)
      if(Object.keys(state.auth).length ==0){
        let auth = {
          'access_token':localStorage.getItem('access_token'),
          'token_type':localStorage.getItem('token_type'),
          'expires_in':localStorage.getItem('expires_in'),
        }
      return auth;
    }
    }else{
      return state.auth;
    }

  },
  getErrors(state){
    return state.errors;
  },
  getSuccessMessage(state){
    return state.successMessage;
  },
  getErrorMessage(state){
    return state.errorMessage;
  },

  getStartProcess(state){
    return state.startProcess;
  },

  getEndProcess(state){
    return state.endProcess;
  }

}
