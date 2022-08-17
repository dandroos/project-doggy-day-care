import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"
import { Email, Phone } from "mdi-material-ui"
import { graphql, useStaticQuery } from "gatsby"

import React from "react"
import ReactCountryFlag from "react-country-flag"
import { connect } from "react-redux"

const FooterContact = ({ language }) => {
  const { phoneNumber_en, phoneNumber_es, emailAddress } =
    useStaticQuery(graphql`
      {
        file(
          sourceInstanceName: { eq: "content" }
          name: { eq: "contact" }
          extension: { eq: "md" }
        ) {
          childMarkdownRemark {
            frontmatter {
              phoneNumber_en
              phoneNumber_es
              emailAddress
            }
          }
        }
      }
    `).file.childMarkdownRemark.frontmatter
  const text = {
    callUs: {
      en: "Call us",
      es: "Llámanos",
      de: "Telefon",
    },
  }
  return (
    <Box py={2}>
      <List disablePadding>
        <ListItemButton
          divider
          component="a"
          href={`tel:34${phoneNumber_en}`}
          target="_blank"
        >
          <ListItemIcon>
            <Phone />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Box>
                <Typography display="inline" mr={2}>
                  {text.callUs[language]}
                </Typography>
                <ReactCountryFlag countryCode="gb" svg />
              </Box>
            }
            secondary={
              <Typography variant="caption">{`${phoneNumber_en.substring(
                0,
                3
              )} ${phoneNumber_en.substring(3, 6)} ${phoneNumber_en.substring(
                6
              )}`}</Typography>
            }
            sx={{ display: "flex", justifyContent: "space-between" }}
          />
        </ListItemButton>
        <ListItemButton
          divider
          component="a"
          href={`tel:34${phoneNumber_es}`}
          target="_blank"
        >
          <ListItemIcon>
            <Phone />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Box>
                <Typography display="inline" mr={2}>
                  {text.callUs[language]}
                </Typography>
                <ReactCountryFlag
                  countryCode="es"
                  svg
                  style={{ marginRight: 10 }}
                />
                <ReactCountryFlag countryCode="gb" svg />
              </Box>
            }
            secondary={
              <Typography variant="caption">{`${phoneNumber_es.substring(
                0,
                3
              )} ${phoneNumber_es.substring(3, 6)} ${phoneNumber_es.substring(
                6
              )}`}</Typography>
            }
            sx={{ display: "flex", justifyContent: "space-between" }}
          />
        </ListItemButton>
        <ListItemButton
          component="a"
          href={`mailto:${emailAddress}`}
          target="_blank"
        >
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Box>
                <Typography display="inline" mr={2}>
                  Email
                </Typography>
              </Box>
            }
            secondary={
              <Typography variant="caption">{emailAddress}</Typography>
            }
            sx={{ display: "flex", justifyContent: "space-between" }}
          />
        </ListItemButton>
      </List>
    </Box>
  )
}

const stp = (s) => ({
  language: s.language,
})

export default connect(stp)(FooterContact)
