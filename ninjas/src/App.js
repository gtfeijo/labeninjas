import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import JobsListPage from "./pages/JobsListPage/JobsListPage";
import CreateJobPage from "./pages/CreateJobPage/CreateJobPage";
import CartPage from "./pages/CartPage/CartPage";
import JobDetailPage from "./pages/JobDetailPage/JobDetailPage";
import Header from "./components/Header/Header";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    padding: 0;
    width: 100vw;
    min-height: 100 vh;
  }

  input{
    width: 300px;
    margin-bottom: 12px;
  }

  select{
    width: 308px;
    margin-bottom: 12px;
  }

`;

class App extends React.Component {
  state = {
    currentPage: "home",
    jobDetailId: "",
    cart: [],
  };

  changePage = (pageName) => {
    this.setState({ currentPage: pageName });
  };

  goToDetailPage = (jobId) => {
    this.setState({ currentPage: "detail", jobDetailId: jobId });
  };

  addToCart = (job) => {
    const newCart = [...this.state.cart, job];
    this.setState({ cart: newCart });
    alert(`O serviço ${job.title} foi adicionado ao carrinho`);
  };

  removeFromCart = (id) => {
    const canDelete = window.confirm(
      "Tem certeza que deseja remover o serviço?"
    );
    if (canDelete) {
      const newCart = this.state.cart.filter((cartItem) => {
        return cartItem.id !== id;
      });
      this.setState({ cart: newCart });
    }
  };

  clearCart = () => {
    this.setState({ cart: [] });
    alert("Obrigado por comprar");
  };

  choosePage = () => {
    switch (this.state.currentPage) {
      case "home":
        return <HomePage changePage={this.changePage} />;
      case "list":
        return (
          <JobsListPage
            addToCart={this.addToCart}
            goToDetailPage={this.goToDetailPage}
          />
        );
      case "form":
        return <CreateJobPage />;
      case "cart":
        return (
          <CartPage
            changePage={this.changePage}
            cart={this.state.cart}
            removeFromCart={this.removeFromCart}
            clearCart={this.clearCart}
          />
        );
      case "detail":
        return (
          <JobDetailPage
            jobId={this.state.jobDetailId}
            changePage={this.changePage}
          />
        );
      default:
        return <HomePage changePage={this.changePage} />;
    }
  };

  render() {
    return (
      <div>
        <GlobalStyle />
        <Header changePage={this.changePage} />
        {this.choosePage()}
      </div>
    );
  }
}

export default App;
