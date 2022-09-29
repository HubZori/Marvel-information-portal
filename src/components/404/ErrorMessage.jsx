    import gif from './404.gif';

    const ErrorMessage = () => {
        return <img src={gif} style={{display: 'block' ,  height: "300px", objectFit: 'contain', margin: '0 auto'}} alt="Error"  />
    }

    export default ErrorMessage;