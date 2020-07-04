import { gql } from 'apollo-server-express';

export default gql`
  query getUserById($id: String!) {
    user(id: $id) {
      name
      email
      id
      username
      profileUrl
    }
  }

  mutation logoutUser {
    logout
  }

  query currentUser {
    me {
      name
      id
      email
      username
      provider
      profileUrl
      socialId
      friends {
        name
      }
    }
  }
`;
