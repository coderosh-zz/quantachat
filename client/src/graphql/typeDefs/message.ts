import { gql } from 'apollo-server-express';

export default gql`
  query getMessages($id: String!) {
    getMessage(to: $id) {
      id
      text
      to {
        id
      }
      from {
        id
      }
    }
  }

  query getAllConvo {
    conversations {
      id
      text
      from {
        id
      }
      to {
        id
      }
    }
  }

  mutation createNewMessage($to: String!, $text: String!) {
    createNewMessage(data: { text: $text, to: $to }) {
      id
      text
      to {
        id
      }
      from {
        id
      }
    }
  }

  subscription onNewMessage {
    onNewMessage {
      id
      text
      to {
        id
      }
      from {
        id
      }
    }
  }
`;
