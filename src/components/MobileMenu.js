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
import { Link, graphql, useStaticQuery } from "gatsby"
import { external, internal } from "../siteLinks"

import { Close } from "mdi-material-ui"
import LanguageSelector from "./LanguageSelector"
import Logo from "./Logo"
import React from "react"
import { connect } from "react-redux"
import { setMobileMenu } from "../redux/actions"

const MobileMenu = ({ dispatch, isOpen, language }) => {
  const handleClose = () => {
    dispatch(setMobileMenu(false))
  }
  const theme = useTheme()

  const { facebook } = useStaticQuery(graphql`
    {
      file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "contact" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            facebook
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter
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
          justifyContent="space-evenly"
          p={8}
        >
          <Logo />
          <List sx={{ width: "100%", textAlign: "center" }}>
            {internal.map(
              (i, ind) =>
                i.id !== "home" && (
                  <ListItemButton
                    key={ind}
                    component={Link}
                    activeStyle={{ fontWeight: "bold" }}
                    to={`/${language + i.url[language]}`}
                    sx={{ textAlign: "center" }}
                    onClick={handleClose}
                  >
                    <ListItemText
                      primary={i.label[language]}
                      primaryTypographyProps={{
                        variant: "button",
                        sx: { fontWeight: "inherit" },
                      }}
                    />
                  </ListItemButton>
                )
            )}
          </List>
          {external.map((i, ind) => (
            <IconButton
              key={ind}
              href={`${
                i.url +
                (() => {
                  switch (i.name.toLowerCase()) {
                    case "facebook":
                      return facebook
                    default:
                      return
                  }
                })()
              }`}
              target="_blank"
            >
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
