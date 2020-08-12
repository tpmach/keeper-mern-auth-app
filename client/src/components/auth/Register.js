import React, { useState, useContext } from "react"
import Axios from "axios"
import UserContext from "../context/UserContext"
import { useHistory } from "react-router-dom"
import ErrorNotice from "../misc/ErrorNotice"

export default function Register() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [passwordChecked, setPasswordChecked] = useState()
  const [displayName, setDisplayName] = useState()
  const [error, setError] = useState()

  const { setUserData } = useContext(UserContext)
  const history = useHistory()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const newUser = { email, password, passwordChecked, displayName }

      await Axios.post("/users/register", newUser)
      const loginRes = await Axios.post("/users/login", { email, password })

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      })

      localStorage.setItem("auth-token", loginRes.data.token)
      history.push("/notes")
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg)
    }
  }

  return (
    <div className="container mt-5">
      <h1>Register</h1>

      <div className="row">
        <div className="col-sm-8">
          {error && (
            <ErrorNotice
              message={error}
              clearError={() => setError(undefined)}
            />
          )}
          <div className="card">
            <div className="card-body">
              <form onSubmit={submit}>
                <div className="form-group">
                  <label htmlFor="username">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="username"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="verifiedPassword">Verified Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="verifiedPassword"
                    onChange={(e) => setPasswordChecked(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="displayName">Display Name (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="displayName"
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-dark">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
