
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { useState, useRef} from 'react';
import {Toast } from 'primereact/toast';
import {ConfirmDialog, confirmDialog} from 'primereact/confirmdialog';
import { useCart} from '../Context/CartContex';
import { useNavigate } from 'react-router-dom';


export default function Cart() {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, clearCart, decreaseQuantity } = useCart();
    const toast = useRef(null);
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
      const totalPrice = cartItems.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 1),
        0
    );
    const discountedPrice = totalPrice - (totalPrice * discount);

    //total final
    const finalTotal = totalPrice - discount;

    //quantidade total para usar no icone
    const totalQuantity = cartItems.reduce(
        (total, item) => total + (item.quantity || 0),
        0
    );

    const applyCoupon = () => {
        if(coupon.toLowerCase() === 'desconto10'){
            setDiscount(0.1);
            toast.current.show({
                severity:'success',
                 summary: 'Cupom aplicado!',
                  detail: 'Você recebeu 10% de desconto.'});
        } else {
            setDiscount(0);
            toast.current.show({
                severity:'error',
                 summary: 'Cupom inválido',
                  detail: 'Por favor, tente novamente.'});
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
        <Card className="cart-container p-4">
            <Toast ref={toast} />
            <ConfirmDialog />
            
            {/*titulo + icone*/}
            <div className='flex justify-content-between align-items-center mb-4'>
                <h1 className='text=3x1 font-bold'> Carrinho de Compras</h1>

                <Button
                icon="pi pi-shopping-cart"
                label={`(${totalQuantity}) itens`}
                className='p-button-rounded p-button-info'
                onClick={()=> navigate('/cart')}

                />
            </div>
           
           {/*Verifica se o carrinho está vazio */}
            {cartItems.length === 0 ? (
                <div className='text-center'>
                    <h2>Seu carrinho está vazio</h2>
                    <Button label="Voltar à loja" 
                    icon="pi pi-arrow-left"
                    onClick={() => navigate('/')}
                    className='p-button-help' />
                </div>
            ) : (


                <div>
                    {/*Lista de itens */}
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div
                             key={item.id}
                              className="cart-item p-3 mb-3 border-round-mb surface-100 flex gap-4">

                                {/* Imagem do Produto */}
                                <img
                                src={item.image}
                                alt={item.title}
                                style={{
                                    width:"90px",
                                    height:"90px",
                                    objectFit:"contain",
                                    marginBottom:"10px",
                                }}
                                />

                                <div className="flex flex-column">
                                    <span className='font-bold text-lg'>{item.title}</span>
                                    <span>Preco:R${item.price.toFixed(2)}</span>
                                    <span>Quantidade:{item.quantity}</span>

                                    <span className='mt-2 font-semibold text-green-600'>
                                        Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                                
                                {/*Quantidade */}
                                <div className='flex align-items-center mt-2'>
                                    <Button icon="pi pi-minus" rounded text onClick={() =>decreaseQuantity(item.id)}/>
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
                        icon="pi pi-percentage"
                        className="p-button-secondary"
                        onClick={applyCoupon}
                        />
                    </div>

                    {/*Resumo do Carrinho */}

                    <div className="cart-summary mt-4">
                        <div className="text-lg font-bold">
                            Total: R$ {finalTotal.toFixed(2)}
                            </div>

                            {discount > 0 &&(
                                <div className="text-green-600 font-medium mt-1">
                                    Desconto Aplicado: - R${discountedPrice.toFixed(2)}
                            </div>
                            )}

                            <div className='mt-4 flex gap-2'>
                                <Button
                                label="Limpar Carrinho"
                                icon="pi pi-times"
                                className="p-button-secondary mr-2"
                                onClick={confirmarLimparCarrinho}
                                />

                                <Button
                                label="Finalizar Compra"
                                icon="pi pi-check"
                                className="p-button-success mr-2"
                                onClick={()=> navigate ('/checkout')}
                                />
                                <Button
                                label="Continuar Comprando"
                                icon="pi pi-arrow-left"
                                className="p-button-text"
                                onClick={() => navigate('/')}
                                />

                            </div>
                        
                    </div>
                </div>
            )}
        </Card>
    );
}