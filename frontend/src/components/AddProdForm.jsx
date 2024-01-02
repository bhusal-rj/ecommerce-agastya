import styles from "./AddProdForm.module.css";
import { useState } from "react";
import { AddProduct, getChannels } from "../apiservices";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddProdForm() {
  const [channels, setChannels] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChannels, setSelectedChannels] = useState([]);

  const add = (e, id) => {
    console.log(e.target.value);
    if (selectedChannels.length <= 0) {
      const newObj = {
        id: id,
        stock: e.target.value,
      };

      // Use the spread operator to create a new array with the new object
      setSelectedChannels((selectedChannels) => [...selectedChannels, newObj]);
    } else {
      const updated = selectedChannels.map((channel) => {
        if (channel.id == id) {
          return {
            ...channel,
            stock: e.target.value,
          };
        } else {
          return channel;
        }
      });
      if (!updated.some((channel) => channel.id === id)) {
        updated.push({
          id: id,
          stock: e.target.value,
        });
      }

      console.log(updated);
      setSelectedChannels(updated);
    }
    //setProductData({ ...productData, channels:selectedChannels});

  };

  useEffect(() => {
    getChannels().then((response) => {
      const data = response.channels;
      console.log(data);
      if (data) {
        const updatedata = data.map((d) => ({
          ...d,
          hasStock: false,
        }));
        setChannels(updatedata);
        setIsLoading(false);
      }
    });
  }, []);


  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
    stock: "",
    channels: [],
    sku: "",
  });
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value});
   
    
    
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prevIsChecked) => {
        console.log(prevIsChecked);
        //let updatedata;
        if(!prevIsChecked){
             const updatedata = channels.map((channel) => ({
                ...channel,
                hasStock: true,
              }));
              setChannels(updatedata);
              for(let i=0;i<updatedata.length;i++){
                const newObj = {
                    id: updatedata[i].id,
                    stock: productData.stock,
                  };
            
                  // Use the spread operator to create a new array with the new object
                  setSelectedChannels((selectedChannels) => [...selectedChannels, newObj]);
              }

        }
        else{
            const updatedata = channels.map((channel) => ({
                ...channel,
                hasStock: false,
              }));
              setChannels(updatedata); 


    //  setSelectedChannels((selectedChannels) =>
    //     selectedChannels.filter(
    //       (channel) => !updatedata.some((updatedChannel) => updatedChannel.id === channel.id)
    //     )
    //   );
        }
        
         // This will log the previous state
        return !prevIsChecked;
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(selectedChannels);
    console.log(productData);
        AddProduct(productData).then((r)=>{
                    console.log(r);
                    setProductData({
                        title: "",
                        price: "",
                        description: "",
                        stock: "",
                        channels: [],
                        sku: "",
                      });
                      setSelectedChannels([]);
<<<<<<< HEAD
                      navigate("/products")
        }).catch(function(error) {
            console.log(error);
          });
    
 
      
      
=======
                      useNavigate("/products")
        })  
>>>>>>> 781bc95e126c6a49986196fb51c84f2e20dc9011
  }

  function handleStockForm(channeled) {
    console.log(channeled);
    if(channeled.hasStock){
        const updatedChannels = selectedChannels.filter((channel) => channel.id !== channeled.id);
        setSelectedChannels(updatedChannels);     
    }
    const updated = channels.map((channel) => {
      if (channel.id == channeled.id) {
        return {
          ...channel,
          hasStock: !channeled.hasStock,
        };
      }
      return channel;
    });

    
    console.log(updated);

    setChannels(updated);
  }
  useEffect(() => {
    //console.log("Updated selectedChannels:", selectedChannels);
    setProductData((prevProductData) => ({
      ...prevProductData,
      channels: selectedChannels,
    }));
  }, [selectedChannels]);

  return (
    <div className={styles.formWrapper}>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formInput}>
          <label>Product Name </label>
          <input type="text" name="title" onChange={handleChangeInput} />
        </div>

        <div className={styles.formInput}>
          <label>Price</label>
          <input type="number" name="price" onChange={handleChangeInput} />
        </div>

        <div className={styles.formInput}>
          <label>Stock</label>
          <input type="number" name="stock" onChange={handleChangeInput} />
        </div>

        <div className={styles.formInput}>
          <label>Description </label>
          <br />
          <textarea name="description" onChange={handleChangeInput}></textarea>
        </div>

        <div className={styles.formInput}>
          <label>SKU </label>
          <br />
          <input type="number" name="sku" onChange={handleChangeInput} />
        </div>

        <div className={styles.formInput}>
          <label>Channels </label>
          <div className={styles.channelsList}>
            {channels ? (
              channels.map((channel) => {
                const classNames =
                  styles.hbBg +
                  " " +
                  (channel.hasStock ? styles.channelActive : "");
                return (
                  <button
                    className={classNames}
                    onClick={(e) => {
                      e.preventDefault();
                      handleStockForm(channel);
                    }}
                  >
                    {channel.title}
                  </button>
                );
              })
            ) : (
              <p>loading...</p>
            )}
          </div>
        </div>
        <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
    Split equal stocks
      </label>
     
    </div>

        {channels ? (
          channels.map((channel) => {
            return channel.hasStock  && isChecked ? (
              <div className={styles.formInput}>
                <label>Stock Qty for : {channel.title}</label>
                <input
                  type="number"
                  name={`channel${channel.id}`} value={productData.stock} readOnly
                  onChange={(e) => add(e, channel.id)}
                />
              </div>
            ) : (
                channel.hasStock ? (
                  <div className={styles.formInput}>
                    <label>Stock Qty for : {channel.title}</label>
                    <input
                      type="number"
                      name={`channel${channel.id}`}
                      onChange={(e) => add(e, channel.id)}
                    />
                  </div>
                ) : null
              );
          })
        ) : (
          <p>Loading..</p>
        )}

        <button type="submit" className={styles.submitBtn}>
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProdForm;
