import { gql } from 'graphql-tag';

export const loginUser = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;
export const addUser = gql`
mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
        token
        user {
            _id
            username
        }
    }
}
`;
export const saveBook = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;
export const deleteBook = gql` 
mutation deleteBook($bookId: String!) {
        deleteBook(bookId: $bookId) {
            _id
        }
}
`;