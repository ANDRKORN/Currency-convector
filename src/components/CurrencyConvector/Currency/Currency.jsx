import React from "react";
import s from "./Currency.module.css";

const Currency = (props) => {

  const handlerOnChangeCurrent = (e) => {
    const obj = props.objCurrent;
    const changeCurrent =
      props.Valute[
        e.target.options[e.target.options.selectedIndex].textContent
      ];
          props.handlerOnChangeCurrent({ [obj]: changeCurrent });

  };

  const handlerChangeValueInput = (e) => {
    e.target.value =
      e.target.value === e.target.valueAsNumber
        ? e.target.value
        : e.target.valueAsNumber;
    props.handlerOnChangeCurrent({
      [props.objCurrent + "ValuesUser"]: e.target.value,
    });
  };
  const option = Object.values(props.Valute).map((elem) =>
    elem.CharCode === props.selectedValute.CharCode ? (
      <option key={elem.ID} value={elem.CharCode}>
        {elem.CharCode}
      </option>
    ) : (
      <option key={elem.ID} value={elem.Value}>
        {elem.CharCode}
      </option>
    )
  );

  return (
    <div className={s.currency_main}>
      <span>{props.selectedValute.Name}</span>
      <div>
        <select          
          value={props.selectedValute.CharCode}
          name=""
          id=""         
          onChange={(e) => handlerOnChangeCurrent(e)}
        >
          {option}
        </select>
        <input
          type="number"
          value={props.oneValuesUser || props.result}
          readOnly={props.readonlyInput}
          onChange={(e) => handlerChangeValueInput(e)}
        />
        {props.readonlyInput ? (
          <div>
            <div>В рублях</div>
            <input
              type="number"
              value={props.resultRus}
              readOnly={props.readonlyInput}
              onChange={(e) => handlerChangeValueInput(e)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Currency;
