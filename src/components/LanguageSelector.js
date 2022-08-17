import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material"
import React, { useState } from "react"

import ReactCountryFlag from "react-country-flag"
import { connect } from "react-redux"
import { useLangRedirect } from "../hooks/useLangRedirect"

const LanguageSelector = ({ location, language }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const langRedirector = useLangRedirect()
  const handleClose = () => setAnchorEl(null)
  const handleClick = ({ currentTarget }) => {
    langRedirector.redirect({
      language: currentTarget.id.replace("lang-", ""),
      pageId: location,
    })
    return handleClose()
  }

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.target)}>
        <ReactCountryFlag
          countryCode={(() => {
            switch (language) {
              case "en":
                return "gb"
              case "es":
                return "es"
              case "de":
                return "de"
              default:
                return
            }
          })()}
          svg
        />
      </IconButton>
      <Menu open={Boolean(anchorEl)} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem id="lang-en" onClick={handleClick}>
          <ListItemIcon>
            <ReactCountryFlag countryCode="gb" svg />
          </ListItemIcon>
          <ListItemText primary="English" />
        </MenuItem>
        <MenuItem id="lang-es" onClick={handleClick}>
          <ListItemIcon>
            <ReactCountryFlag countryCode="es" svg />
          </ListItemIcon>
          <ListItemText primary="Español" />
        </MenuItem>
        <MenuItem id="lang-de" onClick={handleClick}>
          <ListItemIcon>
            <ReactCountryFlag countryCode="de" svg />
          </ListItemIcon>
          <ListItemText primary="Deutsch" />
        </MenuItem>
      </Menu>
    </>
  )
}

const stp = (s) => ({
  location: s.location,
  language: s.language,
})

export default connect(stp)(LanguageSelector)
