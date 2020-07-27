import axios from 'axios'
export const state = () => ({
  showNewUserForm:false,
  startSendCreateUser:true,
  doneSendCreateUser:true,
  showAlert:false
})

export const mutations = {
  // open dialog form create new user
  openNewUserForm (state) {
    state.showNewUserForm= true;
  },

  // close dialog form create new user
  closeNewUserForm (state) {
    state.showNewUserForm= false;
  },

  // create new user
  CreateNewUser(state,userData){

    //sent ajax request to server and get data back

  },
  changeShowAlert(state,value){
    state.showAlert=value;
  },

  //toggle status
  start(state){
    state.startSendCreateUser = true;
    state.doneSendCreateUser = false;
  },
  end(state){
    state.startSendCreateUser = false;
    state.doneSendCreateUser = true;
  },
  done(state){
      state.startSendCreateUser = false;
      state.doneSendCreateUser = false;
  }

}

export const actions = {
  createNewUser(context,userData){
      context.commit('start')

      axios.post('https://jsonplaceholder.typicode.com/posts', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      setTimeout(() => {
        context.startSendCreateUser = false;
        context.doneSendCreateUser = true;
        console.log(response);
        context.commit('end')
        context.commit('changeShowAlert',true)

        // close form create new user
        setTimeout(() => {
          context.commit('closeNewUserForm')
          context.commit('changeShowAlert',false)

        }, 3000);

      }, 5000);
    })
    .catch((error) =>{
      context.commit('done')
      context.commit('changeShowAlert',true)
      setTimeout(() => {
        context.commit('changeShowAlert',false)
        context.commit('openNewUserForm')

      }, 3000);
      console.log(error)

    });

  }
}

export const getters = {
  // getStatusCreateNewUser(state){
    getName:(state)=>{
    return {start:state.startSendCreateUser,end:state.doneSendCreateUser}
  }
}
