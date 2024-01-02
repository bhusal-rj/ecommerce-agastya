import styles from "./ProductsList.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {faFilter} from "@fortawesome/free-solid-svg-icons"

const ProductsList = function(){
    return (
        <div className={styles.parent}>
            <div className={styles.formInput}>
               <input type="text" name="price" placeholder="Search Product"/>
            </div>
            <div className={styles.infoLine}>
             <FontAwesomeIcon icon={faFilter} /> <span className={styles.lightGray}>Filter By</span>
            </div>
        </div>
    )
}

export default ProductsList;