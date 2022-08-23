import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"
import { Calendar, Email, Phone } from "mdi-material-ui"
import { graphql, useStaticQuery } from "gatsby"

import { Link } from "gatsby"
import React from "react"
import ReactCountryFlag from "react-country-flag"
import { connect } from "react-redux"
import { internal } from "../siteLinks"

const ContactList = ({ language }) => {
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
    makeReservation: {
      en: "Make a reservation",
      es: "Hacer una reserva",
      de: "Eine Reservierung machen",
    },
  }

  const ContactItem = ({
    reservation,
    href,
    Icon,
    primary,
    secondary,
    flags,
  }) => (
    <ListItemButton
      divider={!reservation}
      component={reservation ? Link : "a"}
      href={reservation ? undefined : href}
      to={reservation ? href : undefined}
      target={reservation ? undefined : "_blank"}
    >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText
        disableTypography
        primary={
          <Box>
            <Typography display="inline" mr={2}>
              {primary}
            </Typography>
            {flags &&
              flags.map((i, ind) => (
                <ReactCountryFlag
                  countryCode={i}
                  svg
                  style={{ marginRight: flags.length - 1 !== ind ? 10 : 0 }}
                />
              ))}
          </Box>
        }
        secondary={
          <Typography variant="body2" fontStyle="italic">
            {secondary}
          </Typography>
        }
        sx={{ display: "flex", justifyContent: "space-between" }}
      />
    </ListItemButton>
  )
  return (
    <Box py={2}>
      <List disablePadding>
        <ContactItem
          href={`tel:34${phoneNumber_en}`}
          Icon={Phone}
          primary={text.callUs[language]}
          secondary={`${phoneNumber_en.substring(
            0,
            3
          )} ${phoneNumber_en.substring(3, 6)} ${phoneNumber_en.substring(6)}`}
          flags={["gb"]}
        />
        <ContactItem
          href={`tel:34${phoneNumber_es}`}
          Icon={Phone}
          primary={text.callUs[language]}
          secondary={`${phoneNumber_es.substring(
            0,
            3
          )} ${phoneNumber_es.substring(3, 6)} ${phoneNumber_es.substring(6)}`}
          flags={["es", "gb"]}
        />
        <ContactItem
          href={`mailto:${emailAddress}`}
          Icon={Email}
          primary="Email"
          secondary={emailAddress}
        />
        <ContactItem
          reservation
          href={`/${
            language +
            internal.filter((i) => i.id === "booking")[0].url[language]
          }`}
          Icon={Calendar}
          primary={text.makeReservation[language]}
          secondary={
            internal.filter((i) => i.id === "booking")[0].label[language]
          }
        />
      </List>
    </Box>
  )
}

const stp = (s) => ({
  language: s.language,
})

export default connect(stp)(ContactList)
