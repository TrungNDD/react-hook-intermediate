import { createBrowserRouter } from "react-router-dom";
import PokedexPage from "../routes/pokedex-page";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <PokedexPage />
      }
    ]
  },
]);

export default router;
