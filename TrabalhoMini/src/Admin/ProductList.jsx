import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchProducts(){
        try{
            setLoading(true);
            const res =await fetch("https://fakestoreapi.com/products");
            const data= await res.json
            setProducts(data);
        } catch (err){
            setError ("Erro ao carregar produtos");
            console.log(err)
        } finally{
            setLoading(false)
        }
    }
    async function handleDelete(id) {
        const confirmDelete= window.confirm("Deseja realmente excluir este produto?");
        if (!confirmDelete) return;

        try {
            await fetch (`https://fakestoreapi.com/products/&{id}`, {
                method: "DELETE",
            })
            //REMOVE VISUALMENTE APÓS DELETAR
            setProducts((prev)=> prev.filter((p)=> p.id !== id));
        } catch (err){
            alert ("Erro ao excluir produto")
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchProducts();
    }, []);

    if (loading) return <p className="p-6">Carregando...</p>
    if (error) return <p className="p-6 text-red-500">{error}</p>

    return(
        <div className="p-6">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-semibold">Produtos</h1>
                <Link 
                to="/admin/products/new"
                className="bg-blue-600 text-white px-4 py-2 rounded">+ Novo produto</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Imagem</th>
                            <th className="p-2 border">Nome</th>
                            <th className="p-2 border">Preço</th>
                            <th className="p-2 border">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p)=>(
                            <tr key={p.id}>
                                <td className="p-2 border">{p.id}</td>
                                <td className="p-2 border">
                                    <img src={p.image} alt={p.title} className="h-12 mx-auto" />
                                </td>
                                <td className="p-2 border">{p.title}</td>
                                <td className="p-2 border">
                                    {p.price.toLocaleString("pt-BR",{
                                        style: "currency",
                                        currency:"BRL",
                                    })}
                                </td>
                                <td className="p-2 border text-center">
                                    <Link
                                    to={`/admin/products/${p.id}`}
                                    className="px-2 py-1 bg-yellow-400 text-black rounded mr-2">Editar</Link>
                                    <button onClick={() => handleDelete(p.id)}
                                    className="px-2 py-1 bg-red-600 text-white rounded">Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
