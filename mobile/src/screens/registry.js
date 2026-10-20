import ProductScreen from './ProductScreen';
import CustomerScreen from './CustomerScreen';
import SupplierScreen from './SupplierScreen';
import OrderScreen from './OrderScreen';
import ShipmentScreen from './ShipmentScreen';
import ContainerScreen from './ContainerScreen';
import PortScreen from './PortScreen';

export default [
  { name: 'Product', title: 'Products', component: ProductScreen },
  { name: 'Customer', title: 'Customers', component: CustomerScreen },
  { name: 'Supplier', title: 'Suppliers', component: SupplierScreen },
  { name: 'Order', title: 'Orders', component: OrderScreen },
  { name: 'Shipment', title: 'Shipments', component: ShipmentScreen },
  { name: 'Container', title: 'Containers', component: ContainerScreen },
  { name: 'Port', title: 'Ports', component: PortScreen },
];
