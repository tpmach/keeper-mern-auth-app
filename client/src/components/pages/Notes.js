import React, { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import { useHistory } from "react-router-dom"
import AddNote from "../notes/AddNote"
import ShowNote from "../notes/ShowNote"
import axios from "axios"

export default function Notes(props) {
  const { userData } = useContext(UserContext)
  const history = useHistory()
  const [notes, setNotes] = useState([])
  const token = localStorage.getItem("auth-token")

  useEffect(() => {
    if (!userData.user) history.push("/login")
  })

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get("/notes/all", {
          headers: { "x-auth-token": token },
        })
        setNotes(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getNotes()
  })

  async function deleteNote(id) {
    try {
      await axios.delete(`/notes/${id}`, {
        headers: { "x-auth-token": token },
      })
      history.push("/notes")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <AddNote />
      {notes.map((note) => {
        return (
          <ShowNote
            key={note._id}
            id={note._id}
            title={note.title}
            content={note.content}
            value={note}
            deleteClicked={deleteNote}
          />
        )
      })}
    </div>
  )
}
