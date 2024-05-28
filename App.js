import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { Provider } from 'react-redux';
import BasketScreen from './screens/BasketScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import HomeScreen from './screens/HomeScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import { store } from './store';



export default function App() {

  const Stack=createNativeStackNavigator()

  return (
    <NavigationContainer>
          <Provider store={store}>
          <Stack.Navigator>
            {/* screens */}
              <Stack.Screen name='home' component={HomeScreen}/>
              <Stack.Screen name='restaurent' component={RestaurantScreen}/>
              <Stack.Screen name='basket' component={BasketScreen} options={{
              presentation:"modal" , headerShown:false,              
              }}/>
              <Stack.Screen name='preparingOrderScreen' component={PreparingOrderScreen} options={{
              presentation:"fullScreenModal" , headerShown:false,              
              }}/>
              <Stack.Screen name='delivery' component={DeliveryScreen} options={{
              headerShown:false,              
              }}/>

          </Stack.Navigator>
          </Provider>
    </NavigationContainer>
  );
}


