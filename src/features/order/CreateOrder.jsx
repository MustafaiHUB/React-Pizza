// import { useState } from "react";
import { createOrder } from '../../services/apiRestaurant';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import { useState } from 'react';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import EmptyCart from '../cart/EmptyCart';
import { fetchAddress } from '../user/userSlice';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    address,
    position,
    status: addressStatus,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const positionIsLoading = addressStatus === 'loading';

  const formErrors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const dispatch = useDispatch();
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="p-2">
      <h2 className="mb-10 text-center text-xl font-semibold">
        Ready to order? Let's go!
      </h2>
      <Form method="POST">
        <div className="mb-2 flex flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="customer"
              defaultValue={username}
              required
            />
          </div>
        </div>

        <div className="mb-2 flex flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="text-xm mt-2 rounded-md bg-red-100 p-1 text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-2 flex flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="relative grow">
            <input
              defaultValue={address}
              className="input"
              type="text"
              name="address"
              required
              disabled={positionIsLoading}
            />
            <span className="absolute right-1 top-1">
              <Button
                disabled={positionIsLoading}
                type="small"
                onClick={() => dispatch(fetchAddress())}
              >
                Get Location
              </Button>
            </span>
            {addressStatus === 'error' && (
              <p className="text-xm mt-2 rounded-md bg-red-100 p-1 text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
        </div>

        <div className="my-5 flex items-center gap-2">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmitting || positionIsLoading}>
            {isSubmitting
              ? 'Placing your order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Submit a valid phone number.';
  }

  if (Object.keys(errors).length > 0) return errors;

  // if everything is okay, create the new order
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
