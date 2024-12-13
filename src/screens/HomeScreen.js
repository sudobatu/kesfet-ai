import React from 'react';
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Keşfet AI</Text>
            <Button
                title="Register"
                onPress={ () => navigation.navigate('Register') }
            />
            <Button
                title="Login"
                onPress={ () => navigation.navigate('Login') }
                style={styles.button}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
    },
});