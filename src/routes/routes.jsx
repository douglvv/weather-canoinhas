import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../screens/Home";
import SearchScreen from '../screens/SearchScreen'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" Component={Home} />
                <Route exact path="/pesquisar" Component={SearchScreen} />
            </Routes>
        </BrowserRouter>
    )
}