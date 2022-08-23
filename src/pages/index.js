import React, { useEffect } from "react"

import HeadComponent from "../components/Head"
import { connect } from "react-redux"
import { useLangRedirect } from "../hooks/useLangRedirect"

const Index = () => {
  const useRedirect = useLangRedirect()
  useEffect(() => {
    const detectedLanguage = useRedirect.detect()
    useRedirect.redirect({ language: detectedLanguage, pageId: "home" })
    //eslint-disable-next-line
  }, [])
  return null
}

const stp = (s) => ({
  isMobile: s.isMobile,
})

export default connect(stp)(Index)

export const Head = () => <HeadComponent />
