import axios from 'axios'
export const state = () => ({
  showNewAgencyForm:false,
  startSendCreateAgency:true,
  doneSendCreateAgency:true,
  showAlert:false
})

export const mutations = {
  // open dialog form create new agency
  openNewAgencyForm (state) {
    state.showNewAgencyForm= true;
  },

  // close dialog form create new agency
  closeNewAgencyForm (state) {
    state.showNewAgencyForm= false;
  },

  // create new agency
  CreateNewAgency(state,agencyData){

    //sent ajax request to server and get data back

  },
  changeShowAlert(state,value){
    state.showAlert=value;
  },

  //toggle status
  start(state){
    state.startSendCreateAgency = true;
    state.doneSendCreateAgency = false;
  },
  end(state){
    state.startSendCreateAgency = false;
    state.doneSendCreateAgency = true;
  },
  done(state){
      state.startSendCreateAgency = false;
      state.doneSendCreateAgency = false;
  }

}

export const actions = {
  createNewAgency(context,agencyData){
      context.commit('start')

      axios.post('https://jsonplaceholder.typicode.com/posts', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      setTimeout(() => {
        context.startSendCreateAgency = false;
        context.doneSendCreateAgency = true;
        console.log(response);
        context.commit('end')
        context.commit('changeShowAlert',true)

        // close form create new agency
        setTimeout(() => {
          context.commit('closeNewAgencyForm')
          context.commit('changeShowAlert',false)

        }, 3000);

      }, 5000);
    })
    .catch((error) =>{
      context.commit('done')
      context.commit('changeShowAlert',true)
      setTimeout(() => {
        context.commit('changeShowAlert',false)
        context.commit('openNewAgencyForm')

      }, 3000);
      console.log(error)

    });

  }
}

export const getters = {
  // getStatusCreateNewAgency(state){
    getName:(state)=>{
    return {start:state.startSendCreateAgency,end:state.doneSendCreateAgency}
  }
}
