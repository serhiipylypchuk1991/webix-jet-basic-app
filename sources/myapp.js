import "./styles/app.css";
import { JetApp, plugins } from "webix-jet";

export default class MyApp extends JetApp{
	constructor(config){
		const defaults = {
			debug : true, //enable the debug mode
			start : "/top/films" //set start point
		};
		super({ ...defaults, ...config });
	}
}

const app = new MyApp();
app.use(plugins.Locale); //enable the Locale plugin before the app is rendered
webix.ready(() => app.render());
