import { internal } from "../siteLinks"

export const useLangRedirect = () => ({
  redirect: ({ language, pageId }) => {
    return (window.location = `/${
      language + internal.filter((i) => i.id === pageId)[0].url[language]
    }`)
  },
})
