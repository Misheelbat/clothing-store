import { useContext, Fragment } from 'react';
import { ProductsContext } from '../../context/products.context';
import CategoryPreview from '../../components/category-preview/CategoryPreview';

const CategoriesPreview = () => {
	const { products } = useContext(ProductsContext);

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
