import Layout from "./src/components/Layout"
import React from "react"

export const wrapPageElement = ({ props, element }) => {
  return <Layout {...props}>{element}</Layout>
}

const transitionDelay = 500

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  if (location.action === "PUSH") {
    window.setTimeout(() => window.scrollTo(0, 0), transitionDelay)
  } else {
    const savedPosition = getSavedScrollPosition(location)
    window.setTimeout(
      () => window.scrollTo(...(savedPosition || [0, 0])),
      transitionDelay
    )
  }
  return false
}
