import {
    BrowserRouter,
    createBrowserRouter,
    RouterProvider,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import App from './home/App';
import { Login } from './login/Login';
import { Profile } from './profile/Profile';
import {useAuth} from './context/AuthContext';
export const Yuruojie = () => {


    const {currentUser} = true;
    const RequireAuth = ({children}) => {
        return currentUser?(children):<Navigate to="/login"/>
    }

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<RequireAuth><App/></RequireAuth>}/>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/profile" element={<RequireAuth><Profile/></RequireAuth>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}
