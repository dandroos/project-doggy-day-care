import {
  SET_AT_TOP,
  SET_IS_MOBILE,
  SET_LANGUAGE,
  SET_LOCATION,
  SET_MOBILE_MENU,
  SET_PAGE_TRANSITIONING,
  SET_SITE_READY,
  SET_TOAST,
} from "./types"

export const setIsMobile = (payload) => ({
  type: SET_IS_MOBILE,
  payload,
})

export const setAtTop = (payload) => ({
  type: SET_AT_TOP,
  payload,
})

export const setLocation = (payload) => ({
  type: SET_LOCATION,
  payload,
})

export const setMobileMenu = (payload) => ({
  type: SET_MOBILE_MENU,
  payload,
})

export const setSiteReady = (payload) => ({
  type: SET_SITE_READY,
  payload,
})

export const setToast = (payload) => ({
  type: SET_TOAST,
  payload,
})

export const setLanguage = (payload) => ({
  type: SET_LANGUAGE,
  payload,
})

export const setPageTransitioning = (payload) => ({
  type: SET_PAGE_TRANSITIONING,
  payload,
})
