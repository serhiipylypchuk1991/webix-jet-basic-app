import { JetView } from "webix-jet";
import ToolbarView from "views/toolbar";

export default class TopView extends JetView{
	config(){
		const _ = this.app.getService("locale")._; //get method for translating labels

		const sidebar = {
			width:300,
			minWidth:250,
			maxWidth:350,
			view:"list",
			scroll:false,
			css:"gray_background",
			select:true,
			data:[
				{ value:_("Dashboard"), id:"films" },
				{ value:_("Users"), id:"users" },
				{ value:_("Products"), id:"products" }
			],
			on:{
				onAfterSelect:(id) => this.show(id) //change the URL value
			}
		};

		const footer = {
			height: 30,
			template:_("The software is provided by <a href='https://webix.com'>webix.com</a>. All rights reserved &#169;"),
			css:"text_center"
		};

		const ui = {
			rows:[
				ToolbarView, //includ static Subview
				{
					cols:[
						sidebar,
						{ view:"resizer" },
						{ $subview:true } //enable dynamic Subviews
					]
				},
				footer
			]
		};

		return ui;
	}
}
