import {createBrowserRouter} from "react-router-dom";
import MainLayout from "./layouts/Main.layout.jsx";
import HomePage from "./pages/Home.page.jsx";
import ExplorePage from "./pages/Explore.page.jsx";
import MyListsPage from "./pages/MyLists.page.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
           <MainLayout/>
        ),
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: "explore",
                element: <ExplorePage/>,
            },
            {
                path: "lists",
                element: <MyListsPage />
            }
        ]
    },
]);

export default router;