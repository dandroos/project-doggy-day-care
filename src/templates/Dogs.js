import React, { useEffect } from "react"
import { setLanguage, setLocation } from "../redux/actions"

import HeadComponent from "../components/Head"
import PageWrapper from "../components/PageWrapper"
import { connect } from "react-redux"
import { graphql } from "gatsby"

const Dogs = ({ dispatch, data, pageContext }) => {
  const { title, language } = pageContext
  useEffect(() => {
    dispatch(setLanguage(language))
    dispatch(setLocation("dogs"))
  }, [])
  const fm = Object.assign({}, data.file.childMarkdownRemark.frontmatter)
  return (
    <PageWrapper image={fm.featured_image} title={title}>
      Dogs
    </PageWrapper>
  )
}

export default connect()(Dogs)

export const Head = ({ pageContext }) => (
  <HeadComponent title={pageContext.title} />
)

export const query = graphql`
  query {
    file(
      sourceInstanceName: { eq: "content" }
      name: { eq: "dogs" }
      extension: { eq: "md" }
    ) {
      childMarkdownRemark {
        frontmatter {
          featured_image {
            childImageSharp {
              gatsbyImageData(
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
  }
`
