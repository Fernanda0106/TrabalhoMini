import { Button } from "primereact/button";
import "./HeroBanner.css";

export default function HeroBanner() {
    return (
        <div className="hero-container">
            <div className="hero-content">
                <h1 className="hero-title">Descubra Produtos Incríveis</h1>
                <p className="hero-subtitle">
                    As melhores ofertas da Fake Store reunidas em um só lugar.  
                    Qualidade, estilo e preço justo para você!
                </p>

                <Button 
                    label="Ver Produtos"
                    className="p-button-lg p-button-rounded p-button-success mt-3"
                    onClick={() => (window.location.href = "/products")}
                />
            </div>

            <div className="hero-image">
                <img 
                    src="https://fakestoreapi.com/icons/logo.png" 
                    alt="Hero Banner"
                />
            </div>
        </div>
    );
}