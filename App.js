import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import MoviesList from './screens/MoviesList'
import CreateMovie from './screens/CreateMovie'
import DisplayMovie from './screens/DisplayMovie'

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={MoviesList}
					options={{ title: 'My movies' }}
				/>
				<Stack.Screen
					name="CreateMovie"
					component={CreateMovie}
					options={{ title: 'New movie' }}
				/>
				<Stack.Screen
					name="ShowMovie"
					component={DisplayMovie}
					options={{ title: 'Movie' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
export default App