import "./App.css";
import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from "react-router-dom";
import Home_Page from "./views/home_page";
import Shoes from "./views/shoes";
import MainLayout from "./component/mainLayout";
import Form_Data from "./views/form_data";
import Public from "./views/public";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Public />,
            }
        ]
    },
	{
		element: <MainLayout />,
		loader: () => {
			if (localStorage.access_token) {
				return null;
			}
			return redirect("/");
		},
		children: [
			{
				path: "/home",
				element: <Home_Page />,
			},
			{
				path: "/home/:id",
				element: <Home_Page />,
			},
			{
				path: "/shoes",
				element: <Shoes />,
			},
			{
				path: "/shoes/:id",
				element: <Shoes />,
			},
			{
				path: "/form",
				element: <Form_Data />,
			},
			{
				path: "/form/:id",
				element: <Form_Data />,
			},
		],
	},
	
]);

function App() {
	return <RouterProvider router={router} />
}

export default App;
