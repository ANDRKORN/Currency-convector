import React, { Component } from "react";
import Currency from "./Currency/Currency";
import s from "./CurrencyConvectorStyle.module.css";

class CurrencyConvector extends Component {
  baseUrl = "https://www.cbr-xml-daily.ru/daily_json.js";
  state = {
    Valute: {},
    oneCurrent: {},
    twoCurrent: {},
    oneCurrentValuesUser: 0,
    result: 0,
  };

  handlerOnChangeCurrent = (data) => {
    this.setState(data);
  };

  handleReversBotton = () => {
    let copy = { ...this.state.oneCurrent };
    this.setState({
      oneCurrent: { ...this.state.twoCurrent },
      twoCurrent: { ...copy },
    });
  };

  componentDidMount() {
    fetch(this.baseUrl)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((currenInfo) => {
        const obj = Object.values(currenInfo.Valute)[0];
        currenInfo.oneCurrent = obj;
        currenInfo.twoCurrent = obj;
        return this.setState(currenInfo);
      });
  }

  render() {
    const date = new Date(this.state.Timestamp).toLocaleString();

    const result =
      (this.state.oneCurrentValuesUser * this.state.oneCurrent.Value) /
        this.state.twoCurrent.Value || 0;
    return (
      <>
        <section className={s.convector}>
          <h1>Сurrency convector</h1>
          <span>{`Дата обновления ${date}`}</span>
          
            <Currency
              result={result}
              oneValuesUser={this.state.oneCurrentValuesUser}
              readonlyInput={false}
              objCurrent={"oneCurrent"}
              handlerOnChangeCurrent={this.handlerOnChangeCurrent}
              Valute={this.state.Valute}
              selectedValute={this.state.oneCurrent}
            />
          <button type="button"
              onClick={() => {
                this.handleReversBotton();
              }}
            >
              revers
            </button>
            <Currency
              resultRus={
                this.state.oneCurrentValuesUser * this.state.oneCurrent.Value ||
                0
              }
              result={result}
              readonlyInput={true}
              objCurrent={"twoCurrent"}
              handlerOnChangeCurrent={this.handlerOnChangeCurrent}
              Valute={this.state.Valute}
              selectedValute={this.state.twoCurrent}
            />         
        </section>
      </>
    );
  }
}

export default CurrencyConvector;
