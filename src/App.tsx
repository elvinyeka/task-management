import { Routes, Route } from "react-router-dom";

import { Sidebar, Tasks } from "./components";
import { useGlobalContext } from "./context/global_context";
import Home from "./pages/Home";

function App() {
  const { activeItem } = useGlobalContext();

  return (
    <main className="app">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/list/:id"
          element={
            <section className="app-tasks">
              <Tasks list={activeItem} withoutEmpty={false} />
            </section>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
