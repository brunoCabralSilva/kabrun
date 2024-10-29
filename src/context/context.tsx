'use client'
import { createContext } from 'react';

interface RecipesContext {
  showMessage: { show: boolean, text: string },
  setShowMessage: (state: { show: boolean, text: string }) => void,
  showForgotPassword: boolean,
  setShowForgotPassword: (state: boolean) => void,
  scrollToBottom: () => void,
  logoutUser: boolean,
  setLogoutUser: (state: boolean) => void,
  showChangePassword: { show: boolean, email: string },
  setShowChangePassword: (state: { show: boolean, email: string }) => void,
  showChangeImage: { show: boolean, user: any },
  setShowChangeImage: (state: any) => void,
  resetPopups: () => void,
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
  scrollToBottom: () => {},
  resetPopups: () => {},
}

const contexto = createContext(initialValue);
export default contexto;