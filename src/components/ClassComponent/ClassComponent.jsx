import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: `Введите число от ${this.props.min} до ${this.props.max}`,
      userNumber: '',
      randomNumber:
        Math.floor(Math.random() * (this.props.max - this.props.min + 1)) +
        this.props.min,
      count: 0,
      labelButton: 'Угадать',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.labelButton === 'Сыграть ещё') {
      this.setState((state) => {
        console.log(state);
        return {
          result: `Введите число от ${this.props.min} до ${this.props.max}`,
          userNumber: '',
          randomNumber:
            Math.floor(Math.random() * (this.props.max - this.props.min + 1)) +
            this.props.min,
          count: 0,
          labelButton: 'Угадать',
        };
      });
    }

    this.setState((state) => ({
      count: state.count + 1,
    }));
    this.setState((state) => {
      console.log(state);
      if (!state.userNumber) {
        return {
          result: `Введите число от ${this.props.min} до ${this.props.max}`,
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          userNumber: '',
          result: `${state.userNumber} больше загаданного`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          userNumber: '',
          result: `${state.userNumber} меньше загаданного`,
        };
      }

      return {
        userNumber: '',
        result: `Вы угадали число ${state.randomNumber},
          за ${state.count} попыток`,
        labelButton: 'Сыграть ещё',
      };
    });
  };

  handleChange = (e) => {
    this.setState((state) => ({
      userNumber: e.target.value,
    }));
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form onSubmit={this.handleSubmit} className={style.form}>
          <label className={style.label} htmlFor="user_number">
            Угадай число
          </label>
          <input
            onChange={this.handleChange}
            value={this.state.userNumber}
            className={style.input}
            type="number"
            id="user_number"
            disabled={this.state.labelButton === 'Сыграть ещё'}
          />
          <button className={style.btn}>{this.state.labelButton}</button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
