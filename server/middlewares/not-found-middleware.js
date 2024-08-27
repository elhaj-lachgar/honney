import  ErrorHandler from '../utils/error-handler.js';


const NotFoundMiddleware = (req , res , next ) => {
    return next(new ErrorHandler('route not found' , 404));
}
 
export default NotFoundMiddleware ; 