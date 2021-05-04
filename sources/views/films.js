import { JetView } from "webix-jet";
import { data } from "models/films";
import FormView from "views/form";

export default class FilmsView extends JetView{
	config(){
		const _ = this.app.getService("locale")._; //get method for translating labels

		const film_table = {
			view:"datatable",
			localId:"datatable",
			select:true,
			scrollY:true,
			minWidth:400,
			columns:[
				{ id:"rank", header:"", width:50, sort:"int" },
				{ id:"title", header:[_("Film title"), { content:"textFilter" }], fillspace:true, sort:"text" },
				{ id:"year", header:[_("Released"), { content:"selectFilter" }], width:100, sort:"int" },
				{ id:"votes", header:_("Votes"), width:80, sort:"int" },
				{ id:"rating", header:_("Rating"), width:80, sort:"int" },
				{ template:"{common.trashIcon()}", width:50 }
			],
			on:{ onAfterSelect:(id) => this.setParam("id", id, true) },
			onClick:{
				"wxi-trash":function(e, id){
					webix.confirm({
						title:_("Film data would be deleted"),
						text:_("Do you still want to continue?"),
						type:"confirm-warning"
					}).then(() => {
						data.remove(id);
					});
					return false;
				}
			}
		};

		return {
			cols:[
				film_table,
				FormView //includ static Subview
			]
		};
	}

	init(){
		this.datatable = this.$$("datatable"); //get Datatable instance
		this.datatable.parse(data); //load data to it
	}

	urlChange(){
		data.waitData.then(() => {
			const id = this.getParam("id") || data.getFirstId();
			if(data.exists(id)){
				this.datatable.select(id);
				this.datatable.showItem(id);
			}
		});
	}

}
