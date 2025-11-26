import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import { useNavigate } from 'react-router';

export default function ProductCard({product}){
    const navigate = useNavigate();

    const header =(
        <img alt={product.title}
         src={product.image}
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