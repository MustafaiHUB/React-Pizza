import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  function handleDelelteItem(pizzaId) {
    dispatch(deleteItem(pizzaId));
  }
  return (
    <Button type="small" onClick={() => handleDelelteItem(pizzaId)}>
      Delete
    </Button>
  );
}

export default DeleteItem;
