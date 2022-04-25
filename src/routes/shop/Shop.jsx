import { Fragment, useContext } from 'react';
import { ProductsContext } from '../../context/products.context';
import CategoryPreview from '../../components/category-preview/CategoryPreview';
import './shop.style.scss';
const Shop = () => {
	const { products } = useContext(ProductsContext);
	return (
		<div className="shop-container">
			{Object.keys(products).map((title) => {
				const productCategories = products[title];
				return <CategoryPreview title={title} products={productCategories} />;
			})}
		</div>
	);
};

export default Shop;
