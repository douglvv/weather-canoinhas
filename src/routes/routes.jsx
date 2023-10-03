import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../screens/Home";


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" Component={Home} />
            </Routes>
        </BrowserRouter>
    )
}