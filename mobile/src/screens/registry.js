import ProductScreen from './ProductScreen';
import CustomerScreen from './CustomerScreen';
import SupplierScreen from './SupplierScreen';
import OrderScreen from './OrderScreen';
import ShipmentScreen from './ShipmentScreen';
import ContainerScreen from './ContainerScreen';
import PortScreen from './PortScreen';
import CarrierScreen from './CarrierScreen';
import WarehouseScreen from './WarehouseScreen';
import InvoiceScreen from './InvoiceScreen';
import PaymentScreen from './PaymentScreen';
import QuotationScreen from './QuotationScreen';
import CustomsDeclarationScreen from './CustomsDeclarationScreen';
import HsCodeScreen from './HsCodeScreen';

export default [
  { name: 'Product', title: 'Products', component: ProductScreen },
  { name: 'Customer', title: 'Customers', component: CustomerScreen },
  { name: 'Supplier', title: 'Suppliers', component: SupplierScreen },
  { name: 'Order', title: 'Orders', component: OrderScreen },
  { name: 'Shipment', title: 'Shipments', component: ShipmentScreen },
  { name: 'Container', title: 'Containers', component: ContainerScreen },
  { name: 'Port', title: 'Ports', component: PortScreen },
  { name: 'Carrier', title: 'Carriers', component: CarrierScreen },
  { name: 'Warehouse', title: 'Warehouses', component: WarehouseScreen },
  { name: 'Invoice', title: 'Invoices', component: InvoiceScreen },
  { name: 'Payment', title: 'Payments', component: PaymentScreen },
  { name: 'Quotation', title: 'Quotations', component: QuotationScreen },
  { name: 'CustomsDeclaration', title: 'Customs Declarations', component: CustomsDeclarationScreen },
  { name: 'HsCode', title: 'HS Codes', component: HsCodeScreen },
];
