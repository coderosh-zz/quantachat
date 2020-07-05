const scrollToBottom = (
  bodyRef: React.RefObject<HTMLDivElement>,
  dontCheckHeight: boolean = true,
  animate: boolean = false
) => {
  if (!bodyRef.current) return;

  if (
    dontCheckHeight ||
    bodyRef.current.scrollTop + bodyRef.current.clientHeight + 200 >=
      bodyRef.current.scrollHeight
  ) {
    if (animate) {
      scrollTo(bodyRef.current, bodyRef.current.scrollHeight, 400);
    } else {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }
};

function scrollTo(element: HTMLElement, to: number, duration: number) {
  let start = element.scrollTop,
    change = to - start,
    currentTime = 0,
    increment = 20;

  let animateScroll = function () {
    currentTime += increment;
    var val = easeInOutQuad(currentTime, start, change, duration);
    element.scrollTop = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
}

const easeInOutQuad = function (t: number, b: number, c: number, d: number) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

export default scrollToBottom;
