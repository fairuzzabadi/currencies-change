import React from 'react';
import Button from './component/button';
import { formatMoney } from './utils/utils'
import './appsource.scss';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onKeyup = this.onKeyup.bind(this);
        this.input = React.createRef();
        this.state = {
            results: [],
            errMessage: ''
        }
    }

    onClick(e) {
        if(this.validateAll()) {
            this.loadApi(this.input.current.value.toUpperCase());
        } else {
            alert(this.state.errMessage)
        }
    }

    onReset(e) {
        var array = [...this.state.results];
        array.splice(e.target.value, 1);
        this.setState({results: array});
    }

    onKeyup(e) {
        this.input.current.value = this.input.current.value.toUpperCase()
    }

    validateInput() {
        let result = true;
        this.state.results.map((value) => {
            if(this.input.current.value.toUpperCase() == value.name) {
                result = false;
            }
        })
        return result;
    }

    validateAll() {
        if(!this.validateInput()) {
            this.state.errMessage = "Kamu Sudah Pernah Menambahkan Inputan, Silahkan Periksa Kembali";
            return false;
        } else if(this.input.current.value.toUpperCase() == "") {
            this.state.errMessage = "Mohon Isi Currencies";
            return false;
        } else if(this.input.current.value.toUpperCase() == "USD") {
            this.state.errMessage = "Mohon Isi Selain USD";
            return false;
        }
        return true;
    }

    loadApi(currencies) {
        var ws = `https://api.exchangeratesapi.io/latest?base=USD&symbols=${currencies}`,
            xhr = new XMLHttpRequest();
            xhr.open('GET', ws);
            xhr.onload = () => {
                if(xhr.status === 200) {
                    let results = JSON.parse(xhr.responseText),
                        test = results.rates,
                        loop = '';
                        for(loop in test) {
                            let coba = {
                                name: loop,
                                number: test[loop]
                            },
                            data = this.state.results.concat([coba])
                            this.setState({
                                results: data
                            })
                        }
                } else {
                    // ERROR
                    this.state.errMessage = `Status: ${xhr.status}, Error get data`;
                    alert(this.state.errMessage);
                }
            }
            xhr.send();
    }

    render() {
        let results = this.state.results.map((value, index) => {
            return  <div className="append-container" key={index}>
                        <div className="append-container__top">
                            <div className="container-table">
                                <p>1 USD</p>
                                <p>{ `${value.name} ${formatMoney(value.number)}` }</p>
                            </div>
                        </div>
                        <Button className="btn-remove" onClick={this.onReset} label="-" value={index} />
                    </div>
        });

        return <div className="currencies">
                    <h1 className="currencies-label">Simple Change Currencies</h1>
                    <div className="currencies-content">
                        <div className="currencies-content__body">
                            <input className="form-input" type="text" ref={this.input} placeholder="Input Currency e.g: IDR, JPY, etc." onKeyUp={this.onKeyup}></input>
                            <Button className="btn-secondary btn-add" onClick={this.onClick} label="+"/>
                        </div>
                        <p className="currencies-content__term">* currencies are transformed based on 1 USD </p>
                        <div className="currencies-content__append">
                            { results }
                        </div>
                    </div>
                </div>;
    }
}