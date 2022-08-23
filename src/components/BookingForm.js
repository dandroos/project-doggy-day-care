import "moment/locale/de"
import "moment/locale/es"

import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import React, { useState } from "react"

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { Check } from "mdi-material-ui"
import ConfirmDialog from "./booking-form/ConfirmDialog"
import IndividualDetails from "./booking-form/IndividualDetails"
import { LocalizationProvider } from "@mui/x-date-pickers"
import PetDetails from "./booking-form/PetDetails"
import TripDetails from "./booking-form/TripDetails"
import { connect } from "react-redux"
import moment from "moment"

const BookingForm = ({ language }) => {
  const defaultFields = {
    name: "",
    email: "",
    phone: "",
    dni: "",
    address: "",
    comments: "",
    dateFrom: new Date(),
    dateTo: new Date(),
    timePickUp: moment(new Date()).set({ hour: 9, minute: 0, second: 0 }),
    timeDropOff: moment(new Date()).set({ hour: 9, minute: 0, second: 0 }),
    pets: [],
  }
  const [fields, setFields] = useState(defaultFields)

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const submittedFields = {
      name: fields.name,
      email: fields.email,
      phone: fields.phone,
      address: fields.address,
      from: fields.dateFrom,
      to: fields.dateTo,
      drop_off_time: fields.timeDropOff,
      pick_up_time: fields.timePickUp,
      comments: fields.comments,
    }
    for (let i = 1; i < 7; i++) {
      submittedFields[`pet_${i}_type`] = "N/A"
      submittedFields[`pet_${i}_name`] = "N/A"
      submittedFields[`pet_${i}_breed`] = "N/A"
      submittedFields[`pet_${i}_bath`] = "N/A"
      submittedFields[`pet_${i}_preferred_food`] = "N/A"
    }

    fields.pets.map((p, ind) => {
      submittedFields[`pet_${ind + 1}_type`] = p.type
      submittedFields[`pet_${ind + 1}_name`] = p.name
      submittedFields[`pet_${ind + 1}_breed`] = p.breed
      submittedFields[`pet_${ind + 1}_bath`] = p.bath === 1 ? "No" : "Yes"

      switch (p.preferredFood) {
        case 0:
          submittedFields[`pet_${ind + 1}_preferred_food`] = "Not important"
          break
        case 1:
          submittedFields[`pet_${ind + 1}_preferred_food`] =
            "Owner will provide"
          break
        case 2:
          submittedFields[`pet_${ind + 1}_preferred_food`] = "Affinity"
          break
        case 3:
          submittedFields[`pet_${ind + 1}_preferred_food`] = "Other"
          break
        default:
          submittedFields[`pet_${ind + 1}_preferred_food`] = "Other"
      }
      return null
    })
    //show confirmation dialog

    const encode = (formData) => {
      return Object.keys(formData)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])
        )
        .join("&")
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "booking",
        ...submittedFields,
      }),
    }).then(() => {
      // dispatch(
      //   setToast({
      //     open: true,
      //     msg: text.messageSent[language],
      //     severity: "success",
      //   })
      // )
      setFields(defaultFields)
    })
    //   .catch(() =>
    //     dispatch(
    //       setToast({
    //         open: true,
    //         msg: text.messageNotSent[language],
    //         severity: "error",
    //       })
    //     )
    //   )
  }
  const text = {
    bookingForm: {
      en: "Booking form",
      es: "Formulario de reserva",
      de: "Buchungsformular",
    },
    comments: {
      en: "Comments",
      es: "Comentarios",
      de: "Kommentare",
    },
    proceed: {
      en: "Proceed",
      es: "Proceder",
      de: "Fortfahren",
    },
  }
  return (
    <>
      <ConfirmDialog />
      <Box>
        <LocalizationProvider locale={language} dateAdapter={AdapterMoment}>
          <Typography variant="h5" gutterBottom>
            {text.bookingForm[language]}
          </Typography>
          <form
            name="booking"
            action="#"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <IndividualDetails fields={fields} handleChange={handleChange} />
              <TripDetails fields={fields} setFields={setFields} />
              <PetDetails fields={fields} setFields={setFields} />
              <Grid item xs={12}>
                <TextField
                  multiline
                  minRows={4}
                  name="comments"
                  value={fields.comments}
                  onChange={handleChange}
                  label={text.comments[language]}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<Check />}
                  fullWidth
                  type="submit"
                  disabled={fields.pets.length === 0}
                >
                  {text.proceed[language]}
                </Button>
              </Grid>
            </Grid>
          </form>
        </LocalizationProvider>
      </Box>
    </>
  )
}

const stp = (s) => ({
  language: s.language,
})

export default connect(stp)(BookingForm)
