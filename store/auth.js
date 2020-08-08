import Cookie from 'js-cookie'

export const state = () => ({
  auth:{},
  showPageContent:false,
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
    // store.dispatch('token',authData.access_token)

    state.auth = authData;
    //store auth user to local storage
    if(process.client){
      localStorage.setItem('access_token',authData.access_token )
      localStorage.setItem('token_type',authData.token_type )
      localStorage.setItem('expires_in',new Date().getTime() + Number.parseInt(authData.expires_in) * 1000 )

    }
    //store auth user in cooke on server
    Cookie.set('access_token',authData.access_token)
    Cookie.set('token_type',authData.token_type)
    Cookie.set('expires_in',new Date().getTime() + Number.parseInt(authData.expires_in) * 1000)


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
  clearAuth(context){
    //vuex auth
    context.auth = {};

    //cookie auth
    Cookie.remove('access_token')
    Cookie.remove('token_type')
    Cookie.remove('expires_in')

    //localstorage auth
    localStorage.removeItem('access_token')
    localStorage.removeItem('token_type')
    localStorage.removeItem('expires_in')

  }




}

// dispatch action
export const actions = {
  async me(context,payload) {
    console.log('before ' +context.state.auth )
    console.log('payload:' + payload.access_token)
    let result =await this.$axios.$post('http://localhost:80/api/auth/refresh',{token:payload.access_token})
    if(result){
      context.commit('add',result)
    }

    console.log('after ' +context.state.auth )

  },
 // loginAuth user
  async loginAuth(context,payload){
    //clear auth user
    context.commit('clearAuth')

    //open dilog
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
      let response = await this.$axios.$post('http://localhost:80/api/auth/login', { ...form })

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
        context.commit('addErrorMessage','please fill form correctly')
        context.commit('setStartProcess',false);
        context.commit('setEndProcess',true);

      console.log(error)
    }

  },

  // register user
  async registerAuth(context,payload){
    //clear auth user
    context.commit('clearAuth')

    //open dilog
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
      console.log(response)
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
    //first if exit auth return
    //second if exist cookie return
    //third if exist localStorage return

    /**
     * if expiration time is out to date
     * or expired toke not valid and i have to remove token
     */
    let expires = Object.keys(state.auth).length >0 ? state.auth.expires_in : null;
    expires = expires ==null ? Cookie.get('expires_in') : expires;
    if(process.client){
      expires = expires ==null ? localStorage.getItem('expires_in') : expires;
    }
    expires = new Date().getTime() + Number.parseInt(expires)

    if(new Date().getTime() >= expires){
      // remove data from cookie
      if(process.client){
        localStorage.removeItem('access_token')
        localStorage.removeItem('token_type')
        localStorage.removeItem('expires_in')
      }
      if (process.server) {
        Cookie.remove('access_token')
        Cookie.remove('token_type')
        Cookie.remove('expires_in')
      }
      state.commit('clearAuth')
      //redirecto to login page or register page
      this.$router.push('/users/enterUser')
      return {}
    }
    // if on client
    if(Object.keys(state.auth).length>0){
      return state.auth;
    } else if(Cookie.get('access_token') !=null){
      //get cookies
      let auth ={
        'access_token': Cookie.get('access_token'),
        'token_type': Cookie.get('token_type'),
        'expires_in': Cookie.get('expires_in')
      }
      return auth;

    } else if(process.client){
     if(localStorage.getItem('access_token') !=null){
        if(Object.keys(state.auth).length ==0){
          let auth = {
            'access_token':localStorage.getItem('access_token'),
            'token_type':localStorage.getItem('token_type'),
            'expires_in':localStorage.getItem('expires_in'),
          }
          return auth;
        }
      }else{
        return {};
      }
    }else{
      return {};
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
  },



}
