import React from "react";
import {Button} from "primereact/button";

export default function HeroBanner() {
    return(
       
            <div className="hero-animated-content">
                <h1 className="title">A Melhor Loja Para Você</h1>
                <p className="hero-subtitle">
                    Produtos incríveis com descontos imperdíveis!
                </p>
                <Button
                label="Explorar Produtos"
                className="p-button-lg p-button-rounded p-button-success hero-button"
                onClick={() => window.location.href = "/products"}
                />
            </div>
    )
}