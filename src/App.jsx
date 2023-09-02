import { Routes, Route, Outlet, Link } from "react-router-dom";
import MapView from './pages/MapView';
import MapViewDetails from './pages/MapViewDetails';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MapView />} />
          <Route path="details/:id" element={<MapViewDetails />} />
          
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div className="h-screen w-screen">
        <Outlet />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}