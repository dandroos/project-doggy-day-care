import React, { useEffect } from "react"
import { setLanguage, setLocation } from "../redux/actions"

import ContactForm from "../components/ContactForm"
import ContactList from "../components/ContactList"
import HeadComponent from "../components/Head"
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

  return (
    <PageWrapper title={title} image={fm.featured_image}>
      <Typography variant="lead" gutterBottom>
        {fm.contact_method_intro[language]}...
      </Typography>
      <ContactList />
      <ContactForm />
    </PageWrapper>
  )
}

export default connect()(Contact)

export const Head = ({ pageContext }) => (
  <HeadComponent title={pageContext.title} />
)

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
          contact_method_intro {
            en
            es
            de
          }
        }
      }
    }
  }
`
