import { useDispatch, useSelector } from "react-redux";
import { useState , useEffect} from "react";
import { addItemToList} from "../store/list/listSlice";
import {
    addItemToOrder,
    setLength,
  } from "../store/order/orderSlice";
  

const initialItem={
    name:"",
    price:0,
    desc:"",
    status:"",
    image:"",
    id:""
}

const Inventory=()=>{
    const dispatch = useDispatch();
    const fishes    =useSelector((state) => state.list.items);
    const orderlist = useSelector((state) => state.order.items);
    const [menuItem,setMenuItem]=useState(initialItem);
    console.log(fishes)

    const handleInput=(e)=>{
       setMenuItem({...menuItem,[e.target.name]:e.target.value,id:(fishes.length+1)})
    }
    
    const addToItem=()=>{
        dispatch(addItemToList([menuItem,...fishes]))
        setMenuItem(initialItem)
    }

    const changeItem=(e,item,index)=>{
        console.log(e.target.value)
        let updatedItem={...item, [e.target.name]: e.target.value }
        let newList=[...fishes]
        newList[index]={...updatedItem}
        dispatch(addItemToList(newList))

        if (orderlist.some(x=>x.id === item.id)){
            const updatedItemIndex = orderlist.findIndex(
                (x) => x.id === item.id
              );
            let newList=[...orderlist]
            newList[updatedItemIndex]={...updatedItem}
            dispatch(addItemToOrder(newList))
            
        }
    }


    return(
        <div className="inventory">
             <h2>Inventory</h2>
        {
           fishes.map((x,index)=>(
                <div className="fish-edit" key={index}>
                <input type="text" name="name"  placeholder="Fish Name" value={x.name} onChange={(e)=>{changeItem(e,x,index)}}/>
                <input type="text" name="price"  placeholder="Fish Price"  value={x.price} onChange={(e)=>{changeItem(e,x,index)}}/>
                <select type="text" name="status" placeholder="Fish Status" onChange={(e)=>{changeItem(e,x,index)}}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" name="desc" placeholder="Fish Desc" value={x.desc} onChange={(e)=>{changeItem(e,x,index)}}></textarea>
                <input id="name" type="text" name="image" placeholder="Fish Image" value={x.image} onChange={(e)=>{changeItem(e,x,index)}}/>
                <button onClick={()=>dispatch(addItemToList([...fishes.filter(item=> item.id!== x.id)]))}>REMOVE ITEM</button>
            </div>
            ))
        } 
            <div className="fish-edit">
                <input onChange={handleInput} type="text" value={menuItem.name} name="name"  placeholder="Fish Name" />
                <input onChange={handleInput} type="text" value={menuItem.price} name="price"  placeholder="Fish Price" />
                <select onChange={handleInput} type="text"  name="status" placeholder="Fish Status">
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea onChange={handleInput} type="text" value={menuItem.desc} name="desc" placeholder="Fish Desc"></textarea>
                <input onChange={handleInput} id="name" type="text" value={menuItem.image} name="image" placeholder="Fish Image" />
                <button onClick={addToItem}>+ ADD ITEM</button>
              
            </div>
        </div>
        
    )
}

export default Inventory