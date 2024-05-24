import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import { SightsProvider } from './context/SightsContext';

export default function App() {
  return (
    <AuthProvider>
      <SightsProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SightsProvider>
    </AuthProvider>
  )
}
