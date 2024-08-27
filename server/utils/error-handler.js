

class ErrorHandler extends Error {
    constructor ( message , code ) {
        super(message);
        this.StatusCode  = code || 500 ;
        this.status  = !code || code == 500 ? 'error' : 'failed'; 
    }
}

export default ErrorHandler;