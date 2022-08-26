import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Portal,
  Typography,
} from "@mui/material"
import { Cancel, Check } from "mdi-material-ui"

import React from "react"

const ConfirmDialog = ({ confirm, setConfirm, language, sendData }) => {
  const handleClose = () => {
    setConfirm({ isOpen: false, sanitisedFields: {} })
  }
  const text = {
    sure: {
      en: "Are you sure you would like to proceed with the reservation?",
      es: "¿Está seguro de que desea continuar con la reserva?",
      de: "Sind Sie sicher, dass Sie mit der Reservierung fortfahren möchten?",
    },
    yes: {
      en: "Yes",
      es: "Sí",
      de: "Ja",
    },
    no: {
      en: "No",
      es: "No",
      de: "Nein",
    },
  }
  return (
    <Portal>
      <Dialog open={confirm.isOpen} onClose={handleClose}>
        <DialogContent>
          <Typography>{text.sure[language]}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            startIcon={<Cancel />}
            onClick={handleClose}
          >
            {text.no[language]}
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<Check />}
            onClick={() => {
              sendData(confirm.sanitisedFields)
              handleClose()
            }}
          >
            {text.yes[language]}
          </Button>
        </DialogActions>
      </Dialog>
    </Portal>
  )
}

export default ConfirmDialog
