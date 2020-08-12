import React, { useState } from "react"
import Axios from "axios"
import { useHistory } from "react-router-dom"
import AddIcon from "@material-ui/icons/Add"
import Zoom from "@material-ui/core/Zoom"

export default function AddNote() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const history = useHistory()

  const addNote = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("auth-token")
      const newNote = { title, content }
      await Axios.post("/notes/new", newNote, {
        headers: { "x-auth-token": token },
      })
      history.push("/notes")
      setTitle("")
      setContent("")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            value={title}
            name="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus={true}
          />
        )}

        <textarea
          onClick={() => setIsExpanded(true)}
          value={content}
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
          onChange={(e) => setContent(e.target.value)}
        />
        <Zoom in={isExpanded}>
          <button onClick={addNote}>
            <AddIcon />
          </button>
        </Zoom>
      </form>
    </div>
  )
}
