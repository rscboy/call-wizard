export type DemoRole = 'SalesRep' | 'SalesManager' | 'ManufacturerUser' | 'InternalAdmin';

export interface DemoUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: DemoRole;
  companyName: string;
  territory?: string;
}

export const demoAccounts: DemoUser[] = [
  {
    id: 'admin-demo',
    firstName: 'Alex',
    lastName: 'Admin',
    email: 'admin@callwizard.com',
    password: 'admin123',
    role: 'InternalAdmin',
    companyName: 'Quantos Rep Firm',
    territory: 'All',
  },
  {
    id: 'manager-demo',
    firstName: 'Morgan',
    lastName: 'Manager',
    email: 'manager@callwizard.com',
    password: 'manager123',
    role: 'SalesManager',
    companyName: 'Quantos Rep Firm',
    territory: 'Midwest',
  },
  {
    id: 'rep-demo',
    firstName: 'Riley',
    lastName: 'Rep',
    email: 'rep@callwizard.com',
    password: 'rep123',
    role: 'SalesRep',
    companyName: 'Quantos Rep Firm',
    territory: 'Ohio',
  },
  {
    id: 'rep2-demo',
    firstName: 'Sam',
    lastName: 'Sales',
    email: 'rep2@callwizard.com',
    password: 'rep123',
    role: 'SalesRep',
    companyName: 'Quantos Rep Firm',
    territory: 'Indiana',
  },
  {
    id: 'mfga-demo',
    firstName: 'Pat',
    lastName: 'Powers',
    email: 'mfga@manufacturer.com',
    password: 'mfg123',
    role: 'ManufacturerUser',
    companyName: 'Apex Industrial',
  },
  {
    id: 'mfgb-demo',
    firstName: 'Jordan',
    lastName: 'Jensen',
    email: 'mfgb@manufacturer.com',
    password: 'mfg123',
    role: 'ManufacturerUser',
    companyName: 'Brixton Controls',
  },
];

const storageKey = 'cw_demo_user';

export const roleLabel = (role?: DemoRole) => {
  switch (role) {
    case 'SalesRep':
      return 'Field Rep';
    case 'SalesManager':
      return 'Sales Manager';
    case 'ManufacturerUser':
      return 'Manufacturer Portal';
    case 'InternalAdmin':
      return 'Internal Admin';
    default:
      return 'Guest';
  }
};

export const defaultPortalRoute = (role?: DemoRole) => {
  switch (role) {
    case 'SalesRep':
      return '/app';
    case 'SalesManager':
      return '/app/reps';
    case 'ManufacturerUser':
      return '/app/sites';
    case 'InternalAdmin':
      return '/app/manufacturers';
    default:
      return '/login';
  }
};

export const routeRoles: Record<string, DemoRole[]> = {
  '/app': ['SalesRep', 'SalesManager', 'InternalAdmin'],
  '/app/reports': ['SalesRep', 'SalesManager', 'InternalAdmin'],
  '/app/reports/pending': ['SalesManager', 'InternalAdmin'],
  '/app/reps': ['SalesManager', 'InternalAdmin'],
  '/app/sites': ['ManufacturerUser', 'InternalAdmin'],
  '/app/manufacturers': ['InternalAdmin'],
};

export const canAccessPortalRoute = (role: DemoRole | undefined, path: string) => {
  if (!role) return false;
  const matchedRoute = Object.keys(routeRoles)
    .sort((a, b) => b.length - a.length)
    .find((route) => path === route || path.startsWith(`${route}/`));
  if (!matchedRoute) return true;
  return routeRoles[matchedRoute].includes(role);
};

export const signInDemoUser = (email: string, password: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = demoAccounts.find((account) => account.email === normalizedEmail && account.password === password);
  if (!user) return null;
  localStorage.setItem(storageKey, JSON.stringify(user));
  window.dispatchEvent(new Event('cw-demo-auth'));
  return user;
};

export const getDemoUser = (): DemoUser | null => {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DemoUser;
  } catch {
    localStorage.removeItem(storageKey);
    return null;
  }
};

export const signOutDemoUser = () => {
  localStorage.removeItem(storageKey);
  window.dispatchEvent(new Event('cw-demo-auth'));
};
