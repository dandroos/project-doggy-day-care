import {
  SET_AT_TOP,
  SET_BOOKING_FORM,
  SET_IS_MOBILE,
  SET_LANGUAGE,
  SET_LOCATION,
  SET_MOBILE_MENU,
  SET_PAGE_TRANSITIONING,
  SET_SITE_READY,
  SET_TOAST,
} from "./types"

const initialState = {
  atTop: null,
  isMobile: null,
  location: null,
  pageTransitioning: true,
  language: "en", // change to null
  mobileMenu: false,
  siteReady: false,
  toast: {
    open: false,
    severity: "success",
    msg: "",
  },
  bookingForm: {
    open: false,
  },
}

export const reducer = (state = initialState, { type, payload }) => {
  console.log(type, payload)
  const newState = Object.assign({}, state)

  switch (type) {
    case SET_IS_MOBILE:
      newState.isMobile = payload
      break
    case SET_AT_TOP:
      newState.atTop = payload
      break
    case SET_LOCATION:
      newState.location = payload
      break
    case SET_MOBILE_MENU:
      newState.mobileMenu = payload
      break
    case SET_SITE_READY:
      newState.siteReady = payload
      break
    case SET_TOAST:
      newState.toast = payload
      break
    case SET_LANGUAGE:
      newState.language = payload
      break
    case SET_PAGE_TRANSITIONING:
      newState.pageTransitioning = payload
      break
    case SET_BOOKING_FORM:
      newState.bookingForm = payload
      break
    default:
      break
  }
  return newState
}
