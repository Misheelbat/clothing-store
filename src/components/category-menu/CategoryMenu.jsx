import DirectoryItem from '../director-item/DirectoryItem';
import './categoryMenu.styles.scss';

const CategoryMenu = ({ menuItems }) => {
	return (
		<div className="categories-container">
			{menuItems.map((item) => (
				<DirectoryItem key={item.id} category={item} />
			))}
		</div>
	);
};
export default CategoryMenu;
