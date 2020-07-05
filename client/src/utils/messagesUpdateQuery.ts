const messagesUpdateQuery = (params: any, me: any, refetch: any) => (
  prev: any,
  data: any
) => {
  refetch();
  console.log(data.subscriptionData.data.onNewMessage.from.id, params.username);
  if (
    !prev.getMessage ||
    data.subscriptionData.data.onNewMessage.from.id === me?.id ||
    // TODO: Temporary fix, have to fix in server
    data.subscriptionData.data.onNewMessage.from.id != params.username
  )
    return prev;

  const newData = { getMessage: [...prev.getMessage] };
  newData.getMessage.push(data.subscriptionData.data.onNewMessage);

  return newData;
};

export default messagesUpdateQuery;
