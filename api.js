import axios from 'axios';

const dayPlannerApi = axios.create({
    baseURL: 'https://dayplanner-yoqm.onrender.com/api'
})

export const getAllUsers = async () => {
    const response = await dayPlannerApi.get('/users');

    return response.data;
}

export const getUserByUsername = async (username) => {
    const response = await dayPlannerApi.get(`/users/${username}`)
    .catch((err) => {
        console.log(err)
    })

    return response.data;
}

export const postUser = async (name, username, searchRadius, longitude, latitude, userFilter) => {
    const response = await dayPlannerApi.post('/users', {
        displayName: name,
        username: username,
        settings: {
            searchRadius: searchRadius,
            location: {
                lon: longitude,
                lat: latitude,
            }
        },
        filters: userFilter,
    });

    return response.data;
}

export const patchUser = async (username, avatar, searchRadius, lon, lat, userFilter) => {
    const response = await dayPlannerApi.patch(`/users/${username}`, {
        avatar: avatar,
        settings: {
            searchRadius: searchRadius,
            location: {
                lon: lon,
                lat: lat,
            }
        },
        filters: userFilter,
    });

    return response.data;
}

export const getAllSights = async (username) => {
    const response= await dayPlannerApi.get(`/sights?username=${username}`).catch((err) => {console.log(err)});

    return response.data; 
}

export const getSightById = async (sightId) => {
    const response = await dayPlannerApi.get(`/sights/${sightId}`);

    return response.data;
}

export const getRoute = async (username, sights) => {
    const response = await dayPlannerApi.post(`/routes/${username}`, sights);

    return response.data;
}

export const getSavedRoutes = async (username) => {
    const response = await dayPlannerApi.get(`/${username}/routes`);

    return response.data;
}

export const getRouteById = async (routeId) => {
    const response = await dayPlannerApi.get(`/routes/${routeId}`);

    return response.data;
}