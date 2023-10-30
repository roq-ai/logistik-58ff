import { ProductInterface } from 'interfaces/product';
import { SupplierInterface } from 'interfaces/supplier';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface InventoryInterface {
  id?: string;
  product_id: string;
  supplier_id: string;
  quantity: number;
  business_id: string;
  created_at?: any;
  updated_at?: any;

  product?: ProductInterface;
  supplier?: SupplierInterface;
  business?: BusinessInterface;
  _count?: {};
}

export interface InventoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
  supplier_id?: string;
  business_id?: string;
}
