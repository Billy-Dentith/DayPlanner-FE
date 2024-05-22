import axios from 'axios';

const dayPlannerApi = axios.create({
    baseURL: 'https://dayplanner-yoqm.onrender.com/api'
})

export const getAllUsers = async () => {
    const response = await dayPlannerApi.get('/users');

    return response.data;
}

export const getUserByUsername = async (username) => {
    const response = await dayPlannerApi.get(`/users/${username}`);

    return response.data;
}

export const postUser = async (username, searchRadius, lon, lat) => {
    const response = await dayPlannerApi.post('/users', {
        username: username,
        settings: {
            searchRadius: searchRadius,
            location: {
                lon: lon,
                lat: lat,
            }
        }
    });

    return response.data;
}

export const updateUser = async (avatar, searchRadius, lon, lat) => {
    const response = await dayPlannerApi.patch(`/user/${username}`, {
        avatar: avatar,
        settings: {
            searchRadius: searchRadius,
            location: {
                lon: lon,
                lat: lat,
            }
        }
    });

    return response.data;
}

export const getAllSights = async () => {
    const response= await dayPlannerApi.get('/sights');

    return response.data; 
}

export const getSightById = async (sightId) => {
    const response = await dayPlannerApi.get(`/sights/${sightId}`);

    return response.data;
}

