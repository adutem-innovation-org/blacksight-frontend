export enum ApiSourceAuthMethod {
  BASIC = "basic",
  BEARER = "bearer",
  X_API_KEY = "x-api-key",
  NONE = "none",
}

export enum ApiProductsUpdateInterval {
  DAILY = "Daily",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  NEVER = "Never",
}

export enum ProductsFileSources {
  TEXT_INPUT = "text-input",
  FILE = "file",
  API = "api",
}
