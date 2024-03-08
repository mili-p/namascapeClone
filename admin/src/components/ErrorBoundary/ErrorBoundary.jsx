import React from "react"
import Button from '../Button'
import PagenotFound from '../../assets/images/page-not-found.png'
import { Link } from "react-router-dom"
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null,show:false }
  }

  componentDidCatch(error, errorInfo,show) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
      show:show
    })
  }

  render() {
    if (this.state.errorInfo) {
      console.log(this.state.error.toString(),"Error");
      return (
        <>
        {/* <section className="page-not-found">
          <div className="errorboundary-box">
          <div className="something-wrongbox text-center">
            <div className="title">
            <h3>Something went wrong!</h3>
            </div>
            <p>{this.state.error && this.state.error.toString()}</p>
            <pre>{(this.state.errorInfo.componentStack)}</pre>
             <div className="wrong-btn">
            <Button text="Please Retry" isLink={false} onClick={() =>window.location.reload()} />
          </div>
          </div>

            </div>
        </section> */}
        <section className='error-boundry'>
        <div className="boundry-content">
          <div className="content">
            <h2>Something went wrong!</h2>
            <p>{this.state.error && this.state.error.toString()}</p>
            <p>if the issue continues, please <button type="button" className="link-btn">get in touch.</button></p>
            <button className="solid-btn" type="button" onClick={() =>window.location.reload()}>Please Retry</button>
          </div>
          {show &&  <pre >{(this.state.errorInfo.componentStack)}</pre>}
         
          {/* <p>The page you are looking for might have been removed had it is name changed or is temporarily unavalable.</p> */}
        </div>
      </section>
      </>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
