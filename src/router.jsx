import {createBrowserRouter} from "react-router-dom";
import MainLayout from "./layouts/Main.layout.jsx";
import HomePage from "./pages/Home.page.jsx";
import ExplorePage from "./pages/Explore.page.jsx";
import MyListsPage from "./pages/MyLists.page.jsx";
import homePageLoader from "./loaders/movie.loaders.js";
import genreLoader from "./loaders/genre.loaders.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
           <MainLayout/>
        ),
        children: [
            {
                index: true,
                element: <HomePage/>,
                loader: homePageLoader
            },
            {
                path: "explore",
                element: <ExplorePage/>,
                loader: genreLoader
            },
            {
                path: "lists",
                element: <MyListsPage />
            }
        ]
    },
]);

export default router;