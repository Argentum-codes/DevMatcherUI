
//production
// export const BASE_URL = "/api";
//development
// export const BASE_URL = "http://localhost:3001";

export const BASE_URL = location.hostname === 'localhost' ?  "http://localhost:3001" : "/api";

