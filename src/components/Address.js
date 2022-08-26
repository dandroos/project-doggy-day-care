import { Box, Typography } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"

import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { connect } from "react-redux"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

const Address = ({ isMobile }) => {
  const { business_address } = useStaticQuery(graphql`
    {
      file(sourceInstanceName: { eq: "content" }, name: { eq: "location" }) {
        childMarkdownRemark {
          frontmatter {
            business_address
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter

  const metadata = useSiteMetadata()
  return (
    <Box py={2}>
      <StaticImage
        src="../images/logo-without-text2.png"
        alt="Manohecha logo"
        width={180}
        placeholder="none"
      />
      <Typography variant="h4" mb={-0.6}>
        {metadata.title1}
      </Typography>
      <Typography
        fontSize={isMobile ? 13 : undefined}
        letterSpacing={0.5}
        textTransform="uppercase"
      >
        {metadata.title2}
      </Typography>
      <Typography>{business_address}</Typography>
    </Box>
  )
}

const stp = (s) => ({
  isMobile: s.isMobile,
})

export default connect(stp)(Address)
