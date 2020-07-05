const scrollToBottom = (bodyRef: React.RefObject<HTMLDivElement>) => {
  if (!bodyRef.current) return;
  bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
};

export default scrollToBottom;
