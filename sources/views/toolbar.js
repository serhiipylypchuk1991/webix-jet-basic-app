import { JetView } from "webix-jet";

export default class ToolbarView extends JetView{
	config(){
		const _ = this.app.getService("locale")._; //get method for translating labels

		//get  Local value
		const lang = this.app.getService("locale").getLang();
		const toolbar = {
			view:"toolbar",
			css:"webix_dark",
			elements:[
				{ view: "label", label:_("Demo App") },
				{
					view:"segmented",
					value:lang,
					optionWidth:40, inputWidth:100, align:"right",
					options:[
						{ id:"en", value:"En" },
						{ id:"ru", value:"Ru" }
					],
					click:() => this.toggleLanguage()
				}
			]
		};

		return toolbar;
	}
	//function to switch to another language
	toggleLanguage(){
		const langs = this.app.getService("locale"); //get Local service
		
		/*
		 Use this.getRoot() to get to the top Webix widget inside a JetView
		 Here it is Toolbar
		*/
		const value = this.getRoot().queryView("segmented").getValue(); //get Segmented value
		langs.setLang(value); //set Local value
	}
}
