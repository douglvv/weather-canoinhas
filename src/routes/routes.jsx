import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../screens/Home";
import SearchScreen from '../screens/SearchScreen'
import EditDataScreen from '../screens/EditDataScreen';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" Component={Home} />
                <Route exact path="/pesquisar" Component={SearchScreen} />
                <Route exact path="/editar/:id" Component={EditDataScreen} />
            </Routes>
        </BrowserRouter>
    )
}