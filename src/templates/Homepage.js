import "react-responsive-carousel/lib/styles/carousel.min.css"

import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Cat, Dog } from "mdi-material-ui"
import { Link, graphql } from "gatsby"
import React, { useEffect } from "react"
import { setLanguage, setLocation } from "../redux/actions"

import BackgroundImage from "gatsby-background-image"
import { Carousel } from "react-responsive-carousel"
import HeadComponent from "../components/Head"
import { connect } from "react-redux"
import { convertToBgImage } from "gbimage-bridge"
import { getImage } from "gatsby-plugin-image"
import { internal } from "../siteLinks"

const Homepage = ({ dispatch, pageContext, data }) => {
  const { language } = pageContext
  useEffect(() => {
    dispatch(setLocation("home"))
    dispatch(setLanguage(language))
    //eslint-disable-next-line
  }, [])
  const fm = Object.assign({}, data.file.childMarkdownRemark.frontmatter)

  const isLandscape = useMediaQuery("(orientation: landscape)")
  const theme = useTheme()
  return (
    <Box position="relative">
      <Box height="100vh" width="100%" position="absolute">
        <Box
          position="absolute"
          top={0}
          bottom={0}
          right={0}
          left={0}
          zIndex={300}
          sx={{
            background: `radial-gradient(${theme.palette.primary.main}99, ${theme.palette.primary.main}ff)`,
          }}
        />
        <Box
          position="absolute"
          zIndex={6000}
          bottom={20}
          //   width="100%"
          left={20}
          //   textAlign="center"
          py={3}
        >
          <Container maxWidth="sm">
            <Typography variant="h3">
              {fm.homepage_heading[language]}
            </Typography>
            <Typography variant="lead" paragraph>
              {fm.homepage_lead[language]}
            </Typography>
            <Grid container spacing={0.5}>
              <Grid item xs={12} sm={6}>
                <Button
                  size="large"
                  color="secondary"
                  variant="contained"
                  fullWidth
                  startIcon={<Dog />}
                  component={Link}
                  to={`/${
                    language +
                    internal.filter((i) => i.id === "dogs")[0].url[language]
                  }`}
                >
                  {fm.homepage_cta_dogs[language]}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  size="large"
                  color="secondary"
                  variant="contained"
                  fullWidth
                  startIcon={<Cat />}
                  component={Link}
                  to={`/${
                    language +
                    internal.filter((i) => i.id === "cats")[0].url[language]
                  }`}
                >
                  {fm.homepage_cta_cats[language]}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showArrows={false}
        showIndicators={false}
        stopOnHover={false}
        showStatus={false}
        interval={5000}
      >
        {isLandscape
          ? fm.homepage_images_landscape.map((i, ind) => {
              const img = convertToBgImage(getImage(i.image))
              return (
                <Box
                  key={ind}
                  position="absolute"
                  width="100%"
                  height="100vh"
                  zIndex={5000}
                  component={BackgroundImage}
                  {...img}
                />
              )
            })
          : fm.homepage_images_portrait.map((i, ind) => {
              const img = convertToBgImage(getImage(i.image))
              return (
                <Box
                  key={ind}
                  position="absolute"
                  width="100%"
                  height="100vh"
                  zIndex={5000}
                  component={BackgroundImage}
                  {...img}
                />
              )
            })}
      </Carousel>
    </Box>
  )
}

export default connect()(Homepage)
export const Head = ({ pageContext }) => {
  return <HeadComponent />
}
export const query = graphql`
  query {
    file(
      sourceInstanceName: { eq: "content" }
      name: { eq: "home" }
      extension: { eq: "md" }
    ) {
      childMarkdownRemark {
        frontmatter {
          homepage_heading {
            en
            es
            de
          }
          homepage_cta_dogs {
            en
            es
            de
          }
          homepage_cta_cats {
            en
            es
            de
          }
          homepage_images_landscape {
            image {
              childImageSharp {
                gatsbyImageData(
                  quality: 90
                  placeholder: BLURRED
                  transformOptions: { grayscale: true }
                )
              }
            }
          }
          homepage_images_portrait {
            image {
              childImageSharp {
                gatsbyImageData(
                  quality: 90
                  placeholder: BLURRED
                  transformOptions: { grayscale: true }
                )
              }
            }
          }
          homepage_lead {
            en
            es
            de
          }
        }
      }
    }
  }
`
