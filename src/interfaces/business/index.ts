import { InventoryInterface } from 'interfaces/inventory';
import { OrderInterface } from 'interfaces/order';
import { ProductInterface } from 'interfaces/product';
import { SupplierInterface } from 'interfaces/supplier';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BusinessInterface {
  id?: string;
  description?: string;
  address?: string;
  contact_number?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  inventory?: InventoryInterface[];
  order?: OrderInterface[];
  product?: ProductInterface[];
  supplier?: SupplierInterface[];
  user?: UserInterface;
  _count?: {
    inventory?: number;
    order?: number;
    product?: number;
    supplier?: number;
  };
}

export interface BusinessGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  address?: string;
  contact_number?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
