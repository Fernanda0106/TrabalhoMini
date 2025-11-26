
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { useState, useRef } from 'react';

export default function Cart() {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const toast = useRef(null);
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
      const totalPrice = cartItems.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 1),
        0
    );
    const applyCoupon = () => {
        if(coupon.toLowerCase() === 'desconto10'){
            setDiscount(0.1);
            toast.current.show({severity:'success', summary: 'Cupom aplicado!', detail: 'Você recebeu 10% de desconto.'});
        } else {
            setDiscount(0);
            toast.current.show({severity:'error', summary: 'Cupom inválido', detail: 'Por favor, tente novamente.'});
        }
    }

    const confirmarLimparCarrinho = () => {
        confirmDialog({
            message: 'Tem certeza que deseja limpar o carrinho?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () =>{
                 clearCart();
                toast.current.show({severity:'info', summary: 'Carrinho limpo', detail: 'Todos os itens foram removidos do carrinho.'});
                }
        });
    };



    return (
        <Card className="cart-container">
            <Toast ref={toast} />
            <ConfirmDialog />
            <h1 className="text-3xl font-bold mb-4">Carrinho de Compras</h1>

            {cartItems.length === 0 ? (
                <div>
                    <h2>Seu carrinho está vazio</h2>
                    <Button label="Voltar à loja" 
                    onClick={() => (window.location.href = '/')} />
                </div>
            ) : (


                <div>
                    {/*Lista de itens */}
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item mb-4 border-bottom pb-3">

                                {/* Imagem do Produto */}
                                <img
                                src={item.image}
                                alt={item.title}
                                style={{
                                    width:"80px",
                                    height:"80px",
                                    objectFit:"contain",
                                    marginBottom:"10px",
                                }}
                                />

                                <div className="font-semibold">{item.title}</div>
                                <div>Preço: R$ {Number(item.price).toFixed(2)}</div>
                                <div>Quantidade: {item.quantity}</div>
                                <div className='mt-2 font-medium'>Subtotal: R$ {(item.price * item.quantity).toFixed(2)}</div>
                                
                                {/*Quantidade */}
                                <div className='flex align-items-center mt-2'>
                                    <Button icon="pi pi-minus" rounded text onClick={() =>increaseQuantity(item.id)}/>
                                </div>

                                <Button
                                className="p-button-danger mt-2"
                                label="Remover"
                                onClick={() => {
                                    removeFromCart(item.id);
                                    toast.current.show({severity:'warn', summary: 'Item removido', detail: `${item.title} foi removido do carrinho.`});
                                }}
                                />
                            </div>
                        ))}
                    </div>

                    <Divider />
                    {/*Cupom */}
                    <div className='flex gap-2 mb-3'>
                        <InputText
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Digite o cupom de desconto"
                        className="flex-1"
                        />
                        <Button 
                        label="Aplicar Cupom"
                        className="p-button-secondary"
                        onClick={applyCoupon}
                        />
                    </div>

                    {/*Resumo do Carrinho */}

                    <div className="cart-summary mt-4">
                        <div className="text-lg font-bold">
                            Total: R$ {(totalPrice - discount).toFixed(2)}
                            </div>

                            {discount > 0 &&(
                                <div className="text-green-600 font-medium mt-1">
                                    Desconto Aplicado: - R${discount.toFixed(2)}
                            </div>
                            )}

                            <div className='mt-4'>
                                <Button
                                label="Limpar Carrinho"
                                className="p-button-secondary mr-2"
                                onClick={confirmarLimparCarrinho}
                                />

                                <Button
                                label="Finalizar Compra" className="p-button-success mr-2"
                                />
                                <Button
                                label="Continuar Comprando"
                                className="p-button-text"
                                onClick={() => (window.location.href = '/')}
                                />

                            </div>
                        
                    </div>
                </div>
            )}
        </Card>
    );
}