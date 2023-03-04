import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToOrder, setLength } from "../store/order/orderSlice";

const Order = () => {
  const dispatch = useDispatch();
  const orderlist = useSelector((state) => state.order.items);
  const [select, setSelect] = useState();
  let toplam=0;

  const mouseOver=(item)=>{
    setSelect(item.id);
  }

  return (
    <div className="order">
      <h2>Your Order</h2>
      <ul className="order-list">
        {orderlist.map((item) => {
         
          if (item.status === "available") {
            return (
              <li className="order-li" onMouseOver={()=>(mouseOver(item))} onMouseLeave={()=>setSelect("")}>
                {item.amount} <span>{item.name} {select === item.id && <button className="x" onClick={()=>dispatch(addItemToOrder([...orderlist.filter(x=> x.id!== item.id)]))}> x </button>} </span> <span className="price">{item.price} $</span>
              </li>
            );
          } 
          else {
            return (
              <li className="order-li"  onMouseOver={(e)=>(mouseOver(item))} onMouseLeave={()=>setSelect("")} >
                Sorry, {item.name} is no longer available!
                {select === item.id && <button className="x" onClick={()=>dispatch(addItemToOrder([...orderlist.filter(x=> x.id!== item.id)]))}> x </button>}
              </li>
            );
          
          }

        })}
        <li className="total">
          <strong>
            Total:{" "}
            </strong>
            <span className="price">
            {
            orderlist.forEach(item => {
                
                if (item.status==="available"){
                    console.log(item.amount+ "  "+item.price)
                    toplam += Math.round(Number(item.amount) * Number(item.price));
                }
                
            })} {toplam} $
            </span>
         
          
        </li>
      </ul>
    </div>
  );
};

export default Order;
