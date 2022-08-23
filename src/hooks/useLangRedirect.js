import detectBrowserLanguage from "detect-browser-language"
import { internal } from "../siteLinks"
import { useSiteMetadata } from "./useSiteMetadata"

export const useLangRedirect = () => {
  const { supportedLanguages } = useSiteMetadata()
  return {
    detect: () => {
      // see if lang pref stored
      const defLang = localStorage.getItem("manohecha_def_lang")
      if (defLang) {
        return defLang
      } else {
        const browserLang = detectBrowserLanguage().substring(0, 2)
        if (supportedLanguages.includes(browserLang)) {
          return browserLang
        } else {
          return "es"
        }
      }
    },
    redirect: ({ language, pageId }) => {
      return (window.location = `/${
        language + internal.filter((i) => i.id === pageId)[0].url[language]
      }`)
    },
  }
}
