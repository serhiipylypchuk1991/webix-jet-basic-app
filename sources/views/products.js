import { JetView } from "webix-jet";
import { getData } from "models/products";

export default class ProductsView extends JetView{
	config(){
		const _ = this.app.getService("locale")._; //get method for translating labels

		const products_treetable = {
			view:"treetable",
			scrollY:true,
			scrollX:false,
			select:true,
			columns:[
				{ id:"id", header:"", width:50 },
				{ id:"title", header:_("Title"), fillspace:true,  template:"{common.treetable()} #title#" },
				{ id:"price", header:_("Price"), width:200 }
			]
		};

		return products_treetable;
	}

	init(view){
		view.parse(getData()); //load data to Treetable
	}
}
