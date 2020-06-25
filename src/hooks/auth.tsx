import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextInterface {
  user: object;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: object;
}

const Auth = createContext<AuthContextInterface>({} as AuthContextInterface);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user'
      ]);

      if(token[1] && user[1]){
        setData({ token: token[1], user: JSON.parse(user[1]) })
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)]
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@GoBarber:token',
      '@GoBarber:user'
    ]);

    setData({} as AuthState);
  }, []);

  return (
    <Auth.Provider value={{ user: data.user, signIn, signOut, loading }}>
      {children}
    </Auth.Provider>
  );
};

const useAuth = () => {
  const context = useContext(Auth);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { useAuth, AuthProvider };
