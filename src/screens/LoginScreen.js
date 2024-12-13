import React, { useState } from "react";
import { View, Alert, Button, Text, TextInput, StyleSheet } from 'react-native';
import TokenService from '../services/TokenService';

export default function ({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        fetch('http://localhost:8080/api/v1/students/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((response) => response.json())
            .then(async (data) => {
                const tokenVal = data.token.access_token != null || data.token.access_token != ""
                    && data.token.refresh_token != null || data.token.refresh_token != "";

                console.log(tokenVal)

                if (data.token.access_token && data.token.refresh_token) {
                    console.log("la :D")
                    await TokenService.saveTokens(data.token.access_token, data.token.refresh_token);
                    Alert.alert('Login Successful', 'You are logged in!');
                    console.log('BABAYIM ULAN BABA BABA');
                    navigation.navigate('Home');
                } else {
                    console.log('AAAAAAAAAAAAAAAAAAAAAA');
                    Alert.alert('Error', 'Invalid email or password');
                }
            })
            .catch((error) => {
                Alert.alert('Error', 'Failed to login');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                placeholder="Email"
                value={email} onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password"
                value={password} onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
});