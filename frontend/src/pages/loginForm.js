
const loginForm = () => {
  return (
    <div className="container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
      <form>
          <h3>Login Here</h3>

          <label for="username">Username</label>
          <input type="text" placeholder="Email or Phone" id="username"></input>

          <label for="password">Password</label>
          <input type="password" placeholder="Password" id="password"></input>

          <button>Log In</button>
      </form>
    </div>
  )
}

export default loginForm;