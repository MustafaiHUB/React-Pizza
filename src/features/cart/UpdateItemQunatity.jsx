import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import {
  decreaseItemQuantity,
  getCurrentQuantity,
  increaseItemQuantity,
} from './cartSlice';

function UpdateItemQunatity({ pizzaId }) {
  const dispatch = useDispatch();
  const getCurrentItemQuantity = useSelector(getCurrentQuantity(pizzaId));
  // console.log(getCurrentItemQuantity);
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span>{getCurrentItemQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQunatity;
