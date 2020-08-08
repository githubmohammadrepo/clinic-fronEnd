export  default function({store,redirect}) {
  console.log('from middlewaare: ',store.getters['auth/authData']);


}
