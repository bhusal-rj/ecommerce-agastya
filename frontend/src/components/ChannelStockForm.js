import styles from "./ChannelStockForm.module.css";
function channelStockForm({channelName}){
    channelName = "Daraz";
    return(
        <div className={styles.formInput}>
            <label>Stock for : {channelName}</label>
            <input type="number" name="price" />
        </div>
    )
}

export default channelStockForm;