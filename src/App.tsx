import { RouterProvider } from "react-router-dom";

import { router } from "./Router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <h1>Sweden PFAS information map</h1>
    </>
  );
}

export default App;
