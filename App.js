import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import MoviesList from './screens/MoviesList'
import CreateMovie from './screens/CreateMovie';
import DisplayMovie from './screens/DisplayMovie';

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="My movies" component={MoviesList} />
				<Stack.Screen name="New movie" component={CreateMovie} />
				<Stack.Screen name="Movie" component={DisplayMovie} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
export default App