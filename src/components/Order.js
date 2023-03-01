import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToOrder,
  setLength,
} from "../store/order/orderSlice";

const Order=()=>{
    const dispatch = useDispatch();
    const orderlist = useSelector((state) => state.order.items);
    console.log(orderlist)


    return(
        <div className="order">
            <h2>Your Order</h2>
            <ul className="order-list">
                {
                    orderlist.map(item=>
                        {
                         if(item.status==="available"){
                            return(
                                <li className="total">{item.name} <span>{item.amount}</span> <span>{item.price}</span></li>
                            )
                         }else{
                            return(
                                <li className="total">Sorry, {item.name} is no longer available!</li>
                            )
                         }
                        
                          
                        }
                    )
                }
                <li className="total"><strong>Total:  { 
                    orderlist.reduce((toplam, item) => {
                        return toplam + item.amount * Number(item.price);
                    }, 0)
                    }</strong>
                $
                </li>
            </ul>
        </div>
       
    )
}

export default Order