import React from 'react';

import { Spinner } from '../../components';
import logo from '../../logo.svg';

export class Container2 extends React.Component {
  state={};

  componentDidMount() {
    setInterval(this.hello, 5000);
  }

  hello = () => {
    fetch('/api/customers/get')
      .then(response => response.text())
      .then(message => {
        this.setState({message: message});
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        1<br/>
        {this.state.message}
        <br/>2
        <Spinner />
      </div>
    );
  }
}



// import React from 'react';
// import Helmet from 'react-helmet';
//
// import { Spinner } from '../../components';
// import { postCustomers } from '../../api';
// import logo from '../../logo.svg';
//
// export class Container2 extends React.Component {
//   handleVerification = e => {
//     e.preventDefault();
//     this.submitCheck();
//   };
//
//   submitCheck = () => {
//     const {
//       customer: { id, name },
//     } = this.state;
//
//     this.setState(
//       {
//         customers: [],
//       },
//       () => {
//         this.handleSubmit();
//       },
//     );
//
//     this.scrollToInvalid();
//   };
//
//   scrollToInvalid() {
//     const element = this.form.querySelector(`:invalid:first-of-type`);
//     if (element) {
//       element.scrollIntoView(false);
//       if (element.focus) {
//         element.focus();
//       }
//     }
//   }
//
//   handleSubmit = () => {
//     postCustomers(
//       {
//         ...this.state.customers,
//       },
//       this.state.files,
//     ).then(
//       response => {
//         if (response.success) {
//           this.handleClearForm();
//           this.setState({ isSent: true });
//         } else {
//           console.log('Error');
//         }
//       },
//       error => {
//         console.log('Error', error);
//       },
//     );
//   };
//
//   handleClearForm = e => {
//     if (e) {
//       e.preventDefault();
//     }
//
//     this.fileAttacher.resetValidation();
//
//     this.setState({ ...initialState });
//     localStorage.removeItem(FEEDBACK_ITEM);
//   };
//
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         2
//         <Spinner />
//         <form ref={ref => (this.form = ref)} noValidate onSubmit={this.handleVerification}>
//           <Helmet>
//             <title>Каталог новостроек | Обратная связь</title>
//           </Helmet>
//         </form>
//       </div>
//     );
//   }
// }
