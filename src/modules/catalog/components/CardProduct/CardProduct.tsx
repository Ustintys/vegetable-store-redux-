import {
  Card,
  Group,
  Image,
  Text,
  Button,
  ActionIcon,
  Loader,
} from "@mantine/core";
import Minus from "../../../../assets/icons/Minus.svg?react";
import Plus from "../../../../assets/icons/Plus.svg?react";
import Cart from "../../../../assets/icons/Cart.svg?react";
import style from "./CardProduct.module.scss";
import {useAppDispatch} from "../../../../store/hooks.ts";
import {increase, decrease} from "../../../../store/slices/vegetablesSlice.ts";
import {addToCart} from "../../../../store/slices/cartSlice.ts";
import type {Vegetables} from "../../../../types.tsx";

type CardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  wieght: string;
  loading: boolean;
  quantity: number;
  vegetable: Vegetables
}

function CardProduct ({ name, price, image, wieght, loading, id, quantity, vegetable }: CardProps) {

  const dispatch = useAppDispatch();

  return (
    <>
      {loading ? (
        <Card classNames={{root: style.container}}>
          <Group classNames={{root: style.containerLoader}}>
            <Loader classNames={{root: style.loader}} type="bars" color="gray" size={25} />
          </Group>
        </Card>
      ) : (
        <Card classNames={{root: style.container}} >
          <Card.Section>
            <Image
              src={image}
              h={276}
              w={276}
              alt=""
              classNames={{root: style.img}}
            />
          </Card.Section>
          <Group justify="space-between">
            <Group gap={12}>
              <Text classNames={{root: style.textName}}>{name}</Text>
              <Text classNames={{root: style.textWeight}}>{wieght}</Text>
            </Group>
            <Group justify="flex-end" gap={10}>
              <ActionIcon data-testid="btn-decrease" onClick={() => {dispatch(decrease(id))}} classNames={{root: style.buttonCount}} variant="filled" color="#dee2e6">{<Minus />}</ActionIcon>
              <Text>{quantity}</Text>
              <ActionIcon data-testid="btn-increase" onClick={() => {dispatch(increase(id))}} classNames={{root: style.buttonCount}} variant="filled" color="#dee2e6">{<Plus />}</ActionIcon>
            </Group>
          </Group>
          <Group classNames={{root: style.groupPrice}} justify="space-between" >
            <Text classNames={{root: style.price}}>$ {price}</Text>
            <Button data-testid="btn-addCart" onClick={() => {dispatch(addToCart(vegetable))}} classNames={{root: style.buttonCart}} rightSection={<Cart />} variant="light" color="#54b46a">Add to cart</Button>
          </Group>
        </Card>
      )
      }
    </>
    )
}

export default CardProduct;