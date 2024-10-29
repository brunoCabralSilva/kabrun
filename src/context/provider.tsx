
import { ReactNode, useState } from 'react';
import contexto from './context';

interface IProvider { children: ReactNode }

export default function Provider({children }: IProvider) {
  const [showMessage, setShowMessage] = useState({ show: false, text: '' });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [logoutUser, setLogoutUser] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState({ show: false, email: '' });

  const scrollToBottom = () => {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  const resetPopups = () => {
    setShowMessage({ show: false, text: '' });
    setShowForgotPassword(false);
    setLogoutUser(false);
    setShowChangePassword({ show: false, email: '' });
  }

  return (
    <contexto.Provider
      value={{
        scrollToBottom,
        resetPopups,
        showMessage, setShowMessage,
        showForgotPassword, setShowForgotPassword,
        logoutUser, setLogoutUser,
        showChangePassword, setShowChangePassword,
      }}
    >
      {children}
    </contexto.Provider>
  );
}

