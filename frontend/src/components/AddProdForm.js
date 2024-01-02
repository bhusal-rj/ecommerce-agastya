import styles from "./AddProdForm.module.css"
function AddProdForm(){
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-input">
                <label>Product Name </label>
                <input type="text" name="name" />
                </div>

                <div className="form-input">
                <label>Price</label>
                <input type="number" name="price" />
                </div>

                <div className="form-input">
                <label>Description </label>
                <textarea name="description"></textarea>
                </div>

                <div className="form-input">
                <label>Channels </label>
                <input type="text" name="channels" />
                </div>

                <button type="submit">Add Product</button>
            </form>
        </div>
    )
}

export default AddProdForm;