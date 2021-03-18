import { JetView } from "webix-jet";

export default class FormView extends JetView{
	config(){
		const _ = this.app.getService("locale")._; //get method for translating labels

		const film_form = {
			view:"form",
			width:350,
			elements:[
				{ type:"section", template:_("edit films") },
				{ view:"text", name:"title", label:_("Title") },
				{ view:"text", name:"year", label:_("Year") },
				{ view:"text", name:"rating", label:_("Rating") },
				{ view:"text", name:"votes", label:_("Votes") },
				{
					margin:10, cols:[
						{ view:"button", value:_("Save"), css:"webix_primary" },
						{ view:"button", value:_("Clear"), css:"webix_secondary" }
					]
				},
				{}
			]
		};
		return film_form;
	}
}
