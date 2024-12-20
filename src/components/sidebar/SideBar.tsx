import './SideBar.css'
import {useEffect, useState} from "react";
import {CategoryDTO} from "../../services/productDTOs/CategoriesDTO.ts";
import {ServiceSelector} from "../../services/ServiceSelector.ts";
import {Alert} from "@mui/material";
import {Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import { logger } from '../../utilities/logger.ts';

const SideBar = () => {

    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const apiService = ServiceSelector;

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            setError(null);
            try {
                const categories = await apiService.getCategories();
                setCategories(categories);
            } catch (error) {
                setError((error as Error).message || "Nepodarilo sa získať kategórie");
                logger.error((error as Error).message || "Nepodarilo sa získať kategórie");
            }finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="col col-lg-2 side-bar-container p-0 m-0">
            {error ? (
                <div className="error-message-div mb-3 mt-4">
                    <Alert variant="filled" severity="error" className="error-message ">
                        {error}</Alert>
                </div>
            ) : loading ? (
                <div className="form-submit-div">
                    <Spinner animation="border" className="spinner my-3"/>
                </div>
            ) : (
                categories.map(category => (
                    <div
                        key={category.id}
                        className="category-item p-2">
                        <Link className="my-link" to={`/${category.name}`}>
                            <a>{category.name}</a>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default SideBar;