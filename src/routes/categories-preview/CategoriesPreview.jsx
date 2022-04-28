import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/CategoryPreview';
import { selectProductsMap } from '../../store/products/products.selector';

const CategoriesPreview = () => {
	const products = useSelector(selectProductsMap);
	return (
		<Fragment>
			{Object.keys(products).map((title) => {
				const productCategories = products[title];
				return (
					<CategoryPreview
						key={title}
						title={title}
						products={productCategories}
					/>
				);
			})}
		</Fragment>
	);
};

export default CategoriesPreview;
