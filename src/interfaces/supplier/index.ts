import { InventoryInterface } from 'interfaces/inventory';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface SupplierInterface {
  id?: string;
  name?: string;
  contact_number: string;
  address: string;
  business_id: string;
  created_at?: any;
  updated_at?: any;
  inventory?: InventoryInterface[];
  business?: BusinessInterface;
  _count?: {
    inventory?: number;
  };
}

export interface SupplierGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  contact_number?: string;
  address?: string;
  business_id?: string;
}
