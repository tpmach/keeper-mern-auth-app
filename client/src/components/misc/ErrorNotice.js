import React from "react"
//import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined"

export default function ErrorNotice(props) {
  return (
    <div className="error-notice">
      <span>{props.message}</span>
      <button onClick={props.clearError}>
        <i className="far fa-times-circle"></i>
      </button>
    </div>
  )
}
