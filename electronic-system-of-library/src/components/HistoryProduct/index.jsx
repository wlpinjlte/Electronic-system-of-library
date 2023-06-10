import './style.css';

function HistoryProduct(props){
    const {title,author,photo,price,quantity,date}=props
    const date_ = new Date(date)
    const format = (x) => {
        return x < 10 ? '0' + x : x
    }
    const day = format(date_.getDate())
    const month = format(date_.getMonth() + 1)
    const year = date_.getFullYear()
    const hour = format(date_.getHours())
    const minutes = format(date_.getMinutes())
    
    
    return(
        <div>
            <div className="box">
                <div className="left">
                    <img className="photo" src={`http://localhost:3000/${photo}`}></img>
                    <div className="name">
                        <p className="font-bold text-lg">{title}</p>
                        <p>{author}</p>
                    </div>
                </div>
                <p className="font-bold text-lg">${price}</p>
                <p className="quantity">Units: {quantity}</p>
                <div className="flex flex-col">
                    <p>{hour}:{minutes}</p>
                    <p>{day}.{month}.{year}</p>
                </div>
            </div>
            <div className="line"></div>
        </div>
    )
}

export default HistoryProduct;