import React from "react"
import Redux from "./Redux"

export const wrapRootElement = ({ element }) => {
  return <Redux>{element}</Redux>
}
