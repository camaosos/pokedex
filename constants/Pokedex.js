const POKEDEX_LIB = require("pokedex-promise-v2");
const POKEDEX_OPT = {
  protocol: "https",
  versionPath: "/api/v2/",
  cacheLimit: 100 * 1000, // 100s
  timeout: 10 * 1000 // 10s
};
const POKEDEX = new POKEDEX_LIB(POKEDEX_OPT);

export default POKEDEX;
