import '../index.css'
import './notificationFlags.js'
import NotificationFlags from './notificationFlags.js';

const Notification = ({message, flag}) => {

    if(!message)
        return null

    switch (flag) {
        case NotificationFlags.Success:
            return (                
                <div className='notification success'>{message}</div>
            )

        case NotificationFlags.Error:
            return (
                <div className='notification error'>{message}</div>
            )

        default:
            throw new Error(`Unimplemented exception for ${flag}`);
    }
}

export default Notification