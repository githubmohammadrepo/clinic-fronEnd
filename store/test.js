import axios from 'axios'
export const state = () => ({
  posts:{}
})

export const mutations = {
  add (state, data) {
    state.posts=data;
  },

}

export const actions = {
  fetchPosts(context){
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
     .then(response => {
       setTimeout(() => {
        let result = response.data;
        for (const value in result) {
          result[value].title = result[value].title.substr(0,18)+' ...'
          result[value].body = result[value].body.substr(0,55)+' ...'
        }
        context.commit('add',result)
       }, 3000);
     })
     .catch(e => {
       console.log(e)
     })
  }
}


export const getters = {
  getPosts(state){
    return state.posts;
  }
}
