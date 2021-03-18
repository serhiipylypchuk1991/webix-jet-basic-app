import { JetView } from "webix-jet";
import { getData } from "models/films";
import FormView from "views/form";

export default class FilmsView extends JetView{
	config(){
		const _ = this.app.getService("locale")._; //get method for translating labels

		const film_table = {
			view:"datatable",
			select:true,
			scrollY:true,
			minWidth:400,
			columns:[
				{ id:"id", header:"", width:50 },
				{ id:"title", header:[_("Film title"), { content:"textFilter" }], fillspace:true, sort:"text" },
				{ id:"year", header:[_("Released"), { content:"selectFilter" }], width:100, sort:"int" },
				{ id:"votes", header:_("Votes"), width:80, sort:"int" },
				{ id:"rating", header:_("Rating"), width:80, sort:"int" }
			]
		};

		return {
			cols:[
				film_table,
				FormView //includ static Subview
			]
		};
	}

	init(view){
		const datatable = view.queryView("datatable"); //get Datatable instance
		datatable.parse(getData()); //load data to it
	}
}
