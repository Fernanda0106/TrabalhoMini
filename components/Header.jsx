import {Link} from 'react-router-dom';

export default function Header() {
    return(
        <header className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-x1 font-bold">Loja da Amorinha</Link>
            <nav className='flex gap-4'>
                <Link to="/" className="houver:underline">Produtos</Link>
                <Link to="/cart" className="houver:underline">Carrinho</Link>
                <Link to="/login" className="houver:underline">Login</Link>
                <Link to="/admin" className="houver:underline">Admin</Link>
            </nav>
        </header>
    );
}