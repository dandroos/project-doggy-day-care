import { Grid, TextField, Typography } from "@mui/material"

import React from "react"
import { connect } from "react-redux"

const IndividualDetails = ({ fields, handleChange, language }) => {
  const text = {
    yourDetails: {
      en: "Your details",
      es: "Tus detalles",
      de: "Deine Details",
    },
    name: {
      en: "Name",
      es: "Nombre",
      de: "Name",
    },
    phone: {
      en: "Phone",
      es: "Teléfono",
      de: "Telefon",
    },
    address: {
      en: "Address",
      es: "Dirección",
      de: "Adresse",
    },
  }
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">{text.yourDetails[language]}</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          name="name"
          label={text.name[language]}
          value={fields.name}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          name="email"
          label="Email"
          value={fields.email}
          type="email"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          name="phone"
          label={text.phone[language]}
          value={fields.phone}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          name="dni"
          label="DNI"
          value={fields.dni}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          name="address"
          label={text.address[language]}
          value={fields.address}
          onChange={handleChange}
        />
      </Grid>
    </>
  )
}

const stp = (s) => ({
  language: s.language,
})

export default connect(stp)(IndividualDetails)
