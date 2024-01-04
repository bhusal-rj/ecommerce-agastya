import { useParams } from "react-router-dom";
import {useState, useEffect} from "react"; 
import {getProducts} from "../apiservices/index";

export default function ProductView(){
    const {productId} = useParams();
    const [product,setProduct] = useState({});
    const [inventory, setInventory] = useState([]);
    useEffect(() =>{
    getProducts().then(data =>{
      const prd=data.products.filter(p => p.id == productId)[0];
      setProduct(prd);
      setInventory(prd.inventory);
    })
    .catch(err =>{
      console.log(err);
    })
    },[])
    return (
        <div className=' flex mt-10 justify-between w-[80%] shadow-inherit'>
                    <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-3xl leading-6 font-medium text-gray-900">
            Product Info
        </h3>
    </div>
    <div class="border-t border-gray-400">
        <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-lg font-medium text-gray-500">
                    Product Name
                </dt>
                <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                    {product.title}
                </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-lg font-medium text-gray-500">
                    Price
                </dt>
                <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                    ${product.price}
                </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-lg font-medium text-gray-500">
                    SKU
                </dt>
                <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                    {product.sku}
                </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-lg font-medium text-gray-500">
                    Total Stock
                </dt>
                <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                    {product.stock}
                </dd>
            </div>
            {inventory.map(inv =>{
                return (
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" key={inv.id}>
                <dt class="text-lg font-medium text-gray-500">
                    Stock in {inv.channel.title}
                </dt>
                <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                    {inv.stock}
                </dd>
            </div>
                )
            })}
        </dl>
    </div>
</div>
        </div>
    )
}