import React from "react"
import { Provider } from "react-redux"
import { store } from "../../src/redux/store"

const Redux = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default Redux
