import React from "react";
import JobCard from "../../components/JobCard/JobCard";
import axios from "axios";
import { BASE_URL, headers } from "../../constants/urls";
import { JobsListContainer, FiltersContainer } from "./styled";

class JobsListPage extends React.Component {
  state = {
    jobsList: [],
    filteredJobsList: [],
    minVal: "",
    maxVal: "",
    search: "",
    order: "",
  };

  componentDidMount() {
    this.getJobs();
    this.filterJobs();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.minVal !== prevState.minVal ||
      this.state.maxVal !== prevState.maxVal ||
      this.state.search !== prevState.search ||
      this.state.order !== prevState.order
    ) {
      this.filterJobs();
    }
  }

  handleMinVal = (e) => {
    this.setState({ minVal: e.target.value });
  };

  handleMaxVal = (e) => {
    this.setState({ maxVal: e.target.value });
  };

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  handleOrder = (e) => {
    this.setState({ order: e.target.value });
  };

  getJobs = () => {
    axios
      .get(`${BASE_URL}/jobs`, headers)
      .then((res) => {
        this.setState({
          jobsList: res.data.jobs,
          filteredJobsList: res.data.jobs,
        });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  filterJobs = () => {
    const maximum = this.state.maxVal ? Number(this.state.maxVal) : Infinity;
    const minimum = this.state.minVal ? Number(this.state.minVal) : -Infinity;

    const newJobsList = this.state.jobsList
      .filter((job) => job.price >= minimum)
      .filter((job) => job.price <= maximum)
      .filter((job) => {
        const jobTitle = job.title.toLowerCase();
        const jobDescription = job.description.toLowerCase();
        const searchText = this.state.search.toLocaleLowerCase();
        return (
          jobTitle.includes(searchText) || jobDescription.includes(searchText)
        );
      })
      .sort((a, b) => {
        switch (this.state.order) {
          case "Menor Valor":
            return a.price - b.price;
          case "Maior Valor":
            return b.price - a.price;
          case "Título":
            return a.title.localeCompare(b.title);
          case "Prazo":
            return a.dueDate.localeCompare(b.dueDate);
        }
      });

    this.setState({ filteredJobsList: newJobsList });
  };

  render() {
    const jobComponents = this.state.filteredJobsList.map((job) => {
      return (
        <JobCard
          key={job.id}
          job={job}
          goToDetailPage={this.props.goToDetailPage}
          addToCart={this.props.addToCart}
        />
      );
    });

    return (
      <div>
        <FiltersContainer>
          <input
            value={this.state.minVal}
            onChange={this.handleMinVal}
            placeholder="Valor Mínimo"
          />
          <input
            value={this.state.maxVal}
            onChange={this.handleMaxVal}
            placeholder="Valor Máximo"
          />
          <input
            value={this.state.search}
            onChange={this.handleSearch}
            placeholder="Busca por título ou descrição"
          />
          <select value={this.state.order} onChange={this.handleOrder}>
            <option>Sem Ordenação</option>
            <option>Menor Valor</option>
            <option>Maior Valor</option>
            <option>Título</option>
            <option>Prazo</option>
          </select>
        </FiltersContainer>

        <JobsListContainer>{jobComponents}</JobsListContainer>
      </div>
    );
  }
}

export default JobsListPage;
