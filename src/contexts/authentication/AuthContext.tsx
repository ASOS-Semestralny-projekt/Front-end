import {createContext, useContext, useState} from "react";
import {UserSessionData, AuthContextType} from "./AuthTypes";
import {LoginFormDataInterface} from "../../components/form/LoginFormDataInterface";
import {ServiceSelector} from "../../services/ServiceSelector";
import {LoginDTO} from "../../services/userDTOs/LoginDTO";
import {LoginResponseDTO} from "../../services/userDTOs/LoginResponseDTO";
import {UseShoppingCart} from "../shoppingCart/ShoppingCartContext";
import { logger } from "../../utilities/logger";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const apiService = ServiceSelector;

    const {clearCart} = UseShoppingCart();

    const [user, setUser] = useState<UserSessionData | null>(() => {
        // Get the initial user data from localStorage if it exists
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [, setSessionToken] = useState<string | null>(localStorage.getItem('sessionToken'));
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('isLoggedIn') === 'true');

    const login = async ({ email, password }: LoginFormDataInterface): Promise<void> => {
        const loginData: LoginDTO = {email: email, password: password};
        try {
            const response: LoginResponseDTO = await apiService.login(loginData);

            localStorage.setItem('sessionToken', response.session_token);
            setSessionToken(response.session_token);

            const userResponse: UserSessionData = {
                id: response.user_id,
                first_name: response.first_name,
                last_name: response.last_name,
            }
            localStorage.setItem('user', JSON.stringify(userResponse));
            setUser(userResponse);
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);
        } catch (error) {
            console.log((error as Error).message);
            logger.error((error as Error).message);
            throw error;
        }

    };

    const logout = async () => {
        try {
            await apiService.logout();
            localStorage.removeItem('sessionToken');
            setSessionToken(null);
            localStorage.removeItem('user');
            setUser(null);
            localStorage.removeItem('isLoggedIn');
            setIsLoggedIn(false);
            clearAllCookies()
            clearCart()
        }catch (error) {
            logger.error(error);
            throw error
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth() :AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        logger.error("useAuth must be used within an AuthProvider");
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

const clearAllCookies = () => {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
};