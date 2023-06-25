import Main from './src/components/Main.jsx';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext.js';

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <NativeRouter>
        <Main />
      </NativeRouter>
    </AuthProvider>
  );
}
