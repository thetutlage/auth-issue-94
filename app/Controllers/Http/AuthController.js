class AuthController {
  async login ({ request, response, auth, session }) {
    const userData = request.only(['username', 'password'])

    try {
      await auth
        .remember(true)
        .attempt(userData.username, userData.password)

      return response.redirect('/')
    } catch (err) {
      console.log(err)
      session.flashOnly(['username'])
      session.flash({ msg: 'User not found or password is incorrect.' })

      return response.redirect('back')
    }
  }

  async logout ({ response, auth }) {
    await auth.logout()
    return response.redirect('/')
  }
}

module.exports = AuthController
