import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Filter({ onSearch }) {
  const [input, setInput] = useState('');

  const handleInput = e => {
    const input = e.target.value;

    setInput(input);
    onSearch(input);
  };

  return (
    <label htmlFor="query">
      <span>Filter contacts by name: </span>
      <input id="query" type="text" onChange={handleInput} value={input} />
    </label>
  );
}

Filter.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

// export default class Filter extends Component {
//   static propTypes = {
//     onSearch: PropTypes.func.isRequired,
//   };

//   state = {
//     input: '',
//   };

//   handleInput = e => {
//     const input = e.target.value;

//     this.setState({ input });

//     this.props.onSearch(input);
//   };

//   render() {
//     const { input } = this.state;

//     return (
//       <label htmlFor="query">
//         <span>Filter contacts by name: </span>
//         <input
//           id="query"
//           type="text"
//           onChange={this.handleInput}
//           value={input}
//         />
//       </label>
//     );
//   }
// }
