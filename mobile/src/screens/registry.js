import ProductScreen from './ProductScreen';
import CustomerScreen from './CustomerScreen';
import SupplierScreen from './SupplierScreen';
import OrderScreen from './OrderScreen';

export default [
  { name: 'Product', title: 'Products', component: ProductScreen },
  { name: 'Customer', title: 'Customers', component: CustomerScreen },
  { name: 'Supplier', title: 'Suppliers', component: SupplierScreen },
  { name: 'Order', title: 'Orders', component: OrderScreen },
];
