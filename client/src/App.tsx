import { Route } from "wouter";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";

function App() {
  return (
    <main className="bg-gray-900 font-mono antialiased text-white min-h-[100svh] overflow-x-hidden">
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
    </main>
  );
}

export default App;
