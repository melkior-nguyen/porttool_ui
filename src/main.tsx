import "./index.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import store from "./store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import AppLocaleProvider from "./context/AppLocaleProvider";
import { DarkModeProvider } from "./components/Sidebar/useDarkMode";
import AppLoader from "./components/AppLoader";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import { env } from "@/types";
import * as Sentry from "@sentry/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ApolloProvider } from "@apollo/client";
import { client } from "./store/apolloGraphql";
import { ThemeProvider } from "@mui/material";

Sentry.init({
  dsn: env.VITE_DNS_SENTRY,
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    {/* Provide Multi language */}
    <AppLocaleProvider>
      {/* Provide for Router */}
      <GoogleReCaptchaProvider reCaptchaKey={env.VITE_RE_CAPTCHA_KEY}>
        <GoogleOAuthProvider clientId={env.VITE_SOCIAL_AUTH_GOOGLE_OAUTH2_KEY}>
          <ApolloProvider client={client}>
            <DarkModeProvider>
              <Suspense>
                  <RouterProvider router={router} />
              </Suspense>
            </DarkModeProvider>
          </ApolloProvider>
        </GoogleOAuthProvider>
      </GoogleReCaptchaProvider>
    </AppLocaleProvider>

    <ToastContainer
      position="bottom-left"
      autoClose={10000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      draggable
      theme="colored"
    />
  </Provider>
);
