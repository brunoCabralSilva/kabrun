
import { ReactNode, useState } from 'react';
import contexto from './context';

interface IProvider { children: ReactNode }

export default function Provider({children }: IProvider) {
  const [showMessage, setShowMessage] = useState({ show: false, text: '' });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [logoutUser, setLogoutUser] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState({ show: false, email: '' });
  const [showChangeImage, setShowChangeImage] = useState({ show: false, user: {} });
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [showMenuSession, setShowMenuSession] = useState('');
  const [session, setSession] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [showMenuDices, setShowMenuDices] = useState(false);
  const [showEditPrinciple, setShowEditPrinciple] = useState({ show: false, description: '' });
  const [showDeletePrinciple, setShowDeletePrinciple] = useState({ show: false, description: '' });
  const [showChangeGameMaster, setShowChangeGameMaster] = useState({ show: false, data: {} });
  const [removeFromSession, setRemoveFromSession] = useState({ show: false, gm: false });
  const [dataSession, setDataSession] = useState({ show: false, id: '' });
  const [players, setPlayers] = useState([]);
  const [listNotification, setListNotification] = useState([]);

  const scrollToBottom = () => {
    const messagesContainer = document.getElementById('grid-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  const resetPopups = () => {
    setShowMessage({ show: false, text: '' });
    setShowForgotPassword(false);
    setLogoutUser(false);
    setShowChangePassword({ show: false, email: '' });
    setShowChangeImage({ show: false, user: {} });
    setShowCreateSession(false);
    setShowMenuSession('');
  }

  const returnAttribute = (attribute: string) => {
    switch(attribute) {
      case 'strength': return 'Força';
      case 'dexterity': return 'Destreza';
      case 'intelligence': return 'Inteligência';
      case 'constitution': return 'Constituição';
      case 'charisma': return 'Carisma';
      case "wisdom": return "Sabedoria";
      default: return 'Outro';
    }
  }

  return (
    <contexto.Provider
      value={{
        scrollToBottom,
        resetPopups,
        returnAttribute,
        session, setSession,
        userEmail, setUserEmail,
        showMessage, setShowMessage,
        showForgotPassword, setShowForgotPassword,
        logoutUser, setLogoutUser,
        showChangePassword, setShowChangePassword,
        showChangeImage, setShowChangeImage,
        showCreateSession, setShowCreateSession,
        showMenuSession, setShowMenuSession,
        showMenuDices, setShowMenuDices,
        showEditPrinciple, setShowEditPrinciple,
        showDeletePrinciple, setShowDeletePrinciple,
        showChangeGameMaster, setShowChangeGameMaster,
        removeFromSession, setRemoveFromSession,
        dataSession, setDataSession,
        listNotification, setListNotification,
        players, setPlayers,
      }}
    >
      {children}
    </contexto.Provider>
  );
}

