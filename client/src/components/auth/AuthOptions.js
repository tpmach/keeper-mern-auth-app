import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import UserContext from "../context/UserContext"

export default function AuthOptions(props) {
  const { userData, setUserData } = useContext(UserContext)

  const history = useHistory()

  const register = () => history.push("/register")
  const login = () => history.push("/login")
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    })
    history.push("/")
    localStorage.setItem("auth-token", "")
  }

  return (
    <nav className="auth-options">
      {userData.user ? (
        <button className={props.btnStyle} onClick={logout}>
          Log Out
        </button>
      ) : (
        <>
          <button className={props.lightBtnStyle} onClick={register}>
            Register
          </button>
          <button className={props.btnStyle} onClick={login}>
            Log in
          </button>
        </>
      )}
    </nav>
  )
}