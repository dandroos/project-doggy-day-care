import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          supportedLanguages
          siteUrl
          title1
          title2
        }
      }
    }
  `)

  return data.site.siteMetadata
}
