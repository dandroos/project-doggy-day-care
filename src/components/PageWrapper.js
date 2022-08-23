import { Box, Container, Typography, useTheme } from "@mui/material"

import BackgroundImage from "gatsby-background-image"
import React from "react"
import { connect } from "react-redux"
import { convertToBgImage } from "gbimage-bridge"
import { getImage } from "gatsby-plugin-image"

const PageWrapper = ({ title, image, children, isMobile }) => {
  const bgImg = convertToBgImage(getImage(image))
  const theme = useTheme()
  return (
    <Box>
      <Box component={BackgroundImage} {...bgImg}>
        <Box
          display="flex"
          flexDirection="column"
          // alignItems="center"
          justifyContent="end"
          height="30vh"
          minHeight={isMobile ? 340 : 550}
          sx={{
            background: `linear-gradient(to top, ${theme.palette.primary.main}aa, ${theme.palette.primary.main}ee)`,
          }}
          pt={10}
        >
          <Box
            pt={4}
            mb="-.5px"
            sx={{
              background: `linear-gradient(to top, ${theme.palette.common.white}, transparent)`,
            }}
          >
            <Container>
              <Typography mt={4} variant="h2">
                {title}
              </Typography>
            </Container>
          </Box>
        </Box>
      </Box>
      <Container sx={{ pb: 5 }}>{children}</Container>
    </Box>
  )
}

const stp = (s) => ({
  isMobile: s.isMobile,
})

export default connect(stp)(PageWrapper)
