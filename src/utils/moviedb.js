const movieDBUrl = import.meta.env.VITE_MOVIEDB_URL
const movieDBAPIKey = import.meta.env.VITE_MOVIEDB_API_KEY

const buildEndpointFetch = (endpoint) => {
    return fetch(`${movieDBUrl}/3/${endpoint}`, {
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${movieDBAPIKey}`
        }
    })
}

const buildImageURL = (image, width = 300) => {
    return `https://image.tmdb.org/t/p/w${width}/${image}`
}

export {buildEndpointFetch, buildImageURL}