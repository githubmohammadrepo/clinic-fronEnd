export const state = () => ({
  list: []
})

export const mutations = {
  add (state, text) {
    state.list.push({
      text,
      done: false
    })
  },
  remove (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle (state, todo) {
    todo.done = !todo.done
  },
  makeDone(state,list){
    let index =state.list.indexOf(list);
    list.done = !list.done;
    state[index]=list;
  }
}
