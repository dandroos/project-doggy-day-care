import { AnimatePresence, motion } from "framer-motion"
import { Box, useMediaQuery, useTheme } from "@mui/material"
import React, { useEffect } from "react"
import { setAtTop, setIsMobile, setPageTransitioning } from "../redux/actions"

import Footer from "./Footer"
import MobileMenu from "./MobileMenu"
import Navigation from "./Navigation"
import Toast from "./Toast"
import { connect } from "react-redux"

const Layout = ({ dispatch, location, children }) => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"))

  useEffect(() => {
    dispatch(setIsMobile(isMobile))
    //eslint-disable-next-line
  }, [isMobile])

  useEffect(() => {
    document.addEventListener("scroll", () => {
      dispatch(setAtTop(window.scrollY === 0))
    })
    dispatch(setAtTop(window.scrollY === 0))
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <Toast />
      <MobileMenu />
      <Navigation />
      <Box sx={{ overflow: "hidden" }}>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={location.pathname}
            initial={{ transform: `translateY(800px)`, opacity: 0 }}
            animate={{ transform: `translateY(0px)`, opacity: 1 }}
            exit={{ transform: `translateY(800px)`, opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
            onAnimationStart={(e) => {
              if (e.opacity !== 1) {
                dispatch(setPageTransitioning(true))
              }
            }}
            onAnimationComplete={(e) => {
              if (e.opacity === 1) {
                dispatch(setPageTransitioning(false))
              }
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              minHeight="100vh"
              justifyContent="space-between"
            >
              <Box component="main" minHeight="100vh">
                {/* <Toolbar />/ */}
                {children}
              </Box>
              <Box component="footer">
                <Footer />
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </>
  )
}

export default connect()(Layout)
