import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../store/store"

function AuthGuard() {
    const { user } = useAppSelector(state => state.account);
    //user giris yapmadan checkout'a basinca login sayfasına yonlendirirlir daha sonra login yapınca gitmek istedigi yer hatırlanıp oraya yonlendirilir onun icin uselocation()..
    const location = useLocation();
    if (!user) return <Navigate to="/login" state={{ from: location }} />

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AuthGuard