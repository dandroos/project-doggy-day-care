import React from "react"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

const HeadComponent = ({ title, description, ogImgOverride }) => {
  const metadata = useSiteMetadata()
  const metaDescription = description || metadata.description
  const metaTitle = title ? `${title} | ${metadata.title}` : metadata.title
  // const metaOgImg = ogImgOverride || ogImg  **needs to be added**
  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="og:title" content={metaTitle} />
      <meta name="og:type" content="website" />
      {/* <meta name="og:image" content={metadata.siteUrl + metaOgImg} />   */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </>
  )
}

export default HeadComponent
