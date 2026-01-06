import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`

export const ALL_AUTHORS_NAMES = gql`
  query allAuthorsNames {
    allAuthors {
      name
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query me {
    me {
      username
      favoriteGenre
      id
    }
  }
`
export const ALL_GENRES = gql`
  query allGenres {
    allGenres
  }
`

export const ALL_BOOKS_AND_GENRES = gql`
  query allBooksAndGenres($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      id
    }
    allGenres
  }
`
