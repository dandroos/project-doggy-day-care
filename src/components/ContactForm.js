import { Button, Grid, TextField, Typography } from "@mui/material"
import React, { useState } from "react"

import { Send } from "mdi-material-ui"
import { connect } from "react-redux"
import { setToast } from "../redux/actions"

const ContactForm = ({ dispatch, language }) => {
  const text = {
    useTheForm: {
      en: "You can also use the form below to send us a message",
      es: "También puede utilizar el siguiente formulario para enviarnos un mensaje",
      de: "Sie können auch das folgende Formular verwenden, um uns eine Nachricht zu senden",
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
    message: {
      en: "Message",
      es: "Mensaje",
      de: "Nachricht",
    },
    send: {
      en: "Send",
      es: "Enviar",
      de: "Senden",
    },
    messageSent: {
      en: "Thank you for your message.  We will respond as soon as possible.",
      es: "Gracias por tu mensaje. Responderemos lo antes posible.",
      de: "Danke für deine Nachricht. Wir werden so schnell wie möglich antworten.",
    },
    messageNotSent: {
      en: "Apologies. There was a problem sending your message. Please try again in a moment.",
      es: "Disculpas. Hubo un problema al enviar su mensaje. Vuelva a intentarlo en un momento.",
      de: "Entschuldigung. Beim Senden Ihrer Nachricht ist ein Problem aufgetreten. Bitte versuchen Sie es gleich noch einmal.",
    },
  }

  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  })

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

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
        "form-name": "contact",
        ...fields,
      }),
    })
      .then(() => {
        dispatch(
          setToast({
            open: true,
            msg: text.messageSent[language],
            severity: "success",
          })
        )
        setFields({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      })
      .catch(() =>
        dispatch(
          setToast({
            open: true,
            msg: text.messageNotSent[language],
            severity: "error",
          })
        )
      )
  }
  return (
    <form
      name="contact"
      action="#"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography gutterBottom>{text.useTheForm[language]}...</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label={text.name[language]}
            name="name"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Email"
            name="email"
            type="email"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label={text.phone[language]}
            name="phone"
            type="tel"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            label={text.message[language]}
            name="msg"
            minRows={5}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Send />}
            type="submit"
          >
            {text.send[language]}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

const stp = (s) => ({
  language: s.language,
})

export default connect(stp)(ContactForm)
