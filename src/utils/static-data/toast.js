import { toast } from 'react-toastify';
const toasts = (type, message) => {
    switch (type) {
        case 'SUCCESS':
            return {
                type:'Success',
                desc: message,
                toastType:toast.TYPE.SUCCESS
            }
            case 'ERROR':
                return {
                    type: 'Error',
                    desc: message,
                    toastType:toast.TYPE.ERROR
                }
        default:
            return {
                type,
                desc: message,
                toastType:toast.TYPE.WARNING
            }
    }
}
export const SUCCESS = 'SUCCESS'
export const ERROR = 'ERROR'
export default toasts