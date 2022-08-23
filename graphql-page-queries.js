const runQueries = async (graphql) => {
  const arr = []
  const dogs = await graphql(`
    {
      file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "dogs" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          id
        }
      }
    }
  `)
  arr.push({ linkId: "dogs", id: dogs.data.file.childMarkdownRemark.id })

  const cats = await graphql(`
    {
      file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "cats" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          id
        }
      }
    }
  `)
  arr.push({ linkId: "cats", id: cats.data.file.childMarkdownRemark.id })
  const services = await graphql(`
    {
      file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "services" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          id
        }
      }
    }
  `)
  arr.push({
    linkId: "services",
    id: services.data.file.childMarkdownRemark.id,
  })
  const about = await graphql(`
    {
      file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "about" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          id
        }
      }
    }
  `)
  arr.push({
    linkId: "about",
    id: about.data.file.childMarkdownRemark.id,
  })
  const book = await graphql(`
    {
      file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "book" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          id
        }
      }
    }
  `)
  arr.push({
    linkId: "booking",
    id: book.data.file.childMarkdownRemark.id,
  })
  return arr
}

module.exports = runQueries
