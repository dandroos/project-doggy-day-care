import { Box, Link, Typography } from "@mui/material"

import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { connect } from "react-redux"

const SiteCredit = ({ language }) => {
  const text = {
    siteBy: {
      en: "Site by ",
      es: "Sitio web de ",
      de: "Webseite von ",
    },
  }
  return (
    <Box my={2} display="block">
      <Box component="a" href="https://daveandrews.dev" target="_blank">
        <StaticImage src="../images/dd-light-text.png" width={50} />
      </Box>
      <Typography variant="caption" display="block">
        {text.siteBy[language]}
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
