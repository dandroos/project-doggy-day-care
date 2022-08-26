import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import { Grid, TextField, Typography } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"

import React from "react"
import { connect } from "react-redux"
import moment from "moment"

const TripDetails = ({ fields, setFields, language }) => {
  const text = Object.assign(
    {},
    useStaticQuery(graphql`
      {
        file(
          sourceInstanceName: { eq: "content" }
          name: { eq: "dictionary" }
          extension: { eq: "md" }
        ) {
          childMarkdownRemark {
            frontmatter {
              trip_details {
                en
                es
                de
              }
              start_date {
                en
                es
                de
              }
              end_date {
                en
                es
                de
              }
              drop_off {
                en
                es
                de
              }
              pick_up {
                en
                es
                de
              }
            }
          }
        }
      }
    `).file.childMarkdownRemark.frontmatter
  )

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">{text.trip_details[language]}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePicker
          label={text.start_date[language]}
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
          label={text.drop_off[language]}
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
          label={text.end_date[language]}
          inputFormat="DD/MM/yyyy"
          value={fields.dateTo}
          renderInput={(params) => <TextField {...params} />}
          onChange={(e) => setFields({ ...fields, dateTo: e })}
          minDate={fields.dateFrom}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TimePicker
          label={text.pick_up[language]}
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
