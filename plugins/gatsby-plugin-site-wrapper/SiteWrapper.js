import { CssBaseline, ThemeProvider } from "@mui/material"

import NetlifyForms from "../../src/components/NetlifyForms"
import React from "react"
import { theme } from "../../src/theme"

const SiteWrapper = ({ children }) => {
  return (
    <>
      <NetlifyForms />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  )
}

export default SiteWrapper
