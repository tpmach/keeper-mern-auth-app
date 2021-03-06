import React, { useState, useEffect } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from "axios"
import Home from "./components/pages/Home"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import Notes from "./components/pages/Notes"
import EditNote from "./components/notes/EditNote"
import UserContext from "./components/context/UserContext"

import "./styles.css"

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if (token === null) {
        localStorage.setItem("auth-token", "")
        token = ""
      }

      const tokenRes = await Axios.post("/users/isTokenValid", null, {
        headers: { "x-auth-token": token },
      })

      if (tokenRes.data) {
        const userRes = await Axios.get("/users", {
          headers: { "x-auth-token": token },
        })
        setUserData({
          token,
          user: userRes.data,
        })
      }
    }
    checkLoggedIn()
  }, [])

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/notes" component={Notes} />
            <Route exact path="/notes/:id" component={EditNote} />
          </Switch>
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  )
}
