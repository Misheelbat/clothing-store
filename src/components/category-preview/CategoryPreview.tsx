import { FC } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../product-card/ProductCard';
import { ProductItem } from '../../store/products/products.type';
import { CategoryPreviewContainer, Preview } from './categoryPreview.style';

type CategoryPreviewProps = {
	title: string;
	products: ProductItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
	return (
		<CategoryPreviewContainer>
			<h2>
				<Link to={title}>{title.toUpperCase()}</Link>
			</h2>
			<Preview>
				{products
					.filter((_, idx) => idx < 4)
					.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</Preview>
		</CategoryPreviewContainer>
	);
};

export default CategoryPreview;
