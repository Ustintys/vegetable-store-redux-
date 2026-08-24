import {
  Button,
  Popover,
  Divider, Group, Text, Image,
} from "@mantine/core";
import style from "./Cart.module.scss";
import CartIcon from "../../../../assets/icons/Cart.svg?react";
import CardPopupCart from "./UI/CardPopupCart.tsx";
import cart_content from '../../../../assets/img/cart_content.png'
import {useAppSelector} from "../../../../store/hooks.ts";

function Cart() {

  const {items} = useAppSelector(state => state.cart);

  return (
    <Popover offset={20} shadow={'0 2px 8px 0 rgba(33, 37, 41, 0.08), 0 1px 2px 0 rgba(33, 37, 41, 0.1)'} classNames={{dropdown: style.dropdown}} >
      <Popover.Target >
        <Button data-testid="btn-cart" classNames={{root: style.ButtonRoot}} rightSection={<CartIcon />} variant="filled" color="#54b46a">
          {(items.length === 0) ? null : (
            <div className={style.quantity}>
              <Text classNames={{root: style.quantityText}}>{items.length}</Text>
            </div>
          )}
          Cart
        </Button>
      </Popover.Target>
      {(items.length === 0) ? (
        <Popover.Dropdown >
          <Image src={cart_content} alt={'the cart is empty'} />
        </Popover.Dropdown>
      ) : (
        <Popover.Dropdown>
          {items.map((vegetable, index) => (
            <div key={vegetable.id}>
              <CardPopupCart id={vegetable.id}
                             name={vegetable.name}
                             wieght={vegetable.wieght}
                             price={vegetable.price}
                             image={vegetable.image}
                             quantity={vegetable.quantity}
              />
              {(index != items.length - 1) ? <Divider classNames={{root: style.dividerCard}} /> : null}
            </div>
          ))}
          <Divider classNames={{root: style.divider}} />
          <Group justify='space-between'>
            <Text classNames={{root: style.textTotal}}>Total</Text>
            <Text classNames={{root: style.textTotal}}>
              $ {items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}
            </Text>
          </Group>
        </Popover.Dropdown>
      )}
    </Popover>
  )
}
export default  Cart;