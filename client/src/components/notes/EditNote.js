import React, { useState, useEffect, useContext } from "react"
import Axios from "axios"
import CheckIcon from "@material-ui/icons/Check"
import UserContext from "../context/UserContext"
import { useHistory } from "react-router-dom"

export default function EditNote(props) {
  const { userData } = useContext(UserContext)
  const history = useHistory()
  const [note, setNote] = useState({
    title: "",
    content: "",
  })

  const token = localStorage.getItem("auth-token")

  useEffect(() => {
    if (!userData.user) history.push("/login")
  })

  useEffect(() => {
    const getNote = async () => {
      try {
        const response = await Axios.get(`/notes/${props.match.params.id}`, {
          headers: { "x-auth-token": token },
        })
        setNote(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getNote()
  }, [props])

  const handleChange = (event) =>
    setNote({ ...note, [event.target.name]: event.target.value })

  const handleSubmit = (event) => {
    const updateNote = async () => {
      try {
        await Axios.patch(`/notes/${note._id}/edit`, note, {
          headers: { "x-auth-token": token },
        })
        history.push("/notes")
      } catch (error) {
        console.log(error)
      }
    }
    updateNote()
    event.preventDefault()
  }

  return (
    <div>
      <div className="text-center">
        <h2> Update Note</h2>
      </div>
      <form onSubmit={handleSubmit} className="create-note">
        <input value={note.title} name="title" onChange={handleChange} />
        <textarea
          value={note.content}
          name="content"
          rows="3"
          onChange={handleChange}
        />
        <button>
          <CheckIcon />
        </button>
      </form>
    </div>
  )
}
