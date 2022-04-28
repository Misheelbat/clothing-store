import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/product-card/ProductCard';
import { selectProductsMap } from '../../store/products/products.selector';

import { CategoryTitle, CategoryProducts } from './category.style';
const Category = () => {
	const { category } = useParams();
	const products = useSelector(selectProductsMap);
	const [productCategory, setProductCategory] = useState(products[category]);

	useEffect(() => {
		setProductCategory(products[category]);
	}, [category, products]);

	return (
		<Fragment>
			<CategoryTitle>{category.toUpperCase()}</CategoryTitle>
			<CategoryProducts>
				{productCategory &&
					productCategory.map((product) => (
						<ProductCard product={product} key={product.id} />
					))}
			</CategoryProducts>
		</Fragment>
	);
};

export default Category;
