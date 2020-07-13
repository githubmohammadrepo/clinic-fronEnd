export const state = () => ({
  counter:false 
})

export const mutations = {
  openDialog (state) {
    state.counter= true;
  },
  closeDialog (state) {
    state.counter= false;
  }
}
