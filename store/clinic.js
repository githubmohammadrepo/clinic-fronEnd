import axios from 'axios'
export const state = () => ({
  showNewClinicForm:false,
  startSendCreateClinic:true,
  doneSendCreateClinic:true,
  showAlert:false
})

export const mutations = {
  // open dialog form create new clinic
  openNewClinicForm (state) {
    state.showNewClinicForm= true;
  },

  // close dialog form create new clinic
  closeNewClinicForm (state) {
    state.showNewClinicForm= false;
  },

  // create new clinic
  CreateNewClinic(state,clinicData){

    //sent ajax request to server and get data back

  },
  changeShowAlert(state,value){
    state.showAlert=value;
  },

  //toggle status
  start(state){
    state.startSendCreateClinic = true;
    state.doneSendCreateClinic = false;
  },
  end(state){
    state.startSendCreateClinic = false;
    state.doneSendCreateClinic = true;
  },
  done(state){
      state.startSendCreateClinic = false;
      state.doneSendCreateClinic = false;
  }

}

export const actions = {
  createNewClinic(context,clinicData){
      context.commit('start')

      axios.post('https://jsonplaceholder.typicode.com/posts', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      setTimeout(() => {
        context.startSendCreateClinic = false;
        context.doneSendCreateClinic = true;
        console.log(response);
        context.commit('end')
        context.commit('changeShowAlert',true)

        // close form create new clinic
        setTimeout(() => {
          context.commit('closeNewClinicForm')
          context.commit('changeShowAlert',false)

        }, 3000);

      }, 5000);
    })
    .catch((error) =>{
      context.commit('done')
      context.commit('changeShowAlert',true)
      setTimeout(() => {
        context.commit('changeShowAlert',false)
        context.commit('openNewClinicForm')

      }, 3000);
      console.log(error)

    });

  }
}

export const getters = {
  // getStatusCreateNewClinic(state){
    getName:(state)=>{
    return {start:state.startSendCreateClinic,end:state.doneSendCreateClinic}
  }
}
