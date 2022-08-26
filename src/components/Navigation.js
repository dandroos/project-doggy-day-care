import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link as MLink,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material"
import { Link, graphql, useStaticQuery } from "gatsby"
import { external, internal } from "../siteLinks"

import LanguageSelector from "./LanguageSelector"
import { Menu } from "mdi-material-ui"
import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { connect } from "react-redux"
import { setMobileMenu } from "../redux/actions"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

const Navigation = ({
  dispatch,
  atTop,
  isMobile,
  language,
  pageTransitioning,
}) => {
  const { title1, title2 } = useSiteMetadata()

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
    <Slide in={!pageTransitioning} direction="down">
      <AppBar
        color={atTop ? "transparent" : "primary"}
        sx={{ transition: "background-color .25s" }}
      >
        <Toolbar sx={{ my: atTop ? 0 : -0.95, transition: "all .25s" }}>
          <MLink
            display="flex"
            component={Link}
            to={`/${language}`}
            underline="none"
            color="common.black"
          >
            {atTop ? (
              <StaticImage
                src="../images/logo-without-text3.png"
                alt="Manohecha logo"
                width={50}
                quality={100}
                placeholder="none"
              />
            ) : (
              <StaticImage
                src="../images/logo-without-text3.png"
                alt="Manohecha logo"
                width={40}
                quality={100}
              />
            )}
            <Box
              ml={1}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              textAlign="center"
            >
              <Typography variant="h5" variantMapping={{ h5: "h1" }} mb={-0.6}>
                {title1}
              </Typography>
              <Typography
                letterSpacing={0.5}
                textTransform="uppercase"
                fontSize={isMobile ? 10 : 11}
              >
                {title2}
              </Typography>
            </Box>
          </MLink>
          <Box flexGrow={1} />
          {!isMobile ? (
            <>
              {internal.map(
                (i, ind) =>
                  i.id !== "home" && (
                    <Button
                      key={ind}
                      variant={i.id === "booking" ? "contained" : "text"}
                      color={i.id === "booking" ? "secondary" : "inherit"}
                      sx={{
                        textTransform: "none",
                        minWidth: "auto",
                        ml: ind !== 0 ? 1.5 : 0,
                      }}
                      component={Link}
                      to={`/${language + i.url[language]}`}
                      activeStyle={{ fontWeight: "bold" }}
                    >
                      {i.label[language]}
                    </Button>
                  )
              )}
              <Box>
                {external.map((i, ind) => (
                  <IconButton
                    color="inherit"
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
              </Box>
              <LanguageSelector />
            </>
          ) : (
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => dispatch(setMobileMenu(true))}
            >
              <Menu />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

const stp = (s) => ({
  isMobile: s.isMobile,
  language: s.language,
  pageTransitioning: s.pageTransitioning,
  atTop: s.atTop,
})

export default connect(stp)(Navigation)
