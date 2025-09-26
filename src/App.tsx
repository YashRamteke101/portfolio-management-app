import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";


export default function App() {
  return (
    // Suspense is needed for lazy-loaded pages
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
