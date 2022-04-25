import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/ProductCard';
import { ProductsContext } from '../../context/products.context';
import './category.style.scss';

const Category = () => {
	const { category } = useParams();
	const { products } = useContext(ProductsContext);
	const [productCategory, setProductCategory] = useState(products[category]);

	useEffect(() => {
		setProductCategory(products[category]);
	}, [category, products]);

	return (
		<div className="category-products-container">
			{productCategory &&
				productCategory.map((product) => (
					<ProductCard product={product} key={product.id} />
				))}
		</div>
	);
};

export default Category;
