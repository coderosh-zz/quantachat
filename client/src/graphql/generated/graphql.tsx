import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  user?: Maybe<User>;
  me?: Maybe<User>;
  conversations: Array<Message>;
  getMessage: Array<Message>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryGetMessageArgs = {
  to: Scalars['String'];
};

/** User Schema */
export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  email: Scalars['String'];
  username: Scalars['String'];
  friends: Array<User>;
  provider: Scalars['String'];
  socialId: Scalars['String'];
  profileUrl: Scalars['String'];
};


/** Message Schema */
export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  from: User;
  to: User;
  text?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFriend: User;
  removeFriend: User;
  logout: Scalars['Boolean'];
  createNewMessage: Message;
  updateMessage: Message;
  deleteMessage: Message;
};


export type MutationAddFriendArgs = {
  id: Scalars['String'];
};


export type MutationRemoveFriendArgs = {
  id: Scalars['String'];
};


export type MutationCreateNewMessageArgs = {
  data: MessageInput;
};


export type MutationUpdateMessageArgs = {
  text: Scalars['String'];
  id: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['String'];
};

export type MessageInput = {
  text: Scalars['String'];
  to: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onNewMessage: Message;
  onMessageUpdate: Message;
  onMessageDelete: Message;
};

export type GetMessagesQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetMessagesQuery = (
  { __typename?: 'Query' }
  & { getMessage: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text'>
    & { to: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'profileUrl'>
    ), from: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'profileUrl'>
    ) }
  )> }
);

export type GetAllConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllConversationsQuery = (
  { __typename?: 'Query' }
  & { conversations: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text'>
    & { from: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'profileUrl'>
    ), to: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'profileUrl'>
    ) }
  )> }
);

export type CreateNewMessageMutationVariables = Exact<{
  to: Scalars['String'];
  text: Scalars['String'];
}>;


export type CreateNewMessageMutation = (
  { __typename?: 'Mutation' }
  & { createNewMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text'>
    & { to: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'profileUrl'>
    ), from: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'profileUrl'>
    ) }
  ) }
);

export type OnNewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnNewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { onNewMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text'>
    & { to: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'profileUrl'>
    ), from: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'profileUrl'>
    ) }
  ) }
);

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserByIdQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'email' | 'id'>
  )> }
);

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'id' | 'email' | 'username' | 'provider' | 'profileUrl' | 'socialId'>
    & { friends: Array<(
      { __typename?: 'User' }
      & Pick<User, 'name'>
    )> }
  )> }
);


export const GetMessagesDocument = gql`
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
    `;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, baseOptions);
      }
export function useGetMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, baseOptions);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = ApolloReactCommon.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const GetAllConversationsDocument = gql`
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
    `;

/**
 * __useGetAllConversationsQuery__
 *
 * To run a query within a React component, call `useGetAllConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllConversationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllConversationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllConversationsQuery, GetAllConversationsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllConversationsQuery, GetAllConversationsQueryVariables>(GetAllConversationsDocument, baseOptions);
      }
export function useGetAllConversationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllConversationsQuery, GetAllConversationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllConversationsQuery, GetAllConversationsQueryVariables>(GetAllConversationsDocument, baseOptions);
        }
export type GetAllConversationsQueryHookResult = ReturnType<typeof useGetAllConversationsQuery>;
export type GetAllConversationsLazyQueryHookResult = ReturnType<typeof useGetAllConversationsLazyQuery>;
export type GetAllConversationsQueryResult = ApolloReactCommon.QueryResult<GetAllConversationsQuery, GetAllConversationsQueryVariables>;
export const CreateNewMessageDocument = gql`
    mutation createNewMessage($to: String!, $text: String!) {
  createNewMessage(data: {text: $text, to: $to}) {
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
export type CreateNewMessageMutationFn = ApolloReactCommon.MutationFunction<CreateNewMessageMutation, CreateNewMessageMutationVariables>;

/**
 * __useCreateNewMessageMutation__
 *
 * To run a mutation, you first call `useCreateNewMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewMessageMutation, { data, loading, error }] = useCreateNewMessageMutation({
 *   variables: {
 *      to: // value for 'to'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateNewMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateNewMessageMutation, CreateNewMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateNewMessageMutation, CreateNewMessageMutationVariables>(CreateNewMessageDocument, baseOptions);
      }
export type CreateNewMessageMutationHookResult = ReturnType<typeof useCreateNewMessageMutation>;
export type CreateNewMessageMutationResult = ApolloReactCommon.MutationResult<CreateNewMessageMutation>;
export type CreateNewMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateNewMessageMutation, CreateNewMessageMutationVariables>;
export const OnNewMessageDocument = gql`
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

/**
 * __useOnNewMessageSubscription__
 *
 * To run a query within a React component, call `useOnNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNewMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnNewMessageSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnNewMessageSubscription, OnNewMessageSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnNewMessageSubscription, OnNewMessageSubscriptionVariables>(OnNewMessageDocument, baseOptions);
      }
export type OnNewMessageSubscriptionHookResult = ReturnType<typeof useOnNewMessageSubscription>;
export type OnNewMessageSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnNewMessageSubscription>;
export const GetUserByIdDocument = gql`
    query getUserById($id: String!) {
  user(id: $id) {
    name
    email
    id
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, baseOptions);
      }
export function useGetUserByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, baseOptions);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = ApolloReactCommon.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const LogoutUserDocument = gql`
    mutation logoutUser {
  logout
}
    `;
export type LogoutUserMutationFn = ApolloReactCommon.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, baseOptions);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = ApolloReactCommon.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const CurrentUserDocument = gql`
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

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;