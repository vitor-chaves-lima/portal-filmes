const getFavorites = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

const saveFavorite = (favoriteId) => {
    const favorites = getFavorites();
    favorites.push(favoriteId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

const removeFavorite = (favoriteId) => {
    const favorites = getFavorites();
    const newFavorites = favorites.filter((id) => id !== favoriteId);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
}

const isFavorite = (favoriteId) => {
    const favorites = getFavorites();
    return favorites.includes(favoriteId);
}

export { getFavorites, saveFavorite, removeFavorite, isFavorite };