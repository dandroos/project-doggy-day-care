import { Box, Typography } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"

import React from "react"
import { connect } from "react-redux"

const Hours = ({ language }) => {
  const { content, dictionary } = useStaticQuery(graphql`
    {
      content: file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "location" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            business_opening_hours {
              morning_afternoon {
                start
                finish
              }
              afternoon_evening {
                start
                finish
              }
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
            opening_hours {
              en
              es
              de
            }
            every_day {
              en
              es
              de
            }
          }
        }
      }
    }
  `)

  const { business_opening_hours } = content.childMarkdownRemark.frontmatter

  const text = Object.assign({}, dictionary.childMarkdownRemark.frontmatter)

  const timeSanitizer = (time) =>
    `${time.substring(time.charAt(0) === "0" ? 1 : 0, 2)}:${time.substring(2)}`
  return (
    <Box mb={2}>
      <Typography variant="h5" gutterBottom>
        {text.opening_hours[language]}
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        maxWidth={350}
        margin="auto"
      >
        <Typography>{text.every_day[language]}</Typography>
        <Box>
          <Typography
            align="right"
            variant="caption"
            display="block"
          >{`${timeSanitizer(
            business_opening_hours.morning_afternoon.start
          )} - ${timeSanitizer(
            business_opening_hours.morning_afternoon.finish
          )}`}</Typography>
          <Typography
            align="right"
            variant="caption"
            display="block"
          >{`${timeSanitizer(
            business_opening_hours.afternoon_evening.start
          )} - ${timeSanitizer(
            business_opening_hours.afternoon_evening.finish
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
