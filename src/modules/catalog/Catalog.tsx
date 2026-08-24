import style from "./catalog.module.scss";
import CardProduct from "./components/CardProduct/CardProduct.tsx";
import {useEffect} from "react";
import type {Vegetables} from "../../types.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {fetchVegetables} from "../../store/slices/vegetablesSlice.ts";



function Catalog() {

  const dispatch = useAppDispatch();

  const {vegetables, loading} = useAppSelector((state) => state.vegetables);

  useEffect(() => {
    dispatch(fetchVegetables());
  }, [dispatch]);

    return (
      <div className={style.container}>
        <h1 className={style.title}>Catalog</h1>
        <div className={style.containerCard}>
          {vegetables.map((vegetable: Vegetables) => (
            <div key={vegetable.id}>
              <CardProduct vegetable={vegetable}  quantity={vegetable.quantity} id={vegetable.id} loading={loading} name={vegetable.name} price={vegetable.price} image={vegetable.image} wieght={vegetable.wieght} />
            </div>
          ))}
        </div>
      </div>
    )

}

export default Catalog;