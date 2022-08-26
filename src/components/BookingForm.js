import "moment/locale/de"
import "moment/locale/es"

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Fab,
  Grid,
  Portal,
  TextField,
  Typography,
} from "@mui/material"
import { Cancel, Check, Close } from "mdi-material-ui"
import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { setBookingForm, setToast } from "../redux/actions"

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import ConfirmDialog from "./booking-form/ConfirmDialog"
import IndividualDetails from "./booking-form/IndividualDetails"
import { LocalizationProvider } from "@mui/x-date-pickers"
import PetDetails from "./booking-form/PetDetails"
import TripDetails from "./booking-form/TripDetails"
import { connect } from "react-redux"
import moment from "moment"

const BookingForm = ({ dispatch, language, isOpen, isMobile }) => {
  const [confirm, setConfirm] = useState({
    isOpen: false,
    sanitisedFields: {},
  })

  const { content, dictionary } = useStaticQuery(graphql`
    {
      content: file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "book" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            booking_success {
              en
              es
              de
            }
            booking_fail {
              en
              es
              de
            }
          }
        }
      }
      dictionary: file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "dictionary" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            booking_form {
              en
              es
              de
            }
            cancel {
              en
              es
              de
            }
            comments {
              en
              es
              de
            }
            proceed {
              en
              es
              de
            }
          }
        }
      }
    }
  `)

  const text = Object.assign({}, dictionary.childMarkdownRemark.frontmatter)

  const messages = Object.assign({}, content.childMarkdownRemark.frontmatter)

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

    const sanitisedFields = {
      name: fields.name,
      email: fields.email,
      phone: fields.phone,
      address: fields.address,
      from: moment(fields.dateFrom).format("dddd Do MMMM YYYY"),
      to: moment(fields.dateTo).format("dddd Do MMMM YYYY"),
      drop_off_time: moment(fields.timeDropOff).format("HH:mm"),
      pick_up_time: moment(fields.timePickUp).format("HH:mm"),
      comments: fields.comments,
    }
    for (let i = 1; i < 7; i++) {
      sanitisedFields[`pet_${i}_type`] = "-"
      sanitisedFields[`pet_${i}_name`] = "-"
      sanitisedFields[`pet_${i}_breed`] = "-"
      sanitisedFields[`pet_${i}_bath`] = "-"
      sanitisedFields[`pet_${i}_preferred_food`] = "-"
    }

    fields.pets.map((p, ind) => {
      sanitisedFields[`pet_${ind + 1}_type`] = p.type.capitalize()
      sanitisedFields[`pet_${ind + 1}_name`] = p.name
      sanitisedFields[`pet_${ind + 1}_breed`] = p.breed
      sanitisedFields[`pet_${ind + 1}_bath`] = p.bath === 1 ? "No" : "Yes"

      switch (p.preferredFood) {
        case 0:
          sanitisedFields[`pet_${ind + 1}_preferred_food`] = "Not important"
          break
        case 1:
          sanitisedFields[`pet_${ind + 1}_preferred_food`] =
            "Owner will provide"
          break
        case 2:
          sanitisedFields[`pet_${ind + 1}_preferred_food`] = "Affinity"
          break
        case 3:
          sanitisedFields[`pet_${ind + 1}_preferred_food`] = "Other"
          break
        default:
          sanitisedFields[`pet_${ind + 1}_preferred_food`] = "Other"
      }
      return null
    })

    setConfirm({ isOpen: true, sanitisedFields })
  }

  const sendData = (sanitisedFields) => {
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
        ...sanitisedFields,
      }),
    })
      .then(() => {
        dispatch(
          setToast({
            open: true,
            msg: messages.booking_success[language],
            severity: "success",
          })
        )
        handleClose()
        setFields(defaultFields)
      })
      .catch(() =>
        dispatch(
          setToast({
            open: true,
            msg: messages.booking_fail[language],
            severity: "error",
          })
        )
      )
  }

  const handleClose = () => {
    dispatch(setBookingForm({ open: false }))
  }
  return (
    <>
      <ConfirmDialog
        confirm={confirm}
        setConfirm={setConfirm}
        language={language}
        sendData={sendData}
      />
      <Portal>
        <Dialog open={isOpen} maxWidth="lg" fullWidth onClose={handleClose}>
          <DialogContent>
            <Typography variant="h5">{text.booking_form[language]}</Typography>
            {!isMobile && (
              <Fab
                size="small"
                sx={{ position: "absolute", top: 15, right: 15 }}
                onClick={handleClose}
              >
                <Close />
              </Fab>
            )}
            <Box>
              <form
                name="booking"
                action="#"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <LocalizationProvider
                  adapterLocale={(() => {
                    switch (language) {
                      case "en":
                        return "en-gb"
                      case "es":
                        return "es"
                      case "de":
                        return "de"
                      default:
                        return "en-gb"
                    }
                  })()}
                  dateAdapter={AdapterMoment}
                >
                  <Grid container spacing={2}>
                    <IndividualDetails
                      fields={fields}
                      handleChange={handleChange}
                    />
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
                    <Grid item xs={12} md={6}>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<Cancel />}
                        fullWidth
                        onClick={handleClose}
                      >
                        {text.cancel[language]}
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<Check />}
                        type="submit"
                        fullWidth
                        disabled={fields.pets.length === 0}
                      >
                        {text.proceed[language]}
                      </Button>
                    </Grid>
                  </Grid>
                </LocalizationProvider>
              </form>
            </Box>
          </DialogContent>
        </Dialog>
      </Portal>
    </>
  )
}

const stp = (s) => ({
  language: s.language,
  isOpen: s.bookingForm.open,
  isMobile: s.isMobile,
})

export default connect(stp)(BookingForm)
