import React from "react";
import LoginPage from "./Pages/Login";
import QuizPage from "./Pages/Quiz";
import ResultPage from "./Pages/Result";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

function App() {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) {
        return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/*" element={<LoginPage />} />
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/result" element={<ResultPage />} />
            </Routes>
        );
    }
}

export default App;
