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
  const { content, dictionary } = useStaticQuery(graphql`
    {
      content: file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "contact" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            phone_number_en
            phone_number_es
            email_address
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
            call_us {
              en
              es
              de
            }
            make_a_reservation {
              en
              es
              de
            }
          }
        }
      }
    }
  `)
  const { phone_number_en, phone_number_es, email_address } =
    content.childMarkdownRemark.frontmatter

  const text = Object.assign({}, dictionary.childMarkdownRemark.frontmatter)

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
                  key={ind}
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
          href={`tel:34${phone_number_en}`}
          Icon={Phone}
          primary={text.call_us[language]}
          secondary={`${phone_number_en.substring(
            0,
            3
          )} ${phone_number_en.substring(3, 6)} ${phone_number_en.substring(
            6
          )}`}
          flags={["gb"]}
        />
        <ContactItem
          href={`tel:34${phone_number_es}`}
          Icon={Phone}
          primary={text.call_us[language]}
          secondary={`${phone_number_es.substring(
            0,
            3
          )} ${phone_number_es.substring(3, 6)} ${phone_number_es.substring(
            6
          )}`}
          flags={["es", "gb"]}
        />
        <ContactItem
          href={`mailto:${email_address}`}
          Icon={Email}
          primary="Email"
          secondary={email_address}
        />
        <ContactItem
          reservation
          href={`/${
            language +
            internal.filter((i) => i.id === "booking")[0].url[language]
          }`}
          Icon={Calendar}
          primary={text.make_a_reservation[language]}
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
