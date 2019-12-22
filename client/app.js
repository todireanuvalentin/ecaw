import routerConfig from "./router/routerConfig.js";
import Router from "./router/router.js";

const appRouter = new Router(document.getElementById("app"), routerConfig);
appRouter.init();
