export default function({ store, redirect }){

  if(Object.keys(store.getters['auth/authData']).length){
    redirect('/')
  }else{
    // console.log('hi mohammad unAuthorize')
  }
}
