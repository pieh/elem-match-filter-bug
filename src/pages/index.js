import React from "react"
import { graphql } from "gatsby"

const Index = ({ data }) => {
  return (
    <>
      <h2>MarkdownRemark with "car" category</h2>
      <pre>{JSON.stringify(data.postsWithCarCategory, null, 2)}</pre>
      <div>
        we have 3 categories - all of them have "category" array as null we only
        get 1 category as a result of above query containing "elemMatch"
      </div>
      <h2>All categories (subset of MarkdownRemark)</h2>
      <pre>{JSON.stringify(data.categories, null, 2)}</pre>
      <h2>All posts (subset of MarkdownRemark)</h2>
      <pre>{JSON.stringify(data.posts, null, 2)}</pre>
    </>
  )
}

export default Index

export const pageQuery = graphql`
  {
    postsWithCarCategory: allMarkdownRemark(
      filter: {
        frontmatter: {
          # we can work around the problem by adding more filters
          # type: { eq: "post" }
          category: {
            elemMatch: { frontmatter: { category_id: { eq: "car" } } }
          }
        }
      }
    ) {
      nodes {
        frontmatter {
          title
          type
          category {
            frontmatter {
              title
              category_id
            }
          }
        }
      }
    }

    # we have 3 categories - all of them have "category" array as null
    # we only get 1 category as a result of above query containing "elemMatch"
    categories: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "category" } } }
    ) {
      nodes {
        frontmatter {
          title
          type
          category {
            frontmatter {
              title
              type
            }
          }
        }
      }
    }

    posts: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "post" } } }
    ) {
      nodes {
        frontmatter {
          title
          type
          category {
            frontmatter {
              title
              type
            }
          }
        }
      }
    }
  }
`
