import React from "react"
import AddIcon from "@material-ui/icons/Add"
import Zoom from "@material-ui/core/Zoom"

export default function CreateArea(props) {
  return (
    <div>
      <form className="create-note">
        {props.expanded && (
          <input
            value={props.titleValue}
            name="title"
            placeholder="Title"
            onChange={props.changed}
            autoFocus="true"
          />
        )}

        <textarea
          onClick={props.textAreaClicked}
          value={props.contentValue}
          name="content"
          placeholder="Take a note..."
          rows={props.expanded ? "3" : "1"}
          onChange={props.changed}
        />
        <Zoom in={props.expanded}>
          <button onClick={props.clicked}>
            <AddIcon />
          </button>
        </Zoom>
      </form>
    </div>
  )
}
