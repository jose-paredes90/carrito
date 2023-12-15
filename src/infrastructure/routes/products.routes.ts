import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller';
import { ProductsUseCases } from '../../application/useCases/products.use-cases';

const router: Router = Router();
let productsUseCases!: ProductsUseCases;
const productsController: ProductsController = new ProductsController(productsUseCases);

router.get('/:id', productsController.getProductById);
router.post('/', productsController.createProduct);
router.get('/', productsController.getProducts);
router.put('/', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

export default router;