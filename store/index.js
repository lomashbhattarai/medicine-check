export const strict = false

export const state = () => ({
  currentUser: []
})

export const mutations = {
  registerCurrentUser(state,currentUser) {
    console.log("mutation vitra xiryoxx")
    console.log(currentUser)
    state.currentUser=[currentUser]
  }
}
