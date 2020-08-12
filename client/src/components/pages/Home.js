import React, { useContext, useEffect } from "react"
import HighlightIcon from "@material-ui/icons/Highlight"
import UserContext from "../context/UserContext"
import { useHistory, Link } from "react-router-dom"

export default function Home() {
  const { userData } = useContext(UserContext)
  const history = useHistory()

  useEffect(() => {
    if (!userData.user) history.push("/login")
  })

  return (
    <div className="container centered">
      <HighlightIcon fontSize="large"></HighlightIcon>
      <h1 className="display-3">Keeper</h1>
      <p className="lead">Keep your notes organized.</p>
      <Link to="/notes">
        <button className="btn btn-lg btn-dark">My Notes</button>
      </Link>
    </div>
  )
}

/*

//import { useHistory } from "react-router-dom"
//import AuthOptions from "../auth/AuthOptions"
  <AuthOptions
        btnStyle="btn btn-lg btn-dark"
        lightBtnStyle="btn-light btn-lg btn"
      />

  const history = useHistory()

  const register = () => history.push("/register")
  const login = () => history.push("/login")

<button onClick={register} className="btn btn-light btn-lg">
        Register
      </button>
      <button onClick={login} className="btn btn-dark btn-lg">
        Login
      </button>
*/
