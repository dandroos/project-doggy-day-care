import * as React from "react"

import HeadComponent from "../components/Head"

const NotFoundPage = () => (
  <>
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </>
)

export default NotFoundPage

export const Head = () => <HeadComponent title="404: Missing page!" />
