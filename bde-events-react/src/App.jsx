import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>

            <div className="bg-gray-100 font-sans antialiased text-gray-900 flex flex-col min-h-screen">

                <Header />

                <main className="flex-grow max-w-6xl mx-auto px-4 py-6 w-full">

                    <Routes>

                        <Route path="/" element={<Home />} />

                    </Routes>

                </main>

                <Footer />

            </div>

        </BrowserRouter>
    );
}

export default App;