
const GlobalError = ({error,reset}) =>(
    <html>
        <head>
            <title>Something Went Wrong.!</title>
        </head>
        <body>
            <h2>Something Went Wrong.!</h2>
            <p>{error?.message}</p>
            <button>Retry</button>
        </body>
    </html>
)
export default GlobalError