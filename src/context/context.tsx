import { createContext } from 'react';

interface RecipesContext {
  showMessage: { show: boolean, text: string },
  setShowMessage: (state: { show: boolean, text: string }) => void,
  showForgotPassword: boolean,
  setShowForgotPassword: (state: boolean) => void,
  logoutUser: boolean,
  setLogoutUser: (state: boolean) => void,
  showChangePassword: { show: boolean, email: string },
  setShowChangePassword: (state: { show: boolean, email: string }) => void,
  showChangeImage: { show: boolean, user: any },
  setShowChangeImage: (state: any) => void,
  showCreateSession: boolean,
  setShowCreateSession: (state: boolean) => void,
  showMenuSession: string,
  setShowMenuSession: (state: string) => void,
  session: any,
  setSession: (state: any) => void,
  userEmail: string,
  setUserEmail: (state: string) => void,
  showEditPrinciple: { show: boolean, description: string },
  setShowEditPrinciple: (state: { show: boolean, description: string }) => void,
  showDeletePrinciple: { show: boolean, description: string },
  setShowDeletePrinciple: (state: { show: boolean, description: string }) => void,
  showMenuDices: boolean,
  showChangeGameMaster: { show: boolean, data: any },
  setShowChangeGameMaster: (state: { show: boolean, data: any }) => void,
  removeFromSession: { show: boolean, gm: boolean },
  setRemoveFromSession: (state: { show: boolean, gm: boolean }) => void,
  dataSession: { show: boolean, id: string },
  setDataSession: (state: { show: boolean, id: string }) => void,
  listNotification: any,
  setListNotification: (state: any) => void,
  players: any,
  setPlayers: (state: any) => void,
  showSheet: { show: boolean, id: string }, 
  setShowSheet: (state: { show: boolean, id: string }) => void,
  editRaceAndClass: boolean,
  setEditRaceAndClass: (state: any) => void,
  editHealthPoints: boolean,
  setEditHealthPoints: (state: any) => void,
  setShowMenuDices: (state: boolean) => void,
  scrollToBottom: () => void,
  resetPopups: () => void,
  returnAttribute: (attribute: string) => string,
}

const initialValue: RecipesContext = {
  showMessage: { show: false, text: '' },
  setShowMessage: () => {},
  showForgotPassword: false,
  setShowForgotPassword: () => {},
  logoutUser: false,
  setLogoutUser: () => {},
  showChangePassword: { show: false, email: '' },
  setShowChangePassword: () => {},
  showChangeImage: { show: false, user: {} },
  setShowChangeImage: () => {},
  showCreateSession: false,
  setShowCreateSession: () => {},
  showMenuSession: '',
  setShowMenuSession: () => {},
  userEmail: '',
  setUserEmail: () => {},
  session: {},
  setSession: () => {},
  showEditPrinciple: { show: false, description: '' },
  setShowEditPrinciple: () => {},
  showDeletePrinciple: { show: false, description: '' },
  setShowDeletePrinciple: () => {},
  showChangeGameMaster: { show: false, data: {} },
  setShowChangeGameMaster: () => {},
  removeFromSession: { show: false, gm: false },
  setRemoveFromSession: () => {},
  dataSession: { show: false, id: '' },
  setDataSession: () => {},
  listNotification: [],
  setListNotification: () => {},
  showMenuDices: false,
  setShowMenuDices: () => {},
  players: [],
  setPlayers: () => {},
  showSheet: { show: false, id: '' }, 
  setShowSheet: () => {},
  editRaceAndClass: false,
  setEditRaceAndClass: () => {},
  editHealthPoints: false,
  setEditHealthPoints: () => {},
  scrollToBottom: () => {},
  resetPopups: () => {},
  returnAttribute: () => '',
}

const contexto = createContext(initialValue);
export default contexto;