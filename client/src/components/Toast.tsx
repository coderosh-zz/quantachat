import { toast } from 'react-toastify';

const Toast = (
  content: string,
  type: 'info' | 'success' | 'warning' | 'error' | 'default' = 'default'
) => {
  toast(content, {
    type: type,
    closeButton: false,
    closeOnClick: true,
    autoClose: 3000,
    hideProgressBar: true,
    position: 'bottom-center',
  });
};

export default Toast;
