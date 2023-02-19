import { Route } from "wouter";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <main className="bg-gray-900 font-mono antialiased text-white min-h-[100svh]">
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/user" component={Profile} />
    </main>
  );
}

export default App;
