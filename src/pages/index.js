import HeadComponent from "../components/Head"
import React from "react"
import { Typography } from "@mui/material"
import { connect } from "react-redux"

const Index = ({ isMobile }) => {
  return (
    <Typography>
      You're viewing the {isMobile ? `mobile` : `desktop`} version.
    </Typography>
  )
}

const stp = (s) => ({
  isMobile: s.isMobile,
})

export default connect(stp)(Index)

export const Head = () => <HeadComponent />
