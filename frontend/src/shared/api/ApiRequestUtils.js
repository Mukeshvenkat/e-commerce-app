import axios from 'axios';
import { getBaseUrl } from '../../utilities/Constants';

const TOKEN = localStorage.getItem("token");

export const ApiRequestUtils = {
    post: async (apiRoute, body) => {
        const { data } = await axios.post(getBaseUrl() + apiRoute, body, {
            headers: {
                'Content-Type': 'application/json',
                'token': TOKEN
            }
        });
        if (!data.success && (data.code === 400 || data.code === 415)) { // Unauthorized request
            return;
        } else {
            return data;
        }
    },

    get: async (apiRoute) => {
        const { data } = await axios.get(getBaseUrl() + apiRoute, {
            headers: {
                'Content-Type': 'application/json',
                'token': TOKEN
            }
        });
        if (!data.success && (data.code === 400 || data.code === 415)) { // Unauthorized request
            return;
        } else {
            return data;
        }
    },

    update: async (apiRoute, body) => {
        const { data } = await axios.put(getBaseUrl() + apiRoute, body, {
            headers: {
                'Content-Type': 'application/json',
                'token': TOKEN
            }
        });
        if (!data.success && (data.code === 400 || data.code === 415)) { // Unauthorized request
            return;
        } else {
            return data;
        }
    }
};

