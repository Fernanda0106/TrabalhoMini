import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Cart } from "../components/CartContex";



export default function ProductDetails(){
    const {id} = useParams();
    const { addToCart } = Cart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [related, setRelated] = useState([]);
    const [qty, setQty] = useState(1);

    async function fetchProduct() {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await res.json();
            setProduct(data);

            await fetchRelated(data.category)
        }catch (err) {
            console.log("Erro ao carregar produto", err)
        }finally {
            setLoading(false);
        }
    }
    async function fetchRelated(category) {
        try{
            const res = await fetch (`https://fakestoreapi.com/products/category/${category}`);
            const data = await res.json();
            setRelated(data.filter((item) => item.id != id)); 

        } catch (err) {
            console.log("Erro ao carregar produtos relacionados", err);
        }

    }
    useEffect(() => {
        setLoading(true);
        fetchProduct();
    }, [id]);

    if (loading) return <h2 style={{textAlign: "center"}}>Carregando detalhes do produto...</h2>;
    return(
        <div style={{display: "flex", gap:"40px", marginBottom:"40px"}}>
        {/*imagem do produto */}
        <div style={{flex:1}}>
            <img
            src={product.image}
            alt={product.title}
            style={{
                width: "100%",
                maxHeight: "450px",
                objectFit:"contain",
                borderRadius: "10px",
            }}
            />

        </div>

        {/*Detalhes do produto */}
        <div style={{flex:1}}>
            <h1 style={{marginBottom: "5px"}}>{product.title}</h1>

            {/*Categoria */}
            <span
            style={{
                fontSize: "14px",
                backgroundColor: "#eee",
                padding: "5px 10px",
                borderRadius: "5px",
                marginBottom: "15px",
                display: "inline-block",
            }}>{product.category}</span>

            {/*Avaliação */}
            <div style={{margin:"10px 0", fontSize: "18px"}}>
                ⭐ {product.rating?.rate} 
                <span style={{color:"#777"}}>({product.rating?.count} Avaliações)</span>
            </div>

            {/*Preço */}
            <h2 style={{color:"#28a745", margin:"15px 0"}}>
                R${product.price.toFixed(2)}
            </h2>
            <p style={{marginBottom: "20px", lineHeight: "1.5"}}>
                {product.description}
                </p>
            {/*Quantidade */}
            <div style={{display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px"}}>
               <button
               onClick={()=> qty > 1 && setQty (qty -1)}
               style={{
                padding:"6px 12 px",
                fontSize: "18px",
                cursor: "pointer",
               }}
               >
                -
               </button>
               <span style={{fontSize: "18px", fontWeight: "bold"}}>{qty}</span>

               <button
               onClick={()=> setQty (qty +1)}
                style={{
                    padding:"6px 12 px",
                    fontSize: "18px",
                    cursor: "pointer",
                }}
               >
                +
               </button>

               {/*botao Adicionar ao carrinho */}
               <button
               onClick={() => addToCart({ ...product, quantity:qty})}
               style={{
                padding:"12px 24px",
                background:"#007bff",
                color:"#fff",
                border:"none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
               }}
               >
                Adiconar ao Carrinho
               </button>

            </div>
        </div>
        {/*Produtos relacionados */}
        <h2 style={{ marginBottom:"15px"}}>Produtos Relacionados</h2>
        <div style={{display:"flex", gap:"20px", overflowX: "auto", paddingBottom:"10px"}}>
            {related.length === 0 &&<p>Nenhum produto relacionado encontrado.</p>}
            {related.map((item)=>(
                <div
                key={item.id}
                style={{
                    minWidth: "200px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "15px",
                    cursor: "pointer",
                }}
                onClick={()=>( window.location.href = `/product/${item.id}`)}
                >
                    <img
                    src={item.image}
                    alt={item.title}
                    style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "contain",
                    }}
                    />
                    <h4 style={{marginBottom: "10px", fontSize: "16px"}}>{item.title}</h4>
                    <p style={{color:"#28a745", fontWeight:"bold"}}>
                        R${item.price.toFixed}
                    </p>
                </div>
            ))}
        </div>
    </div>
    )
   
} 
