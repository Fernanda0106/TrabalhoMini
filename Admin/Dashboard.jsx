import { Link } from "react-router-dom";

export default function AdminDashboard(){
    return (
        <div className="p-6">
           <h1 className="text-2x1 font-semibold mb-4">Painel de Administradores</h1>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
             <Link
             to="/admin/products"
             className="border rounded p-4 hover:bg-gray-100 transition">
             <h2 className="text-x1 font-medium">Gerenciar produtos</h2>
             <p className="text-sm text-gray-600 mt-1">Listar, editar, criar e excluir produtos</p>
             </Link>
           </div>
        </div>
    );
}