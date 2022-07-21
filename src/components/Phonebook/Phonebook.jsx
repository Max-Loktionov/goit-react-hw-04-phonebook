import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Label, Input, Submit } from './Phonebook.styled';

export default function Phonebook({ onFormSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleInputChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };
  const reset = () => {
    setName('');
    setNumber('');
  };
  const handleSubmit = e => {
    const data = { name, number };
    e.preventDefault();
    onFormSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor={nameInputId}>
        Name
        <Input
          value={name}
          onChange={handleInputChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id={nameInputId}
        />
      </Label>
      <Label htmlFor={numberInputId}>
        Number
        <Input
          value={number}
          onChange={handleInputChange}
          id={numberInputId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Submit type="submit"> Add contact </Submit>
    </form>
  );
}

// class PhonebookOld extends Component {
//   state = {
//     name: '',
//     number: '',
//   };
//   nameInputId = nanoid();
//   numberInputId = nanoid();
//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };
//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onFormSubmit(this.state);
//     this.reset();
//   };
//   reset = () => {
//     this.setState({ name: '', number: '' });
//   };
//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <Label htmlFor={this.nameInputId}>
//           Name
//           <Input
//             value={name}
//             onChange={this.handleInputChange}
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//             id={this.nameInputId}
//           />
//         </Label>
//         <Label htmlFor={this.numberInputId}>
//           Number
//           <Input
//             value={number}
//             onChange={this.handleInputChange}
//             id={this.numberInputId}
//             type="tel"
//             name="number"
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//           />
//         </Label>
//         <Submit type="submit"> Add contact </Submit>
//       </form>
//     );
//   }
// }

// export default Phonebook;
