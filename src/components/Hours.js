import { Box, Typography } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"

import React from "react"
import { connect } from "react-redux"

const Hours = ({ language }) => {
  const { openingHours } = useStaticQuery(graphql`
    {
      file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "location" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            openingHours {
              morningAfternoon {
                start
                finish
              }
              afternoonEvening {
                start
                finish
              }
            }
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter

  const text = {
    openingHours: {
      en: "Opening hours",
      es: "Horario",
      de: "Öffnungszeiten",
    },
    everyDay: {
      en: "Every day",
      es: "Todos los días",
      de: "Täglich",
    },
  }
  const timeSanitizer = (time) =>
    `${time.substring(time.charAt(0) === "0" ? 1 : 0, 2)}:${time.substring(2)}`
  return (
    <Box mb={2}>
      <Typography variant="h5" gutterBottom>
        {text.openingHours[language]}
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        maxWidth={350}
        margin="auto"
      >
        <Typography>{text.everyDay[language]}</Typography>
        <Box>
          <Typography
            align="right"
            variant="caption"
            display="block"
          >{`${timeSanitizer(
            openingHours.morningAfternoon.start
          )} - ${timeSanitizer(
            openingHours.morningAfternoon.finish
          )}`}</Typography>
          <Typography
            align="right"
            variant="caption"
            display="block"
          >{`${timeSanitizer(
            openingHours.afternoonEvening.start
          )} - ${timeSanitizer(
            openingHours.afternoonEvening.finish
          )}`}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

const stp = (s) => ({
  language: s.language,
})

export default connect(stp)(Hours)
