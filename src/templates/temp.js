import { Container, Typography } from "@mui/material"

import HeadComponent from "../components/Head"
import React from "react"

const Temp = ({ pageContext }) => {
  const { title } = pageContext

  return (
    <Container>
      <Typography variant="h2">{title}</Typography>
    </Container>
  )
}

export default Temp

export const Head = ({ pageContext }) => (
  <HeadComponent title={pageContext.title} />
)
