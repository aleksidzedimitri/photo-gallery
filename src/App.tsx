import HomePage from "./pages/Home";
import HistoryPage from "./pages/History";
import { Routes, Route } from "react-router-dom";
import NavigationLayout from "./layouts/Navigation";

function App() {
  return (
    <NavigationLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </NavigationLayout>
  );
}

export default App;
