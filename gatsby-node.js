// const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")
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
  const { supportedLanguages } = query.data.site.siteMetadata
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
    createPage({
      path: `/${l + internal.filter((i) => i.id === "home")[0].url[l]}`,
      component: path.resolve("src/templates/Homepage.js"),
      context: {
        language: l,
      },
    })
    return
  })
}
