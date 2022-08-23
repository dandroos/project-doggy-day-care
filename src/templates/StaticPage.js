import {
  Alert,
  Box,
  Button,
  Divider,
  Link as MLink,
  Typography,
} from "@mui/material"
import { Link, graphql } from "gatsby"
import React, { useEffect } from "react"
import { setLanguage, setLocation } from "../redux/actions"

import BookingForm from "../components/BookingForm"
import HeadComponent from "../components/Head"
import PageWrapper from "../components/PageWrapper"
import { Phone } from "mdi-material-ui"
import ReactMarkdown from "react-markdown"
import { connect } from "react-redux"
import { internal } from "../siteLinks"

const StaticPage = ({ dispatch, data, pageContext }) => {
  const { title, language, linkId } = pageContext
  useEffect(() => {
    dispatch(setLanguage(language))
    dispatch(setLocation(linkId))
    //eslint-disable-next-line
  }, [])
  const fm = Object.assign({}, data.markdownRemark.frontmatter)
  const text = {
    forMoreInfo: {
      en: "For more information...",
      es: "Para más información...",
      de: "Für mehr Informationen...",
    },
    contactUs: {
      en: "Contact us",
      es: "Contáctenos",
      de: "Kontaktiere uns",
    },
    only: {
      en: "Only",
      es: "Solo",
      de: "Nur",
    },
    perDay: {
      en: "per day",
      es: "por día",
      de: "pro Tag",
    },
    makeReservation: {
      en: "Make a reservation now!",
      es: "¡Haz una reserva ahora!",
      de: "Reservieren Sie jetzt!",
    },
    pleaseRead: {
      en: "Please read the information below before making a reservation.",
      es: "Por favor, lea la información a continuación antes de hacer una reserva.",
      de: "Bitte lesen Sie die folgenden Informationen, bevor Sie eine Reservierung vornehmen.",
    },
    takeMeToForm: {
      en: `"I have already read the information. Please take me to the form."`,
      es: `"Ya he leído la información. Por favor, llévame al formulario."`,
      de: `"Ich habe die Informationen bereits gelesen. Bitte bringen Sie mich zum Formular."`,
    },
  }
  return (
    <PageWrapper image={fm.featured_image} title={title}>
      {linkId === "booking" && (
        <Alert variant="outlined" severity="info" sx={{ mt: 2 }}>
          {text.pleaseRead[language]}
          <MLink color="secondary" display="block" href="#booking-form">
            {text.takeMeToForm[language]}
          </MLink>
        </Alert>
      )}
      {fm.price && (
        <Box
          bgcolor="primary.main"
          display="inline-block"
          py={0.25}
          pt={0.5}
          px={1}
          mb={2}
        >
          <Typography variant="button" fontWeight="bold">
            {text.only[language]}
            {` `}
            {fm.price}€ {text.perDay[language]}
          </Typography>
        </Box>
      )}
      <ReactMarkdown
        includeElementIndex
        components={{
          h1: ({ children }) => {
            return (
              <Typography variant="h4" gutterBottom>
                {children}
              </Typography>
            )
          },
          a: ({ href, children }) => (
            <MLink href={href} target="_blank">
              {children}
            </MLink>
          ),
          p: ({ children, index }) => {
            return (
              <Typography paragraph variant={index === 0 ? "lead" : undefined}>
                {children}
              </Typography>
            )
          },
        }}
      >
        {fm.text[language]}
      </ReactMarkdown>
      {linkId !== "booking" ? (
        <Box textAlign="center">
          <Typography variant="caption" display="block">
            {text.forMoreInfo[language]}
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Phone />}
            component={Link}
            to={`/${
              language +
              internal.filter((i) => i.id === "contact")[0].url[language]
            }`}
          >
            {text.contactUs[language]}
          </Button>
        </Box>
      ) : (
        <>
          <Divider sx={{ my: 4 }} id="booking-form" />
          <BookingForm />
        </>
      )}
    </PageWrapper>
  )
}

const stp = (s) => ({
  location: s.location,
})

export default connect(stp)(StaticPage)

export const Head = ({ pageContext }) => (
  <HeadComponent title={pageContext.title} />
)

export const query = graphql`
  query ($id: String) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        featured_image {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              quality: 85
              transformOptions: { grayscale: true }
            )
          }
        }
        text {
          en
          es
          de
        }
        price
      }
    }
  }
`
