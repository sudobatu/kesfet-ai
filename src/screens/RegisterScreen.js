import React, { useState } from 'react';
import { View, Button, Text, TextInput, StyleSheet, Alert } from 'react-native';

export default function RegisterScreen({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gradeLevel, setGradeLevel] = useState('');

    const handleRegister = () => {
        fetch('http://localhost:8080/api/v1/students/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                dateOfBirth,
                gradeLevel: parseInt(gradeLevel, 10),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                Alert.alert('Registration Successful', 'Please login to continute');
                navigation.navigate('Login');
            })
            .catch((error) => {
                Alert.alert('Error', 'Failed to register');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput placeholder='First Name' value={firstName} onChangeText={setFirstName} style={styles.input} />
            <TextInput placeholder='Last Name' value={lastName} onChangeText={setLastName} style={styles.input} />
            <TextInput placeholder='Email' value={email} onChangeText={setEmail} style={styles.input} />
            <TextInput placeholder='Password' value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
            <TextInput placeholder='Date of Birth (YYYY-MM-DD)' value={dateOfBirth} onChangeText={setDateOfBirth} style={styles.input} />
            <TextInput placeholder='Grade Level' value={gradeLevel} onChangeText={setGradeLevel} style={styles.input} keyboardType='numeric' />
            <Button title="Register" onPress={handleRegister} />
        </View>
    )
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