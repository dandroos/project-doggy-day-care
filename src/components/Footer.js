import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"

import Address from "./Address"
import ContactList from "./ContactList"
import Hours from "./Hours"
import LocationMap from "./LocationMap"
import React from "react"
import SiteCredit from "./SiteCredit"
import { connect } from "react-redux"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

const Footer = ({ language }) => {
  const getCopyrightYear = () => {
    const currentYear = new Date().getFullYear()
    if (currentYear > 2022) {
      return `2022 - ${currentYear}`
    } else {
      return `2022`
    }
  }
  const { title } = useSiteMetadata()
  const theme = useTheme()
  const { all_content } = useStaticQuery(graphql`
    {
      file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "dictionary" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            all_content {
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
    <Box
      textAlign="center"
      py={5}
      color="common.white"
      sx={{
        background: `linear-gradient(to bottom, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
      }}
      boxShadow={`inset 0 0 1rem ${theme.palette.common.black}`}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Address />
            <ContactList />
            <Hours />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocationMap />
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography variant="caption">
          {all_content[language] + ` `} &copy; {getCopyrightYear()} {title}
        </Typography>
        <SiteCredit />
      </Container>
    </Box>
  )
}

const stp = (s) => ({
  language: s.language,
})

export default connect(stp)(Footer)
