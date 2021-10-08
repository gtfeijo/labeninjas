import React from "react";
import CartCard from "../../components/CartCard/CartCard";

class CartPage extends React.Component {
  render() {
    const cartComponents = this.props.cart.map((item) => {
      return (
        <CartCard
          key={item.id}
          title={item.title}
          price={item.price}
          id={item.id}
          removeFromCart={this.props.removeFromCart}
        />
      );
    });

    let totalPrice = 0;

    this.props.cart.forEach((item) => {
      totalPrice += item.price;
    });
    return (
      <div>
        {cartComponents.length > 0 ? (
          <div>
            {cartComponents}
            <span>Total: R${totalPrice.toFixed(2)} </span>
            <button onClick={() => this.props.clearCart()}>
              Finalizar Compra
            </button>
            <button onClick={() => this.props.changePage("list")}>
              Voltar para lista
            </button>
          </div>
        ) : (
          <h1>Carrinho Vazio</h1>
        )}
      </div>
    );
  }
}

export default CartPage;
