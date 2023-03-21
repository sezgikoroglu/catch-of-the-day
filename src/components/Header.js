import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToOrder,
  setLength,
} from "../store/order/orderSlice";
import { addItemToList } from "../store/list/listSlice";

const Header = () => {
  const dispatch = useDispatch();
  const orderlist = useSelector((state) => state.order.items);
  const fishes = useSelector((state) => state.list.items);

  useEffect(() => {
    const neworder=[...orderlist];
   
  }, [fishes]);


  return (
    <div className="menu">
      <header className="top">
        <h1 className="title">
          Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day
        </h1>
        <h3 className="tagline">
          <span>Fresh Seafood Market</span>
        </h3>
      </header>
      <ul>
        {fishes.map((item, index) => (
          <li key={index} className="menu-fish">
            <img src={item.image} alt="Pacific Halibut" />
            <h3 className="fish-name">
              {item.name}
              <span className="price">{item.price}</span>
            </h3>
            <p>{item.desc}</p>

            {item.status === "available" && (
              <button
                onClick={() => {
                  console.log(item.id);
                  if (!orderlist.some((x) => x.id === item.id)) {
                    const orderList_ = [{ ...item, amount: 1 }, ...orderlist];
                    dispatch(addItemToOrder(orderList_));
                    dispatch(setLength(orderList_.length));
                  } else {
                    const updatedItemIndex = orderlist.findIndex(
                      (x) => x.id === item.id
                    );
                    let newItem = {
                      ...orderlist[updatedItemIndex],
                      amount: orderlist[updatedItemIndex].amount + 1,
                    };
                    let updatedList = [
                      ...orderlist.filter((x) => x.id !== item.id),
                      {
                        ...newItem,
                      },
                    ];
                    dispatch(addItemToOrder(updatedList));
                  }
                }}
              >
                Add To Order
              </button>
            )}
            {item.status === "unavailable" && (
              <button className="soldout-btn" disabled>
                SOLD OUT!
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
