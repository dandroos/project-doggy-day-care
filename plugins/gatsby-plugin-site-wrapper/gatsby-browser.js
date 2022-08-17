import React from "react"
import SiteWrapper from "./SiteWrapper"

export const wrapRootElement = ({ element }) => {
  return <SiteWrapper>{element}</SiteWrapper>
}
