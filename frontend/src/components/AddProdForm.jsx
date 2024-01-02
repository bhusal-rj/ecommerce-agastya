import styles from "./AddProdForm.module.css";
import {useState} from 'react'
function AddProdForm(){
    const channelsDetails = [
        {
            id:0,
            channelName:"Daraz",
            hasStock:false
        },
        {
            id:1,
            channelName:"Sastodeal",
            hasStock:false
        },
        {
            id:2,
            channelName:"Hamrobazaar",
            hasStock:false
        }
    ];

    const [channels,setChannels] = useState(channelsDetails);
    function handleSubmit(){

    }

    function handleStockForm(channeled){
        const updated=channels.map((channel)=>{
            if(channel.id == channeled.id) {
                return {
                    ...channel,
                    hasStock:!channeled.hasStock
            }
            }
            return channel;
        })
        console.log(updated);

        setChannels(updated);
    }
    return(
        <div className={styles.formWrapper}>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formInput}>
                <label>Product Name </label>
                <input type="text" name="name" />
                </div>

                <div className={styles.formInput}>
                <label>Price</label>
                <input type="number" name="price" />
                </div>

                <div className={styles.formInput}>
                <label>Stock</label>
                <input type="number" name="price" />
                </div>

                <div className={styles.formInput}>
                <label>Description </label>
                <br/>
                <textarea name="description"></textarea>
                </div>

                <div className={styles.formInput}>
                <label>SKU </label>
                <br/>
                <input type="number" name="price" />
                </div>

                <div className={styles.formInput}>
                <label>Channels </label>
                <div className={styles.channelsList}>
                    {channels.map(channel =>{
                        const classNames= styles.hbBg +' ' +(channel.hasStock ? styles.channelActive : '');
                        return (
                            <button className={classNames} onClick={(e) =>{
                                e.preventDefault();
                                handleStockForm(channel);
                            }}>{channel.channelName}</button>
                        )
                    })}
                </div>
                </div>
                {channels.map(channel =>{
                    return (
                        channel.hasStock ? (<div className={styles.formInput}>
                        <label>Stock Qty for : {channel.channelName}</label>
                        <input type="number" name={`${channel.channelName}Stock`} />
                        </div>) : ""
                    )
                })}

                <button type="submit" className={styles.submitBtn}>Add Product</button>
            </form>
        </div>
    )
}

export default AddProdForm;