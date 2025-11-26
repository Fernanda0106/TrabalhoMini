import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ProductDetails(){
    const {id} = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchProduct() {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            if (!res.ok) {
                throw new Error("Erro ao buscar produto");
            }
            const data = await res.json();
            setProduct(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchProduct();
    }, [id]);
    if (loading) return <h2>Carregando detalhes do produto...</h2>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>Produto não encontrado</p>
    return(
        <div style={{maxWidth: '900px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px'}}>
            <div  style={{display: "flex", gap:"40"}}>
                <div>
                    <img src={product.image} alt={product.title} style={{ width: "100%", maxHeight: "450px", objectFit:"contain",}}/>
                </div>
                <div style={{flex:1}}>
                    <h1 style={{marginBottom: "10px"}}> {product.title}</h1>
                    <p style={{color: "#555", marginBottom: "15px"}}>Categoria: {product.category}</p>
                    <h2 style={{color:"#222", margin: "20px  0"}}>R$ {product.price.toFixed(2)}</h2>
                    <p style={{marginBottom: "20px", lineHeight: "1.5"}}>{product.description}</p>

                    <button style={{
                        padding: "10px 20px", 
                        backgroundColor: "#007bff", 
                        color: "#fff", 
                        border: "none", 
                        borderRadius: "4px", 
                        cursor: "pointer",
                        fontSize: "16px",
                        marginTop: "10px",}}
                        onClick={() => alert("Adicionado ao carrinho!")} >
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
    );
} 
