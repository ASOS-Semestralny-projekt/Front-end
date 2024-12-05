import {UseShoppingCart} from "../../../contexts/shoppingCart/ShoppingCartContext.tsx";
import {Button} from "react-bootstrap";
import {IProductWholeToCart} from "../IProductWholeToCart.ts";
import { logger } from "../../../utilities/logger.ts";

const IncreaseCartItemCuantityButton = ({ product }: IProductWholeToCart) => {

    const { increaseCartQuantity } = UseShoppingCart();

    return (
        <Button
            className="add-to-cart-button"
            style={{ width: "2.5rem", height: "2.5rem" }}
            onClick={() => {
                increaseCartQuantity(product)
                logger.info('Product\'s amount with id ' + product.id + ' has been increased by 1.');
            }}>
            +
        </Button>

    );
};

export default IncreaseCartItemCuantityButton;