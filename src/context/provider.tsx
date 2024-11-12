
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
  const  [showSheet, setShowSheet] = useState({ show: false, id: '' });
  const [editRaceAndClass, setEditRaceAndClass] = useState(false);
  const [editHealthPoints, setEditHealthPoints] = useState(false);
  const [editPlayerImage, setEditPlayerImage] = useState(false);
  const [editConditions, setEditConditions] = useState(false);
  const [editLevel, setEditLevel] = useState({ show: false, type: '' });
  const [editAttributes, setEditAttributes] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [optionGuide, setOptionGuide] = useState('initials');

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

  const calculateMod = (value: number) => {
    if (value === 1) return -5;
    else if (value >= 2 && value <= 3) return -4;
    else if (value >= 4 && value <= 5) return -3;
    else if (value >= 6 && value <= 7) return -2;
    else if (value >= 8 && value <= 9) return -1;
    else if (value >= 10 && value <= 11) return 0;
    else if (value >= 12 && value <= 13) return 1;
    else if (value >= 14 && value <= 15) return 2;
    else if (value >= 16 && value <= 17) return 3;
    else if (value >= 18 && value <= 19) return 4;
    else if (value >= 20 && value <= 21) return 5;
    else if (value >= 22 && value <= 23) return 6;
    else if (value >= 24 && value <= 25) return 7;
    else if (value >= 26 && value <= 27) return 8;
    else if (value >= 28 && value <= 29) return 9;
    else if (value === 30) return 10;
    return 0;
  };

  return (
    <contexto.Provider
      value={{
        scrollToBottom,
        resetPopups,
        returnAttribute,
        calculateMod,
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
        showSheet, setShowSheet,
        editRaceAndClass, setEditRaceAndClass,
        editHealthPoints, setEditHealthPoints,
        editLevel, setEditLevel,
        editPlayerImage, setEditPlayerImage,
        editConditions, setEditConditions,
        editAttributes, setEditAttributes,
        showGuide, setShowGuide,
        optionGuide, setOptionGuide,
      }}
    >
      {children}
    </contexto.Provider>
  );
}

