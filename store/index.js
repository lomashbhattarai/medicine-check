export const strict = false

export const state = () => ({
  currentUser: []
})

export const mutations = {
  registerCurrentUser(state,currentUser) {
    state.currentUser=[currentUser]
  }
}
