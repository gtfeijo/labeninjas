import React from "react";
import { Card } from "./styled";
import { convertDate } from "../../utils/convertDate";

const JobCard = (props) => {
  return (
    <Card>
      <h3>{props.job.title}</h3>
      <p>
        <b>Preço</b>: R$ {props.job.price.toFixed(2)}
      </p>
      <p>
        <b>Prazo</b>: {convertDate(props.job.dueDate)}
      </p>
      <button onClick={() => props.goToDetailPage(props.job.id)}>
        Ver detalhes
      </button>
      <button onClick={() => props.addToCart(props.job)}>
        Adicionar no carrinho
      </button>
    </Card>
  );
};

export default JobCard;
