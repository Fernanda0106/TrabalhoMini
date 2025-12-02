import { useEffect, useState } from "react";
import axios from "axios";
import HeroBanner from '../components/HeroBanner';
import { Card } from 'primereact/card';
import { Carousel } from 'primereact/carousel'; 
import ProductCard from '../components/ProductCard';
import { Skeleton } from 'primereact/skeleton';


export default function Home(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState (true);

    async function loadProducts(){
        try{
            const res = await axios.get ("https://fakestoreapi.com/products");
            setProducts(res.data);
        } catch(error){
            console.error("Erro ao carregar produtos", error);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        loadProducts();
    }, []);
    return(
        <>
        <HeroBanner/>
        {/*Categorias*/}
        <section className="categorias">
            <h2 className="TEXT">Categorias</h2>
            <div>{["eletronicos", "roupas "].map(
                (cat)=>(
                    <Card
                    key={cat}>
                        <span>{cat}</span>
                    </Card>
                )
            )}</div>
        </section>

              {/* Carrossel de Destaques */}
      <section className="max-w-6xl mx-auto p-4 mt-12">
        <h2 className="text-2xl font-bold mb-4">Destaques</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} width="100%" height="300px" />
              ))}
          </div>
        ) : (
          <Carousel
            value={products}
            numVisible={4}
            numScroll={1}
            autoplayInterval={3000}
            circular
            itemTemplate={(item) => <ProductCard product={item} />}
          />
        )}
      </section>

      {/* Todos os Produtos */}
      <section className="max-w-6xl mx-auto p-4 mt-12">
        <h2 className="text-2xl font-bold mb-4">Todos os Produtos</h2>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} width="100%" height="300px" />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
