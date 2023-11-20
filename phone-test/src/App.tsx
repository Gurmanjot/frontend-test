import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { LoginPage } from './pages/Login/Login';
import { CallsListPage } from './pages/Call/CallsList';
import { CallDetailsPage } from './pages/Call/CallDetails';
import { Tractor } from '@aircall/tractor';

import './App.css';
import { darkTheme } from './style/theme/darkTheme';
import { RouterProvider } from 'react-router-dom';
import { GlobalAppStyle } from './style/global';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './hooks/useAuth';
import client from './auth';
import { ErrorPage } from './pages/ErrorPage';
import { ProtectedRoute } from './components/routing/ProtectedRoute';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />} errorElement={<ErrorPage />}>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/calls" element={<ProtectedRoute />}>
        <Route path="/calls" element={<CallsListPage />} />
        <Route path="/calls/:callId" element={<CallDetailsPage />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <Tractor injectStyle theme={darkTheme}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
        <GlobalAppStyle />
      </ApolloProvider>
    </Tractor>
  );
}

export default App;
