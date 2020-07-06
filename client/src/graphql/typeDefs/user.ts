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
      profileUrl
      friends {
        id
        name
        profileUrl
      }
    }
  }

  query noFriends {
    NoFriends {
      id
      email
      name
      username
      profileUrl
    }
  }

  mutation addFriend($id: String!) {
    addFriend(id: $id) {
      id
      name
      email
      username
      profileUrl
    }
  }
`;
