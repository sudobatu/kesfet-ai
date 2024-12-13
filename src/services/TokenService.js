import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TokenService = {
    saveTokens: async (accessToken, refreshToken) => {
        await SecureStore.setItemAsync('userToken', accessToken);
        await SecureStore.setItemAsync('refreshToken', refreshToken);
    },

    getAccessToken: async () => {
        return await SecureStore.getItemAsync('userToken');
    },

    getRefreshToken: async () => {
        return await SecureStore.getItemAsync('refreshToken');
    },

    clearTokens: async () => {
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('refreshToken');
    },

    refreshAccessToken: async () => {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await fetch('http://localhost:8080/api/v1/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
            const data = await response.json();
            await TokenService.saveTokens(data.accessToken, refreshToken);
            return data.accessToken;
        } else {
            throw new Error('Failed to refresh token');
        }
    },
};

export default TokenService;