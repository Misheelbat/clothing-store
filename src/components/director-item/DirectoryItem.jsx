import { useNavigate } from 'react-router-dom';
import {
	DirectoryItemContainer,
	DirectoryItemBody,
	BackImage,
} from './directoryItem.style';

const DirectoryItem = ({ category }) => {
	const { imageUrl, title, route } = category;
	const navigate = useNavigate();

	const navigateHandler = () => navigate(route);

	return (
		<DirectoryItemContainer onClick={navigateHandler}>
			<BackImage imageUrl={imageUrl} />
			<DirectoryItemBody>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</DirectoryItemBody>
		</DirectoryItemContainer>
	);
};
export default DirectoryItem;
