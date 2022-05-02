import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/product-card/ProductCard';
import Spinner from '../../components/spinner/Spinner';

import {
	selectProductsMap,
	selectIsProductLoading,
} from '../../store/products/products.selector';

import { CategoryTitle, CategoryProducts } from './category.style';
type CateforyRouteParams = {
	category: string;
};
const Category = () => {
	const { category } = useParams<
		keyof CateforyRouteParams
	>() as CateforyRouteParams;
	const products = useSelector(selectProductsMap);
	const isLoading = useSelector(selectIsProductLoading);
	const [productCategory, setProductCategory] = useState(products[category]);

	useEffect(() => {
		setProductCategory(products[category]);
	}, [category, products]);

	return (
		<Fragment>
			<CategoryTitle>{category.toUpperCase()}</CategoryTitle>
			{isLoading && <Spinner />}
			{!isLoading && (
				<CategoryProducts>
					{productCategory &&
						productCategory.map((product) => (
							<ProductCard product={product} key={product.id} />
						))}
				</CategoryProducts>
			)}
		</Fragment>
	);
};

export default Category;
