import { JetView } from "webix-jet";
import { data } from "models/films";

export default class FormView extends JetView{
	config(){
		const _ = this.app.getService("locale")._; //get method for translating labels

		const film_form = {
			view:"form",
			width:350,
			elements:[
				{ type:"section", template:_("edit films") },
				{ view:"text", name:"title", label:_("Title"), required:true },
				{ view:"text", name:"year", label:_("Year") },
				{ view:"text", name:"rating", label:_("Rating") },
				{ view:"text", name:"votes", label:_("Votes") },
				{
					margin:10, cols:[
						{ view:"button", value:_("Save"), css:"webix_primary", click:() => this.saveFilmHandler() },
						{ view:"button", value:_("Clear"), css:"webix_secondary", click:() => this.clearFormHandler() }
					]
				},
				{}
			]
		};
		return film_form;
	}

	init(view){
		this.form = view;
	}

	urlChange(){
		const id = this.getParam("id");

		this.clearFormHandler();

		if(id && data.exists(id)){
			const form_data = data.getItem(id);
			this.form.setValues(form_data);
		}
	}

	saveFilmHandler(){
		const _ = this.app.getService("locale")._;
		const values = this.form.getValues();

		if(this.form.validate()){
			if(data.exists(values.id)){
				data.updateItem(values.id, values);
			}else{
				data.add(values, 0);
			}
			webix.message({
				text:_("Data was added successfully"),
				type:"success",
				expire:3000
			});
		}
	}

	clearFormHandler(){
		this.form.clear();
		this.form.clearValidation();
	}

}
