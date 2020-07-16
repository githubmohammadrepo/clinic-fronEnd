import axios from 'axios'
export const state = () => ({
  showNewOfficeForm:false,
  startSendCreateOffice:true,
  doneSendCreateOffice:true,
  showAlert:false
})

export const mutations = {
  // open dialog form create new office
  openNewOfficeForm (state) {
    state.showNewOfficeForm= true;
  },

  // close dialog form create new office
  closeNewOfficeForm (state) {
    state.showNewOfficeForm= false;
  },

  // create new office
  CreateNewOffice(state,officeData){

    //sent ajax request to server and get data back

  },
  changeShowAlert(state,value){
    state.showAlert=value;
  },

  //toggle status
  start(state){
    state.startSendCreateOffice = true;
    state.doneSendCreateOffice = false;
  },
  end(state){
    state.startSendCreateOffice = false;
    state.doneSendCreateOffice = true;
  },
  done(state){
      state.startSendCreateOffice = false;
      state.doneSendCreateOffice = false;
  }

}

export const actions = {
  createNewOffice(context,officeData){
      context.commit('start')

      axios.post('https://jsonplaceholder.typicode.com/posts', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      setTimeout(() => {
        context.startSendCreateOffice = false;
        context.doneSendCreateOffice = true;
        console.log(response);
        context.commit('end')
        context.commit('changeShowAlert',true)

        // close form create new office
        setTimeout(() => {
          context.commit('closeNewOfficeForm')
          context.commit('changeShowAlert',false)

        }, 3000);

      }, 5000);
    })
    .catch((error) =>{
      context.commit('done')
      context.commit('changeShowAlert',true)
      setTimeout(() => {
        context.commit('changeShowAlert',false)
        context.commit('openNewOfficeForm')

      }, 3000);
      console.log(error)

    });

  }
}

export const getters = {
  // getStatusCreateNewOffice(state){
    getName:(state)=>{
    return {start:state.startSendCreateOffice,end:state.doneSendCreateOffice}
  }
}
