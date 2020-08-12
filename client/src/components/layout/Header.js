import React from "react"
import HighlightIcon from "@material-ui/icons/Highlight"
import { Link } from "react-router-dom"
import AuthOptions from "../auth/AuthOptions"

export default function Header() {
  return (
    <header>
      <Link to="/">
        <h1>
          <HighlightIcon />
          Keeper
        </h1>
      </Link>
      <AuthOptions />
    </header>
  )
}
