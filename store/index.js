export const state = () => ({
  name:"mohammad"
})

export const mutations = {
  openDialog (state) {
    state.counter= true;
  },
  closeDialog (state) {
    state.counter= false;
  }
}


export const getters = {
  getName: (state) => {
    return state.name
  }
}
