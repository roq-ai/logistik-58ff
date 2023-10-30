import { InventoryInterface } from 'interfaces/inventory';
import { OrderInterface } from 'interfaces/order';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  business_id: string;
  created_at?: any;
  updated_at?: any;
  inventory?: InventoryInterface[];
  order?: OrderInterface[];
  business?: BusinessInterface;
  _count?: {
    inventory?: number;
    order?: number;
  };
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  business_id?: string;
}
