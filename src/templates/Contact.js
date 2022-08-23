import React, { useEffect } from "react"
import { setLanguage, setLocation } from "../redux/actions"

import ContactForm from "../components/ContactForm"
import ContactList from "../components/ContactList"
import PageWrapper from "../components/PageWrapper"
import { Typography } from "@mui/material"
import { connect } from "react-redux"
import { graphql } from "gatsby"

const Contact = ({ dispatch, pageContext, data }) => {
  const { title, language } = pageContext
  const fm = Object.assign({}, data.file.childMarkdownRemark.frontmatter)
  useEffect(() => {
    dispatch(setLocation("contact"))
    dispatch(setLanguage(language))
    //eslint-disable-next-line
  }, [])

  const text = {
    contactMethods: {
      en: "You can contact us using the following methods",
      es: "Puede ponerse en contacto con nosotros utilizando los siguientes métodos",
      de: "Sie können uns über die folgenden Methoden kontaktieren",
    },
  }

  return (
    <PageWrapper title={title} image={fm.featured_image}>
      <Typography variant="lead" gutterBottom>
        {text.contactMethods[language]}...
      </Typography>
      <ContactList />
      <ContactForm />
    </PageWrapper>
  )
}

export default connect()(Contact)

export const query = graphql`
  {
    file(
      sourceInstanceName: { eq: "content" }
      name: { eq: "contactpage" }
      extension: { eq: "md" }
    ) {
      childMarkdownRemark {
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
        }
      }
    }
  }
`
