import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createBottomTabNavigator();

function AboutScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text>Name: Dominic Gopalakrishnan</Text>
				<Text>ID: 101289239</Text>
				<Text>CRN: 13604</Text>
			</View>
		</SafeAreaView>
	);
}

function HomeScreen() {
	const [ size, setSize ] = useState(0);
	const [ flooringPrice, setFlooringPrice ] = useState(0);
	const [ installationPrice, setInstallationPrice ] = useState(0);
	const [ isSwitched, setIsSwitched ] = useState(false);

	const toggleSwitch = () => {
		setIsSwitched((previousState) => !previousState);
		{
			isSwitched
				? (setSize(size / 10.764),
					setFlooringPrice(flooringPrice * 10.764),
					setInstallationPrice(installationPrice * 10.764))
				: (setSize(size * 10.764),
					setFlooringPrice(flooringPrice / 10.764),
					setInstallationPrice(installationPrice / 10.764));
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text>Toggle Switch to Change Units to Feet</Text>
			<Switch onValueChange={toggleSwitch} value={isSwitched} />

			{isSwitched ? (
				<Text>Please enter the size of the room in square feet</Text>
			) : (
				<Text>Please enter the size of the room in square meters</Text>
			)}
			<TextInput
				style={styles.input}
				onChangeText={(size) => setSize(size)}
				value={size.toString()}
				keyboardType="numeric"
			/>
			{isSwitched ? (
				<Text>Please enter the price per square foot of flooring</Text>
			) : (
				<Text>Please enter the price per square meter of flooring</Text>
			)}
			<TextInput
				style={styles.input}
				onChangeText={(flooringPrice) => setFlooringPrice(flooringPrice)}
				value={flooringPrice.toString()}
				keyboardType="numeric"
			/>
			{isSwitched ? (
				<Text>Please enter the price per {'\n'}square foot of flooring installation</Text>
			) : (
				<Text>Please enter the price per {'\n'}square meter of flooring installation</Text>
			)}
			<TextInput
				style={styles.input}
				onChangeText={(installationPrice) => setInstallationPrice(installationPrice)}
				value={installationPrice.toString()}
				keyboardType="numeric"
			/>

			<Text>Flooring Cost Before Tax: $ {(size * flooringPrice).toFixed(2)}</Text>
			<Text>Installation Cost Before Tax: $ {(size * installationPrice).toFixed(2)}</Text>
			<Text>Total Cost Before Tax: $ {(size * installationPrice + size * flooringPrice).toFixed(2)}</Text>
			<Text>Tax: $ {((size * installationPrice + size * flooringPrice) * 0.13).toFixed(2)}</Text>
		</SafeAreaView>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="About" component={AboutScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		width: 250
	}
});
