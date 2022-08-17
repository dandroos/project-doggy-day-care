import { Box, Typography } from "@mui/material"

import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { connect } from "react-redux"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

const Logo = ({ isMobile }) => {
  const metadata = useSiteMetadata()
  return (
    <Box textAlign="center">
      <StaticImage
        src="../images/logo-without-text2.png"
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
    </Box>
  )
}

const stp = (s) => ({
  isMobile: s.isMobile,
})

export default connect(stp)(Logo)
