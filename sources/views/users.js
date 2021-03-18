import { JetView } from "webix-jet";
import { getData } from "models/users";

export default class UsersView extends JetView{
	config(){
		const _ = this.app.getService("locale")._; //get method for translating labels

		const list = {
			view:"list",
			template:"#name#, #age#, #country#",
			height:300,
			scrollY:true,
			scrollX:false,
			select:true
		};

		const list_toolbar = {
			height: 40,
			view:"toolbar",
			elements:[
				{ view:"button", value:_("Add new person"), css:"webix_primary", width:160 },
				{ view:"search" },
				{ view:"button", value:_("Sort asc"), css:"webix_primary", width:120 },
				{ view:"button", value:_("Sort desc"), css:"webix_primary", width:120 }
			]
		};

		const chart = {
			view:"chart",
			type:"bar",
			value:"#age#",
			minHeight:200,
			barWidth:40,
			radius:1,
			xAxis:{
				template:"#name#",
				title:_("Age")
			},
			yAxis:{
				start:0,
				end:100,
				step:10
			}
		};

		return { rows:[list_toolbar, list, chart] };
	}

	init(view){
		const list = view.queryView("list"); //get List instance
		list.parse(getData()); //load data to it

		const chart = view.queryView("chart"); //get Chart instance
		chart.parse(getData()); //load data to it
	}
}
