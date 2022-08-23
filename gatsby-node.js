// const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")
const runQueries = require("./graphql-page-queries")
const { internal } = require("./src/siteLinks")

// CREATING A SLUG HOOK
// exports.onCreateNode = async ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }

// CREATE PAGES
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const query = await graphql(`
    {
      site {
        siteMetadata {
          supportedLanguages
        }
      }
    }
  `)

  const data = await runQueries(graphql)
  console.log(data)
  const { supportedLanguages } = query.data.site.siteMetadata
  const getTitle = (id, language) =>
    internal.filter((i) => i.id === id)[0].label[language]
  const getUrl = (id, language) =>
    internal.filter((i) => i.id === id)[0].url[language]
  supportedLanguages.map((l) => {
    internal.map((link) =>
      createPage({
        path: `/${l + link.url[l]}`,
        component: path.resolve("src/templates/temp.js"),
        context: {
          title: link.label[l],
        },
      })
    )
    data.map((i) =>
      createPage({
        path: `/${l + getUrl(i.linkId, l)}`,
        component: path.resolve("src/templates/StaticPage.js"),
        context: {
          linkId: i.linkId,
          id: i.id,
          language: l,
          title: getTitle(i.linkId, l),
        },
      })
    )
    createPage({
      path: `/${l + getUrl("contact", l)}`,
      component: path.resolve("src/templates/Contact.js"),
      context: {
        language: l,
        title: getTitle("contact", l),
      },
    })
    createPage({
      path: `/${l + getUrl("home", l)}`,
      component: path.resolve("src/templates/Homepage.js"),
      context: {
        language: l,
      },
    })
    // createPage({
    //   path: `/${l + getUrl("dogs", l)}`,
    //   component: path.resolve("src/templates/Dogs.js"),
    //   context: {
    //     language: l,
    //     title: getTitle("dogs", l),
    //   },
    // })
    return
  })
}
