import Layout from "./src/components/Layout"
import React from "react"
import { typography } from "./style"

export const wrapPageElement = ({ props, element }) => {
  return <Layout {...props}>{element}</Layout>
}

// default for a site in English only
export const onRenderBody = ({
  setHtmlAttributes,
  setHeadComponents,
  //   pathname,
  //   loadPageDataSync,
}) => {
  //   // if setting language via PageContext...
  //   if (typeof loadPageDataSync === "function") {
  //     const {
  //       result: { pageContext },
  //     } = loadPageDataSync(pathname)
  //     setHtmlAttributes({ lang: pageContext.language })
  //   }
  setHtmlAttributes({ lang: "en" })
  setHeadComponents([
    <link key="gf1" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link
      key="gf2"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="true"
    />,
    <link
      key="gf3"
      href={`https://fonts.googleapis.com/css2?family=${typography.fontFamily
        .split(" ")
        .join("+")}:wght@${typography.weights.body};${
        typography.weights.heading
      }&display=swap`}
      rel="stylesheet"
    ></link>,
  ])
}
