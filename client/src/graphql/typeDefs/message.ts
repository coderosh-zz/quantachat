import { gql } from 'apollo-server-express';

export default gql`
  query getMessages($id: String!) {
    getMessage(to: $id) {
      id
      text
      to {
        id
        profileUrl
      }
      from {
        id
        profileUrl
      }
    }
  }

  query getAllConversations {
    conversations {
      id
      text
      from {
        id
        name
        profileUrl
      }
      to {
        id
        name
        profileUrl
      }
    }
  }

  mutation createNewMessage($to: String!, $text: String!) {
    createNewMessage(data: { text: $text, to: $to }) {
      id
      text
      to {
        id
        profileUrl
      }
      from {
        id
        profileUrl
      }
    }
  }

  subscription onNewMessage {
    onNewMessage {
      id
      text
      to {
        id
        profileUrl
      }
      from {
        id
        profileUrl
      }
    }
  }
`;
