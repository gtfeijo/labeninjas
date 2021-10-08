import axios from "axios";
import React from "react";
import { BASE_URL, headers } from "../../constants/urls";
import { convertDate } from "../../utils/convertDate";
import { JobDetailContainer } from "./styled";

class JobDetailPage extends React.Component {
  state = {
    job: {},
  };

  componentDidMount() {
    this.getJob();
  }

  getJob = () => {
    axios
      .get(`${BASE_URL}/jobs/${this.props.jobId}`, headers)
      .then((res) => {
        this.setState({ job: res.data });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  render() {
    const paymentcomponents =
      this.state.job.paymentMethods &&
      this.state.job.paymentMethods.map((pay) => {
        return <li key={pay}>{pay}</li>;
      });
    return (
      <JobDetailContainer>
        {this.state.job.title && <h1>{this.state.job.title}</h1>}
        {this.state.job.price && (
          <p>Preço: R$ {this.state.job.price.toFixed(2)}</p>
        )}
        {this.state.job.dueDate && (
          <p>Prazo: {convertDate(this.state.job.dueDate)}</p>
        )}
        {this.state.job.description && (
          <p>Descrição: {this.state.job.description} </p>
        )}
        <div>{paymentcomponents}</div>
        <button onClick={() => this.props.changePage("list")}>
          Voltar para a lista
        </button>
      </JobDetailContainer>
    );
  }
}

export default JobDetailPage;
