import {Link} from 'react-router-dom';

export default function ProductCard({product}) {
    return(
        <div className="border rounded shadow-sm p-4 flex flex-col hover:shadow-md transition">
            <img src={product.image} alt={product.title} className="h-48 object-cover mx-auto mb-4"/>
            <h2 className="font-medium line-clamp-2">{product.title}</h2>
            <p className="text-lg font-semibold mt-2">
        {product.price.toLocaleString("pt-BR", {style: "currency",currency: "BRL",})}</p>
            <Link to={`/product/${product.id}`} className="mt-4 bg-blue-600 text-white text-center py-2 rounded text-center">
                Ver Detalhes
            </Link>
        </div>
    );
}