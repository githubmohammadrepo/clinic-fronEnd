// plugins/vuex-persistedstate.js
import createPersistedState from 'vuex-persistedstate'

const NAME_SPACE = 'auth'

export default ({ store, isHMR }) => {
  if (isHMR) return
  if (process.browser) {
    createPersistedState({
      key: NAME_SPACE,
      paths: ['auth', 'test'],
    })(store)
  }
}
