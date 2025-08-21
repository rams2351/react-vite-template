import SuspenseLoader from "@/components/common/SuspenseLoader";
import { store } from "@/redux/store";
import { router } from "@/routes";
import LoadingService from "@/services/LoadingService";
import React, { Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

const App: React.FC = () => {
  useEffect(() => {
    // Hide loader initially when app renders;
    LoadingService.hide();
  }, []);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <Suspense fallback={<SuspenseLoader />}>
          <Toaster richColors />
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
