import { Box, Link, Typography } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"

import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { connect } from "react-redux"

const SiteCredit = ({ language }) => {
  const { site_by } = useStaticQuery(graphql`
    {
      file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "dictionary" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            site_by {
              en
              es
              de
            }
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter
  return (
    <Box my={2} display="block">
      <Box component="a" href="https://daveandrews.dev" target="_blank">
        <StaticImage
          src="../images/dd-light-text.png"
          alt="Dave Andrews logo"
          width={50}
        />
      </Box>
      <Typography variant="caption" display="block">
        {site_by[language] + ` `}
        <Link
          underline="hover"
          color="inherit"
          href="https://daveandrews.dev"
          target="_blank"
        >
          Dave Andrews
        </Link>
      </Typography>
    </Box>
  )
}
const stp = (s) => ({
  language: s.language,
})

export default connect(stp)(SiteCredit)
