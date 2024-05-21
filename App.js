import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './firebase/firebase';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  )
}
