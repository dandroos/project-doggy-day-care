import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import { Grid, TextField, Typography } from "@mui/material"

import React from "react"
import { connect } from "react-redux"
import moment from "moment"

const TripDetails = ({ fields, setFields, language }) => {
  const text = {
    tripDetails: {
      en: "Trip details",
      es: "Detalles del viaje",
      de: "Reisedetails",
    },
    startDate: {
      en: "Start date",
      es: "Fecha de inicio",
      de: "Anfangsdatum",
    },
    endDate: {
      en: "End date",
      es: "Fecha final",
      de: "Endtermin",
    },
    dropOff: {
      en: "Drop off time",
      es: "Hora de entrega",
      de: "Abholzeit",
    },
    pickUp: {
      en: "Pick up time",
      es: "Hora de recogida",
      de: "Sammelzeit",
    },
  }
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">{text.tripDetails[language]}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePicker
          label={text.startDate[language]}
          inputFormat="DD/MM/yyyy"
          value={fields.dateFrom}
          renderInput={(params) => <TextField {...params} />}
          onChange={(e) => setFields({ ...fields, dateFrom: e })}
          minDate={moment(Date.now())}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TimePicker
          ampm
          label={text.dropOff[language]}
          shouldDisableTime={(timeValue, clockType) => {
            switch (clockType) {
              case "hours":
                if (timeValue >= 9 && timeValue < 14) {
                  return false
                } else if (timeValue >= 16 && timeValue < 19) {
                  return false
                }
                return true
              case "minutes":
                if (timeValue % 5) {
                  return true
                }
                return false
              default:
                return
            }
          }}
          value={fields.timeDropOff}
          renderInput={(params) => <TextField {...params} />}
          onChange={(e) => setFields({ ...fields, timeDropOff: e })}
          minutesStep={5}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePicker
          label={text.endDate[language]}
          inputFormat="DD/MM/yyyy"
          value={fields.dateTo}
          renderInput={(params) => <TextField {...params} />}
          onChange={(e) => setFields({ ...fields, dateTo: e })}
          minDate={fields.dateFrom}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TimePicker
          label={text.pickUp[language]}
          ampm
          shouldDisableTime={(timeValue, clockType) => {
            switch (clockType) {
              case "hours":
                if (timeValue >= 9 && timeValue < 14) {
                  return false
                } else if (timeValue >= 16 && timeValue < 19) {
                  return false
                }
                return true
              case "minutes":
                if (timeValue % 5) {
                  return true
                }
                return false
              default:
                return
            }
          }}
          value={fields.timePickUp}
          renderInput={(params) => <TextField {...params} />}
          onChange={(e) => setFields({ ...fields, timePickUp: e })}
          minutesStep={5}
        />
      </Grid>
    </>
  )
}

const stp = (s) => ({
  language: s.language,
})

export default connect(stp)(TripDetails)
