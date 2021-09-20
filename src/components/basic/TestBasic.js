import React from 'react';
import moment from 'moment';
import Input from './Input';
import Button from './Button';
import Checkbox from './Checkbox';
import Radio from './Radio';
import Datetime from './Datetime';
import Select from './Select';
import Table from './Table';

class TestBasic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: {
        name: 'test input',
        value: '',
        message: '',
      },
      checkBox: {
        text: 'Choose as many as you like',
        name: 'checkbox',
        values: [],
        options: [{
          text: 'First',
          value: 'first',
        }, {
          text: 'Second',
          value: 'second',
        }, {
          text: 'Third',
          value: 'third',
        }],
      },
      radio: {
        text: 'Choose only one',
        name: 'radio',
        value: '',
        options: [{
          text: 'First',
          value: 'first',
        }, {
          text: 'Second',
          value: 'second',
        }, {
          text: 'Third',
          value: 'third',
        }],
      },
      datetime: {
        name: 'Choose a date',
        value: moment(),
      },
      select: {
        value: 'choose',
        options: [{
          value: 'choose',
          text: 'Choose an option...',
          hidden: true,
        }, {
          value: 'red',
          text: 'Red',
        }, {
          value: 'green',
          text: 'Green',
        }, {
          value: 'blue',
          text: 'Blue',
        }],
      },
    };
  }

  onChangeInput = (value) => {
    this.setState((prev) => ({
      input: {
        ...prev.input,
        value,
      },
    }));
  };

  onChangeCheckbox = (value) => {
    const { checkBox } = this.state;
    const values = checkBox.values.slice(0);
    if (values.includes(value)) {
      values.splice(values.indexOf(value), 1);
    } else {
      values.push(value);
    }

    this.setState((prev) => ({
      checkBox: {
        ...prev.checkBox,
        values,
      },
    }));
  };

  onChangeRadio = (value) => {
    this.setState((prev) => ({
      radio: {
        ...prev.radio,
        value,
      },
    }));
  };

  onChangeDatetime = (value) => {
    if (typeof value === 'object') {
      this.setState((prev) => ({
        datetime: {
          ...prev.datetime,
          value,
        },
      }));
    }
  };

  onChangeSelect = (value) => {
    this.setState((prev) => ({
      select: {
        ...prev.select,
        value,
      },
    }));
  }

  render = () => {
    const {
      input, checkBox, radio, datetime, select,
    } = this.state;
    return (
      <div style={{ paddingLeft: '30px', paddingTop: '20px', paddingBottom: '30px' }}>
        <Input
          name={input.name}
          value={input.value}
          message={input.message}
          onChange={this.onChangeInput}
          type="text"
          width="30%"
        />
        <br />
        <Input
          name={input.name}
          value={input.value}
          message={input.message}
          onChange={this.onChangeInput}
          type="password"
          width="30%"
        />
        <br />
        <Button className="w-25">
          Lock...
          {' '}
          <span className="fas fa-lock" />
        </Button>
        <br />
        {' '}
        <br />
        <Checkbox
          text={checkBox.text}
          name={checkBox.name}
          options={checkBox.options}
          values={checkBox.values}
          onChange={this.onChangeCheckbox}
        />
        <br />
        <Radio
          text={radio.text}
          name={radio.name}
          options={radio.options}
          value={radio.value}
          onChange={this.onChangeRadio}
        />
        <br />
        <Datetime
          name={datetime.name}
          value={datetime.value}
          onChange={this.onChangeDatetime}
          width="30%"
        />
        <br />
        <Select
          name={select.name}
          value={select.value}
          options={select.options}
          onChange={this.onChangeSelect}
          width="20%"
        />
        <br />
        <Table width="80%">
          <thead>
            <tr>
              <th>First col</th>
              <th>Second col</th>
              <th>Third col</th>
              <th>Fourth col</th>
              <th>Fifith col</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The</td>
              <td>quick</td>
              <td>brown</td>
              <td>fox</td>
              <td>jumps</td>
            </tr>
            <tr>
              <td>over</td>
              <td>the</td>
              <td>lazy</td>
              <td>dogs</td>
              <td>...</td>
            </tr>
            <tr>
              <td>Lorem</td>
              <td>ipsum</td>
              <td>dolor</td>
              <td>sit</td>
              <td>amet</td>
            </tr>
            <tr>
              <td colSpan={5}>Something here...</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TestBasic;
