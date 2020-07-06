// const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes(`
    type MarkdownRemark implements Node {
      id: ID
      frontmatter: Frontmatter
  }
  `)

  actions.createTypes(
    schema.buildObjectType({
      name: `Frontmatter`,
      fields: {
        // list of categories for a post
        category: {
          type: `[MarkdownRemark]`,
          extensions: {
            link: {
              by: "frontmatter.category_id",
            },
          },
        },
        // list of posts for a category
        //   posts: {
        //     type: `[MarkdownRemark]`,
        //     resolve: (source, args, context) => {
        //       const categoryId = source.category_id

        //       if (!categoryId) {
        //         return []
        //       }

        //       return context.nodeModel.runQuery({
        //         query: {
        //           filter: {
        //             frontmatter: {

        //             }
        //           }
        //         },
        //         type: `MarkdownRemark`,
        //         firstOnly: false,
        //       })
        //     },
        //   },
      },
    })
  )
}

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions

//   const blogPost = path.resolve(`./src/templates/blog-post.js`)
//   const result = await graphql(
//     `
//       {
//         allMarkdownRemark(
//           sort: { fields: [frontmatter___date], order: DESC }
//           limit: 1000
//         ) {
//           edges {
//             node {
//               fields {
//                 slug
//               }
//               frontmatter {
//                 title
//               }
//             }
//           }
//         }
//       }
//     `
//   )

//   if (result.errors) {
//     throw result.errors
//   }

//   // Create blog posts pages.
//   const posts = result.data.allMarkdownRemark.edges

//   posts.forEach((post, index) => {
//     const previous = index === posts.length - 1 ? null : posts[index + 1].node
//     const next = index === 0 ? null : posts[index - 1].node

//     createPage({
//       path: post.node.fields.slug,
//       component: blogPost,
//       context: {
//         slug: post.node.fields.slug,
//         previous,
//         next,
//       },
//     })
//   })
// }

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
