import Toast from '../components/Toast';

let oAuthWindow = (callback: any) => {
  const url: string =
    process.env.NODE_ENV === 'development'
      ? 'localhost:4000'
      : window.location.host;

  const consentURL = `${window.location.protocol}//${url}/auth/login`;

  window.open(consentURL, '__blank', 'width=500&height=800');
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.data === 'SUCCESS') {
      callback();
      Toast('Logged In', 'success');
    }
  });
};

export default oAuthWindow;
