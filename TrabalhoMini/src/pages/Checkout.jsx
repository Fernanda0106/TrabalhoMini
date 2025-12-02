import { useState } from "react";
import { Cart } from "../components/CartContex";
import { useNavigate } from "react-router-dom";

export default function Checkout () {
    const {cartItems, clearCart} = Cart();
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price, 0
    );

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [success, setSuccess] = useState(false);

    function handleCheckout (e){
        e.preventDefault();

        //Validação

        if (!name || !address || !zip || !cardNumber){
            alert ("Por favor, preencha todos os campos");
            return;
        }
        setSuccess (true);

        setTimeout (()=>{
            clearCart();
            navigate ("/");
        }, 2500);

    }
    if(cartItems.length === 0 && !success){
        return <h2 style={{ padding: "20px" }}>Seu carrinho está vazio</h2>;
    }
    return(
        <div style={{maxWidth:"900px", margin:"0 auto", padding:"20px"}}>
            <h1 className="text-3x1 font-bold mb-6"> Finalizar Compra</h1>
            {success?(
                <div style={{
                    padding:"20px",
                    backgroundColor:"#d4ffd4",
                    borderRadius:"8px",
                    textAlign:"center",
                    fontSize:"18px",
                    fontWeight:"bold",
                }}
                >
                    Compra realizada com sucesso!
                    <p style={{fontSize:"16px", marginTop:"10px"}}>
                        Você será redirecionado para a página inicial em breve...
                    </p>
                </div>
            ) :(
                <>
                {/*Resumo do pedido */}
                <section
                style={{
                    border:"1px solid #ccc",
                    padding:"20px",
                    borderRadius:"8px",
                    marginBottom:"20px",
                }}
                >
                    <h2 className="text-x1 font-semibold mb-4">Resumo do Pedido</h2>

                    {cartItems.map ((item) =>(
                        <div
                        key={item.id}
                        style={{
                            display:"flex",
                            justifyContent:"space-between",
                            padding:"10px 0",
                            borderBottom:"1px solid #eee",
                        }}
                        >
                            <span>{item.title}</span>
                            <span>{item.price.toFixed(2)}</span>
                        </div>
                    ))}

                    <h3
                    style={{
                        marginTop:"10px",
                        fontSize:"20px",
                        fontWeight:"bold",
                    }}
                    >
                        Total:R${totalPrice.toFixed(2)}
                    </h3>
                </section>
                {/*Formulário */}
                <form
                onSubmit={handleCheckout}
                style={{
                    border:"1px solid #ccc",
                    padding:"20px",
                    borderRadius:"8px",
                }}
                >
                    <h2 className="text-x1 font-semibold mb-4">Informações do Cliente</h2>

                    <label>Nome Completo</label>
                    <input
                    type="text"
                    placeholder="Seu Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={inputStyle}
                    />

                    <label>Endereço</label>
                    <input
                    type="text"
                    placeholder="Rua, Número, Bairro"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    style={inputStyle}
                    />

                    <label>CEP</label>
                    <input
                    type="text"
                    placeholder="00000-000"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    required
                    style={inputStyle}
                    />
                    <h2 className="text-x1 font-semibold mt-6 mb-4">
                        Informações de Pagamento
                    </h2>

                    <label>Número do Cartão</label>
                    <input
                    type="text"
                    placeholder="**** **** **** ****"
                    value={cardNumber}
                    maxLength={16}
                    onChange={(e) => setCardNumber (e.target.value)}
                    required
                    style={inputStyle}
                    />

                    <button
                    type="submit"
                    style={{
                        marginTop:"20px",
                        width:"100%",
                        padding:"12px",
                        backgroundColor:"#28a745",
                        color:"#fff",
                        fontSize:"18px",
                        border:"none",
                        borderRadius:"6px",
                        cursor:"pointer",
                    }}
                    >
                        Finalizar Compra
                    </button>
                </form>
                </>
            )}
        </div>
    );
}
const inputStyle = {
    width:"100%",
    padding:"10px",
    marginBottom:"15px",
    border:"1px solid #ccc",
    borderRadius:"6px",
    fontSize:"16px",
}