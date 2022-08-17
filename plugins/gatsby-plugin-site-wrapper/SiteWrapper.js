import { CssBaseline, ThemeProvider } from "@mui/material"

import React from "react"
import { theme } from "../../src/theme"

const SiteWrapper = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  )
}

export default SiteWrapper
