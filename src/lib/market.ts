// MARKET 站数据访问层：只读共享数据 + 查询辅助
import countriesData from "../../shared/data/countries.json";
import importrulesData from "../../shared/data/importrules.json";
import taxrulesData from "../../shared/data/taxrules.json";
import portsData from "../../shared/data/ports.json";
import routesData from "../../shared/data/routes.json";
import modelsData from "../../shared/data/models.json";
import brandsData from "../../shared/data/brands.json";

export const countries = countriesData.countries;
export const rules = importrulesData.rules;
export const taxrules = taxrulesData.taxrules;
export const ports = portsData.ports;
export const routes = routesData.routes;
export const models = modelsData.models;
export const brands = brandsData.brands;

export const getCountry = (id: string) => countries.find((c) => c.country_id === id);
export const getRules = (countryId: string) => rules.filter((r) => r.country_id === countryId);
export const rulesByCategory = (countryId: string, category: string) =>
  rules.filter((r) => r.country_id === countryId && r.category === category);
export const getTaxRules = (countryId: string) => taxrules.filter((t) => t.country_id === countryId);
export const getDestPorts = (countryId: string) =>
  ports.filter((p) => p.country_id === countryId && p.type === "destination");
export const getRoutesForCountry = (countryId: string) => {
  const destIds = getDestPorts(countryId).map((p) => p.port_id);
  return routes.filter((r) => destIds.includes(r.destination_port_id));
};
export const portName = (id: string) => {
  const p = ports.find((x) => x.port_id === id);
  return p ? p.name : id;
};
export const getModel = (id: string) => models.find((m) => m.model_id === id);
export const getBrand = (id: string) => brands.find((b) => b.brand_id === id);
export const modelsByBodyType = (bodyType: string) => models.filter((m) => m.body_type === bodyType);
export const modelsByPowertrain = (powertrain: string) =>
  models.filter((m) => m.generations.some((g) => g.trims.some((t) => t.powertrain === powertrain)));
