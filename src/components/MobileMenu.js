import {
  Box,
  Dialog,
  Fab,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Portal,
  Slide,
  useTheme,
} from "@mui/material"
import { external, internal } from "../siteLinks"

import { Close } from "mdi-material-ui"
import LanguageSelector from "./LanguageSelector"
import { Link } from "gatsby"
import Logo from "./Logo"
import React from "react"
import { connect } from "react-redux"
import { setMobileMenu } from "../redux/actions"

const MobileMenu = ({ dispatch, isOpen, language }) => {
  const handleClose = () => {
    dispatch(setMobileMenu(false))
  }
  const theme = useTheme()
  return (
    <Portal>
      <Dialog
        TransitionComponent={Slide}
        open={isOpen}
        fullScreen
        onClose={handleClose}
      >
        <Fab
          onClick={handleClose}
          sx={{ position: "fixed", top: 20, right: 20 }}
          color="secondary"
        >
          <Close />
        </Fab>
        <Box
          boxShadow={`inset 0 0 2rem ${theme.palette.common.black}aa`}
          width="100%"
          height="100%"
          bgcolor="primary.main"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
        >
          <Logo />
          <List sx={{ width: "100%", textAlign: "center" }}>
            {internal.map(
              (i) =>
                i.id !== "home" && (
                  <ListItemButton
                    component={Link}
                    activeStyle={{ fontWeight: "bold" }}
                    to={`/${language + i.url[language]}`}
                    sx={{ textAlign: "center" }}
                    onClick={handleClose}
                  >
                    <ListItemText
                      primary={i.label[language]}
                      primaryTypographyProps={{ sx: { fontWeight: "inherit" } }}
                    />
                  </ListItemButton>
                )
            )}
          </List>
          {external.map((i) => (
            <IconButton>
              <i.Icon />
            </IconButton>
          ))}
          <LanguageSelector />
        </Box>
      </Dialog>
    </Portal>
  )
}

const stp = (s) => ({
  isOpen: s.mobileMenu,
  language: s.language,
})

export default connect(stp)(MobileMenu)
