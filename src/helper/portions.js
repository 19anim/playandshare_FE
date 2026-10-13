// Portions ("phần") per person in a payment. Anyone without an entry takes 1 portion,
// so payments created before this feature split equally as before. Mirrors the server.

export const portionOf = (payment, name) =>
  (payment?.portions || []).find((item) => item.name === name)?.count ?? 1;

export const totalPortions = (payment) =>
  (payment?.participants || []).reduce((sum, name) => sum + portionOf(payment, name), 0);

export const hasCustomPortions = (payment) =>
  (payment?.participants || []).some((name) => portionOf(payment, name) !== 1);

export const formatCount = (count) =>
  Number(count).toLocaleString("en-US", { maximumFractionDigits: 2 });

// "An ×2, Bình, Chi ×0.5"
export const formatSharers = (payment) =>
  (payment?.participants || [])
    .map((name) => {
      const count = portionOf(payment, name);
      return count === 1 ? name : `${name} ×${formatCount(count)}`;
    })
    .join(", ");

// Form state keeps { name: count }; the API takes [{ name, count }] without the default 1s
export const portionsToMap = (portions) =>
  Object.fromEntries((portions || []).map((item) => [item.name, item.count]));

export const portionsToList = (portionMap, sharers) =>
  sharers
    .filter((name) => portionMap[name] && portionMap[name] !== 1)
    .map((name) => ({ name, count: portionMap[name] }));

// − / + steps: 1 → 0.5 for a half portion, otherwise whole steps
export const stepDown = (count) => (count > 1 ? count - 1 : 0.5);
export const stepUp = (count) => (count < 1 ? 1 : count + 1);
