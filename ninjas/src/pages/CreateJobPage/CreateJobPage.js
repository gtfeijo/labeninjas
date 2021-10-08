import axios from "axios";
import React from "react";
import { BASE_URL, headers } from "../../constants/urls";
import { CreateJobContainer } from "./styled";

class CreateJobPage extends React.Component {
  state = {
    title: "",
    description: "",
    price: "",
    dueDate: "",
    paymentMethods: [],
  };

  handleTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  handleDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  handlePrice = (event) => {
    this.setState({ price: event.target.value });
  };

  handleDueDate = (event) => {
    this.setState({ dueDate: event.target.value });
  };

  handlePaymentMethods = (event) => {
    let value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    this.setState({ paymentMethods: value });
  };

  createJob = () => {
    const body = {
      title: this.state.title,
      description: this.state.description,
      price: Number(this.state.price),
      dueDate: this.state.dueDate,
      paymentMethods: this.state.paymentMethods,
    };

    axios
      .post(`${BASE_URL}/jobs`, body, headers)
      .then((res) => {
        alert(`O serviço ${this.state.title} foi cadastrado!`);
        this.setState({
          title: "",
          description: "",
          price: "",
          dueDate: "",
          paymentMethods: [],
        });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  render() {
    return (
      <CreateJobContainer>
        <h1>Cadastre seu serviço</h1>
        <input
          value={this.state.title}
          onChange={this.handleTitle}
          placeholder="Título"
        />
        <input
          value={this.state.description}
          onChange={this.handleDescription}
          placeholder="Descrição"
        />
        <input
          value={this.state.price}
          onChange={this.handlePrice}
          placeholder="Preço"
          type="number"
        />
        <select
          multiple
          value={this.state.paymentMethods}
          onChange={this.handlePaymentMethods}
        >
          <option>Cartão de Débito</option>
          <option>Cartão de Crédito</option>
          <option>PayPal</option>
          <option>Pix</option>
          <option>Boleto</option>
        </select>
        <input
          value={this.state.dueDate}
          onChange={this.handleDueDate}
          placeholder="Prazo do serviço"
          type="date"
        />
        <button onClick={this.createJob}>Cadastrar Serviço</button>
      </CreateJobContainer>
    );
  }
}

export default CreateJobPage;
