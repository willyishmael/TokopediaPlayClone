import React from "react";
import { Routes, Route } from "react-router-dom"

function AppRouter() {
    return (
        <Routes>
            
        </Routes>
    )
}
function App() {
    return (
        <div className="root">
            {/* <Header /> */}
            <main className="app-main">
                <AppRouter />
            </main>
            <footer className="app-footer">
                <p>&copy; {new Date().getFullYear()} TokopediaPlay Clone</p>
            </footer>
        </div>
    )
}

export default App;