import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/CategoryPreview';

const CategoriesPreview = () => {
	const { products } = useSelector((state) => state.productsMap);
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
