import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import { useNavigate } from 'react-router';

export default function ProductCard({product}){
    const navigate = useNavigate();

    const header =(
        <img width='300px' alt={product.title}
         src={product.image}
         style={{maxWidth: '300px'}}
          className="product-image"
          />
    );
    return(
        <Card 
        title={product.title}
        subTitle={`${product.price}`}
        header={header}
        className="product-card"
        >
            <Button 
            label="Ver Detalhes"
            onClick={()=> navigate(`/product/${product.id}`)}
            />
        </Card>
    );
}