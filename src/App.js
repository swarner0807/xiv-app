import React from 'react'
import Header from './components/header'
import Body from './components/body'
import Footer from './components/footer'
// import connect from "react-redux/es/connect/connect";

// const mapStateToProps = function(state){
//   return {
//     changePage: state.changePage
//   }
// };

class App extends React.Component{

  render() {
    return (
        <div className={'wrapper'}>
          <Header />
          <Body />
          <Footer />
        </div>
    );

  }
}

export default App
// export default connect(mapStateToProps)(App)
