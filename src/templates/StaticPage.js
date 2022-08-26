import { Alert, Box, Button, Link as MLink, Typography } from "@mui/material"
import { Calendar, Phone } from "mdi-material-ui"
import { Link, graphql } from "gatsby"
import React, { useEffect } from "react"
import { setBookingForm, setLanguage, setLocation } from "../redux/actions"

import BookingForm from "../components/BookingForm"
import HeadComponent from "../components/Head"
import PageWrapper from "../components/PageWrapper"
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

  const fm = Object.assign({}, data.main.frontmatter)
  const text = Object.assign(
    {},
    {
      ...data.dictionary.childMarkdownRemark.frontmatter,
      ...data.content.childMarkdownRemark.frontmatter,
    }
  )
  return (
    <PageWrapper image={fm.featured_image} title={title}>
      {linkId === "booking" && (
        <Alert variant="outlined" severity="info" sx={{ my: 2 }}>
          {text.before_booking[language]}
          <MLink
            color="secondary"
            display="block"
            onClick={() => dispatch(setBookingForm({ open: true }))}
          >
            "{text.take_me_to_form[language]}"
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
            {fm.price}€ {text.per_day[language]}
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
            {text.for_more_information[language]}...
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
            {text.contact_us[language]}
          </Button>
        </Box>
      ) : (
        <>
          <Button
            variant="contained"
            onClick={() => dispatch(setBookingForm({ open: true }))}
            startIcon={<Calendar />}
            fullWidth
          >
            {text.make_a_reservation[language]}
          </Button>
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
    main: markdownRemark(id: { eq: $id }) {
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
    content: file(
      sourceInstanceName: { eq: "content" }
      name: { eq: "book" }
      extension: { eq: "md" }
    ) {
      childMarkdownRemark {
        frontmatter {
          before_booking {
            en
            es
            de
          }
          take_me_to_form {
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
          for_more_information {
            en
            es
            de
          }
          contact_us {
            en
            es
            de
          }
          only {
            en
            es
            de
          }
          per_day {
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
`
