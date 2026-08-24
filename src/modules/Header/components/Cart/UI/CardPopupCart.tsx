import style from "./CardPopupCart.module.scss";
import {
  ActionIcon,
  Box,
  Card,
  Group,
  Image,
  Text
} from "@mantine/core";
import Minus from "../../../../../assets/icons/Minus.svg?react";
import Plus from "../../../../../assets/icons/Plus.svg?react";
import type { Vegetables } from "../../../../../types.tsx";
import {increaseQuantity, decreaseQuantity} from "../../../../../store/slices/cartSlice.ts";
import {useAppDispatch} from "../../../../../store/hooks.ts";


function CardPopupCart({image, wieght, name, price, quantity, id}: Vegetables) {

  const dispatch = useAppDispatch();

  return (
    <Card classNames={{root: style.cardRoot}}>
      <Group justify="space-between" >
        <Image
          src={image}
          h={60}
          w={60}
          alt=""
          classNames={{root: style.img}}
        />
        <Box className={style.Box}>
          <Group gap={12}>
            <Text classNames={{root: style.textName}}>{name}</Text>
            <Text classNames={{root: style.textWeight}}>{wieght}</Text>
          </Group>
          <Text classNames={{root: style.textPrice}}>$ {price}</Text>
        </Box>
        <Group justify="flex-end" gap={10} classNames={{root: style.groupActionIcon}}>
          <ActionIcon onClick={() => {dispatch(decreaseQuantity(id))}} classNames={{root: style.buttonCount}} variant="filled" color="#dee2e6">{<Minus />}</ActionIcon>
          <Text>{quantity}</Text>
          <ActionIcon onClick={() => {dispatch(increaseQuantity(id))}} classNames={{root: style.buttonCount}} variant="filled" color="#dee2e6">{<Plus />}</ActionIcon>
        </Group>
      </Group>
    </Card>
  )
}
export default CardPopupCart;