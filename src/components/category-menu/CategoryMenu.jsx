import CategoryItems from '../category-item/CategoryItem';
import './categoryMenu.styles.scss';

const CategoryMenu = ({ menuItems }) => {
	return (
		<div className="categories-container">
			{menuItems.map((item) => (
				<CategoryItems key={item.id} category={item} />
			))}
		</div>
	);
};
export default CategoryMenu;
