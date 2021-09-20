import { toast } from 'react-toastify';
import './style.scss'
const ToastMessage = (params) => {
    const {type, desc, toastType} = params
    const options  =  {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        type:toastType
    }
    const ToastLayout = () => {
        return (
            <div className="toast">
                <p className= "toast__title">{type}</p>
                <span className = "toast__message">{desc}</span>
            </div>
        )
    }
 
    return toast(<ToastLayout />,options);
}



export default ToastMessage
