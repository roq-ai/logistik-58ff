interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Inventory Manager', 'Supply Chain Manager', 'Sales Representative'],
  tenantName: 'Business',
  applicationName: 'LOGISTIK',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: ['Manage user information', 'Manage business information', 'Manage products', 'Manage orders'],
  getQuoteUrl: 'https://app.roq.ai/proposal/847ec0a2-bcda-4a53-be5f-72a3a232db54',
};
