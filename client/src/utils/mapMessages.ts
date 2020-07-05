const mapMessages = (
  msg: {
    id: string;
    text: string;
    from: string;
    to: string;
    profileUrl: string;
  }[]
) => {
  let msgArr = [];
  for (let i = 0; i < msg.length; i++) {
    if (i == 0) {
      msgArr.push([msg[i]]);
    } else {
      if (msg[i - 1].from == msg[i].from) {
        msgArr[msgArr.length - 1].push(msg[i]);
      } else {
        msgArr.push([msg[i]]);
      }
    }
  }

  return msgArr;
};

export default mapMessages;
