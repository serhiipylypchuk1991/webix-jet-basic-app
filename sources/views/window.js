
import { JetView } from "webix-jet";

export default class WindowView extends JetView {
	config(){
		const _ = this.app.getService("locale")._; //get method for translating labels
		const window = {
			view:"window",
			position:"center",
			close:true,
			head:_("EDIT USERS"),
			body:{
				view:"form",
				localId:"form",
				width:350,
				elements:[
					{ view:"text", name:"name", label:_("Name"), required:true },
					{ view:"text", name:"age", label:_("Age"), required:true, type:"number" },
					{ view:"text", name:"country", label:_("Country") },
					{
						margin:10, cols:[
							{ view:"button", value:_("Save"), css:"webix_primary", click:() => this.saveUserHandler() }
						]
					},
					{}
				]
			}
		};

		return window;
	}

	init(){
		this.form = this.$$("form");
	}

	showWindow(data){
		this.clearForm();
		this.getRoot().show();
		if(data){
			this.form.setValues(data);
		}
	}

	saveUserHandler(){
		if(this.form.validate()){
			const data = this.form.getValues();
			this.app.callEvent("onDataChange", [data]);
			this.form.hide();
		}
	}

	clearForm(){
		this.form.clear();
		this.form.clearValidation();
	}
}
