import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuidv1 from 'uuid/v1';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 600px;
`;

const FormField = styled.label`
  margin-bottom: 20px;
`;

const disabledBtnStyles = `
  pointer-events: none;
  background-color: #bdbdbd;
  outline: none;

  :hover,
  :focus {
    background-color: #bdbdbd;
  }
`;

const Button = styled.button`
  display: inline;
  border: 0;
  padding: 6px 16px;
  margin-left: 4px;
  margin-right: 4px;
  background-color: #3884ff;
  border-radius: 3px;
  transition: all 200ms ease;
  font-family: inherit;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  :hover,
  :focus {
    background-color: #1f65d6;
  }

  ${({ disabled }) => disabled && disabledBtnStyles}
`;

export default function ContactForm({ onAddContact, isNameUnique }) {
  // Form inputs
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameInput = e => {
    setName(e.target.value);
  };

  const handleNumberInput = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!isNameUnique(name)) {
      toast.warning(`Contact ${name} already exists`);
      return;
    }

    const newContact = { id: uuidv1(), name, number };
    onAddContact(newContact);

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  // Submit button
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    setBtnDisabled(!name || !number);
  }, [name, number]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormField htmlFor="name">
        <span>Name: </span>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={handleNameInput}
        />
      </FormField>

      <FormField htmlFor="number">
        <span>Number: </span>
        <input
          id="number"
          name="number"
          type="tel"
          value={number}
          onChange={handleNumberInput}
        />
      </FormField>

      <Button type="submit" disabled={btnDisabled}>
        Add contact
      </Button>
    </Form>
  );
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
  isNameUnique: PropTypes.func.isRequired,
};

// export default class AddingContactForm extends Component {
//   static propTypes = {
//     onAddContact: PropTypes.func.isRequired,
//     isNameUnique: PropTypes.func.isRequired,
//   };

//   state = {
//     name: '',
//     number: '',
//     btnDisabled: true,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { name, number } = this.state;

//     if (prevState.name !== name || prevState.number !== number) {
//       this.checkForEmptyFields();
//     }
//   }

//   checkForEmptyFields = () => {
//     const { name, number } = this.state;

//     if (name && number) {
//       this.setState({
//         btnDisabled: false,
//       });
//     } else {
//       this.setState({
//         btnDisabled: true,
//       });
//     }
//   };

//   handleInput = e => {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     const { name, number } = this.state;
//     const { isNameUnique, onAddContact } = this.props;

//     if (!isNameUnique(name)) {
//       toast.warning(`Contact ${name} already exists`);
//       return;
//     }

//     const contact = { id: uuidv1(), name, number };

//     onAddContact(contact);

//     this.reset();
//   };

//   reset = () => this.setState({ name: '', number: '' });

//   render() {
//     const { name, number, btnDisabled } = this.state;

//     return (
//       <Form onSubmit={this.handleSubmit}>
//         <FormField htmlFor="name">
//           <span>Name: </span>
//           <input
//             id="name"
//             name="name"
//             type="text"
//             value={name}
//             onChange={this.handleInput}
//           />
//         </FormField>

//         <FormField htmlFor="number">
//           <span>Number: </span>
//           <input
//             id="number"
//             name="number"
//             type="tel"
//             value={number}
//             onChange={this.handleInput}
//           />
//         </FormField>

//         <Button type="submit" disabled={btnDisabled}>
//           Add contact
//         </Button>
//       </Form>
//     );
//   }
// }
