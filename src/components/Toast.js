import { Alert, Snackbar } from "@mui/material"

import React from "react"
import { connect } from "react-redux"
import { setToast } from "../redux/actions"

const Toast = ({ dispatch, toast, open, severity, msg }) => {
  const handleClose = () => {
    dispatch(setToast({ ...toast, open: false }))
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionProps={{
        onAnimationEnd: () => {
          dispatch(setToast({ ...toast, msg: "", severity: "success" }))
        },
      }}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {msg}
      </Alert>
    </Snackbar>
  )
}

const stp = (s) => ({
  toast: s.toast,
  open: s.toast.open,
  severity: s.toast.severity,
  msg: s.toast.msg,
})

export default connect(stp)(Toast)
