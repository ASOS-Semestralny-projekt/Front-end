import {IApiService} from "./IApiService.ts";
import {ProductDTO} from "./productDTOs/ProductDTO.ts";
import {LoginDTO} from "./userDTOs/LoginDTO.ts";
import {LoginResponseDTO} from "./userDTOs/LoginResponseDTO.ts";
import {RegisterDTO} from "./userDTOs/RegisterDTO.ts";
import {CategoryDTO} from "./productDTOs/CategoriesDTO.ts";
import {PasswordChangeDTO} from "./userDTOs/PasswordChangeDTO.ts";
import {UserDataDTO} from "./userDTOs/UserDataDTO.ts";
import {OrderDTO} from "./orderDTOs/OrderDTO.ts";
import {PlaceOrderDTO} from "./orderDTOs/PlaceOrderDTO.ts";
import {ErrorDTO} from "./userDTOs/ErrorDTO.ts";
import {UserDataInProfileDTO} from "./userDTOs/UserDataInProfileDTO.ts";
import { logger } from "../utilities/logger.ts";

export class ApiService implements IApiService {

    private static instance: ApiService;
    //BASE_URL: import.meta.env.VITE_BE_BASE_URL,
    BASE_URL: string = "http://localhost:83"
    private constructor() {}

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    async getProducts(): Promise<ProductDTO[]> {
        let endpoint = "/products";
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Nepodarilo sa načítať produkty`);
            }
            return await response.json();
            /*let responseJson: ProductDTO[] = await response.json();
            console.log(responseJson);
            responseJson = responseJson.map(product => {
                product.img_path = `${import.meta.env.VITE_BE_BASE_URL}/${product.img_path}`;
                return product;
            });
            return responseJson*/
        } catch (error) {
            console.error(error);
            logger.error(error);
            throw error;
        }
    }

    async getCategories(): Promise<CategoryDTO[]> {
        let endpoint = "/categories";
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error("Nepodarilo sa načítať kategórie tovarov");
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            logger.error(error);
            throw error;
        }
    }

    async getProductsByCategory(category_id: number): Promise<ProductDTO[]> {
        let endpoint = `/products/${category_id}`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error("Nepodarilo sa načítať produkty danej kategórie");
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            logger.error(error);
            throw error;
        }
    }

    async getProductsBySearchString(searchString: string): Promise<ProductDTO[]> {

        let endpoint = `/products?search=${encodeURIComponent(searchString)}`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error("Nepodarilo sa načítať produkty s daným výrazom");
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            logger.error(error);
            throw error;
        }
    }

    async getProduct(id: number): Promise<ProductDTO> {
        let endpoint = `/product/${id}`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error("Daný produkt neexistuje");
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            logger.error(error);
            throw error;
        }
    }

    async getUserData(): Promise<UserDataInProfileDTO> {
        let endpoint = `/user`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });
            if (!response.ok) {
                const errorResponse: ErrorDTO = await response.json().catch(() => ({ message: 'Neznáma chyba.' })); // Default error if parsing fails
                const errorMessage = errorResponse.message;
                throw new Error(errorMessage);
            }
            return await response.json();
        } catch (error) {
            console.log(error instanceof Error ? error.message : 'Neznáma chyba.');
            logger.error(error instanceof Error ? error.message : 'Neznáma chyba.');
            throw new Error(error instanceof Error ? error.message : 'Neznáma chyba.');
        }
    }

    async changeUserData(userData: UserDataDTO): Promise<UserDataInProfileDTO> {
        let endpoint = `/user`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                credentials: "include"
            });
            if (!response.ok) {
                const errorResponse: ErrorDTO = await response.json().catch(() => ({ message: 'Neznáma chyba.' })); // Default error if parsing fails
                const errorMessage = errorResponse.message;
                throw new Error(errorMessage);
            }
            return await response.json();
        } catch (error) {
            console.log(error instanceof Error ? error.message : 'Neznáma chyba.');
            logger.error(error instanceof Error ? error.message : 'Neznáma chyba.');
            throw new Error(error instanceof Error ? error.message : 'Neznáma chyba.');
        }
    }

    async changePassword(passwordData: PasswordChangeDTO): Promise<void> {
        let endpoint = `/user/password`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(passwordData),
                credentials: "include"
            });
            if (!response.ok) {
                const errorResponse: ErrorDTO = await response.json().catch(() => ({ message: 'Neznáma chyba.' })); // Default error if parsing fails
                const errorMessage = errorResponse.message;
                throw new Error(errorMessage);
            }
            return await response.json();
        } catch (error) {
            console.log(error instanceof Error ? error.message : 'Neznáma chyba.');
            logger.error(error instanceof Error ? error.message : 'Neznáma chyba.');
            throw new Error(error instanceof Error ? error.message : 'Neznáma chyba.');
        }
    }

    async register(registerData: RegisterDTO): Promise<void> {
        let endpoint = `/register`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });
            if (!response.ok) {
                const errorResponse: ErrorDTO = await response.json().catch(() => ({ message: 'Neznáma chyba. Skúste sa registrovať znovu.' })); // Default error if parsing fails
                const errorMessage = errorResponse.errors;
                throw new Error(errorMessage);
            }
            return await response.json();
        } catch (error) {
            console.log(error instanceof Error ? error.message : 'Neznáma chyba. Skúste sa registrovať znovu.');
            logger.error(error instanceof Error ? error.message : 'Neznáma chyba. Skúste sa registrovať znovu.');
            throw new Error(error instanceof Error ? error.message : 'Neznáma chyba. Skúste sa registrovať znovu.');
        }
    }

    async login(loginData: LoginDTO): Promise<LoginResponseDTO> {
        let endpoint = `/login`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(loginData),
            });
            if (!response.ok) {
                const errorResponse: ErrorDTO = await response.json().catch(() => ({ message: 'Neznáma chyba. Skúste sa prihlásiť znovu.' })); // Default error if parsing fails
                const errorMessage = errorResponse.errors;
                throw new Error(errorMessage);
            }
            return await response.json();
        } catch (error) {
            console.log(error instanceof Error ? error.message : 'Neznáma chyba. Skúste sa prihlásiť znovu.');
            logger.error(error instanceof Error ? error.message : 'Neznáma chyba. Skúste sa prihlásiť znovu.');
            throw new Error(error instanceof Error ? error.message : 'Neznáma chyba. Skúste sa prihlásiť znovu.');
        }
    }

    async logout(): Promise<void> {
        let endpoint = `/logout`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (!response.ok) {
                const errorResponse: ErrorDTO = await response.json().catch(() => ({ message: 'Neznáma chyba. Skúste sa prihlásiť znovu.' })); // Default error if parsing fails
                const errorMessage = errorResponse.errors;
                throw new Error(errorMessage);
            }
            return await response.json();
        } catch (error) {
            console.log(error instanceof Error ? error.message : 'Neznáma chyba. Skúste sa odhlásiť znovu.');
            logger.error(error instanceof Error ? error.message : 'Neznáma chyba. Skúste sa odhlásiť znovu.');
            throw new Error(error instanceof Error ? error.message : 'Neznáma chyba. Skúste sa odhlásiť znovu.');
        }
    }

    async placeOrder(order: PlaceOrderDTO): Promise<void> {
        let endpoint = `/place-order`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
                credentials: "include"
            });
            if (!response.ok) {
                const errorResponse: ErrorDTO = await response.json().catch(() => ({ message: 'Neznáma chyba.' })); // Default error if parsing fails
                const errorMessage = errorResponse.message;
                throw new Error(errorMessage);
            }
            return await response.json();
        } catch (error) {
            console.log(error instanceof Error ? error.message : 'Neznáma chyba. Skúste odoslať objednávku znovu.');
            logger.error(error instanceof Error ? error.message : 'Neznáma chyba. Skúste odoslať objednávku znovu.');
            throw new Error(error instanceof Error ? error.message : 'Neznáma chyba. Skúste odoslať objednávku znovu.');
        }
    }

    async getOrders(): Promise<OrderDTO[]> {
        let endpoint = `/orders`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });
            if (!response.ok) {
                const errorResponse: ErrorDTO = await response.json().catch(() => ({ message: 'Neznáma chyba.' })); // Default error if parsing fails
                const errorMessage = errorResponse.message;
                throw new Error(errorMessage);
            }
            return await response.json();
        } catch (error) {
            console.log(error instanceof Error ? error.message : 'Neznáma chyba pri získaní objednávok.');
            logger.error(error instanceof Error ? error.message : 'Neznáma chyba pri získaní objednávok.');
            throw new Error(error instanceof Error ? error.message : 'Neznáma chyba pri získaní objednávok.');
        }
    }


    /*getUserCartData(): Promise<> {
        return Promise.resolve(undefined);
    },*/




}
/*function getCookie(name: string): string {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift()!;
    return "";
}*/