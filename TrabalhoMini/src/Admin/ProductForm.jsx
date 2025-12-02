import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductForm() {
    const { id } = useParams(); //se existir   edição
    const navigate = useNavigate();

    const isEditing = Boolean(id);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(isEditing);
    const [error, setError] = useState("");

    async function fetchProduct(){
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await response.json();
            setTitle(data.title);
            setPrice(data.price);
            setImages(data.images);
            setCategory(data.category);
            setDescription(data.description);
        } catch  {    
            setError("erro ao carregar produto");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isEditing) {
            fetchProduct();
        }
    }, [id]);
    
    async function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            images,
            category,
            description,
        };

        try {
            setLoading(true);

            if (isEditing) {
                await fetch(`https://fakestoreapi.com/products/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } else{
                await fetch("https://fakestoreapi.com/products", {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }
            navigate("/admin/products");
        } catch (err) {   // <-- AQUI ERA O ERRO. Corrigido.
            alert(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p className="p-6">Carregando...</p>;
    if (error) return <p className="p-6">{error}</p>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2x1 font-semibold mb-4">
                {isEditing ? "Editar Produto" : "Adicionar Produto"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Preço</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Categoria</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Descrição</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Salvando..." : "Salvar Produto"}
                </button>
            </form>  
        </div>
    )
}


/*import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductForm() {
    const { id } = useParams(); //se existir   edição
    const navigate = useNavigate();

    const isEditing = Boolean(id);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(isEditing);
    const [error, setError] = useState("");

    async function fetchProduct(){
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await response.json();
            setTitle(data.title);
            setPrice(data.price);
            setImages(data.images);
            setCategory(data.category);
            setDescription(data.description);
        } catch (err) {
            setError("erro ao carregar produto");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (isEditing) {
            fetchProduct();
        }
    }, [id]);
    
    async function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            images,
            category,
            description,
        };

        try {
            setLoading(true);

            if (isEditing) {
                await fetch(`https://fakestoreapi.com/products/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } else{
                await fetch("https://fakestoreapi.com/products", {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }
            navigate("/admin/products");
        } catch {
            alert(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p className="p-6">Carregando...</p>;
    if (error) return <p className="p-6">{error}</p>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2x1 font-semibold mb-4">
                {isEditing ? "Editar Produto" : "Adicionar Produto"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Preço</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Categoria</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Descrição</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Salvando..." : "Salvar Produto"}
                </button>
            </form>  
        </div>
    )
}*/