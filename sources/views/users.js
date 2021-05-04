import { JetView } from "webix-jet";
import { getData, saveData } from "models/users";
import WindowView from "views/window";


export default class UsersView extends JetView{
	config(){
		const _ = this.app.getService("locale")._; //get method for translating labels

		const list = {
			view:"list",
			template:"#name#, #age#, #country# <span class='remove_list_item_btn webix_icon wxi-trash'></span> <span class='edit_list_item_btn webix_icon wxi-pencil'></span>",
			height:300,
			scrollY:true,
			scrollX:false,
			select:true,
			onClick:{
				edit_list_item_btn:(e,id) => {
					const data = this.list.getItem(id);
					this.form.showWindow(data);
				},
				remove_list_item_btn:(e,id) => {
					webix.confirm({
						title:_("User data would be deleted"),
						text:_("Do you still want to continue?"),
						type:"confirm-warning"
					}).then(() => {
						const data = this.list.getItem(id);
						saveData("remove", data).then((res) => this.list.remove(res.data.id));

					});
					return false;
				}
			},
		};

		const list_toolbar = {
			height: 40,
			view:"toolbar",
			elements:[
				{ view:"button", value:_("Add new"), css:"webix_primary", width:160,
					click:() => this.form.showWindow()
				},
				{	view:"search",
					on:{ onTimedKeyPress:() => this.searchList() }
				},
				{	view:"button", value:_("Sort asc"), css:"webix_primary", width:120,
					click:() => this.sortList("asc")
				},
				{	view:"button", value:_("Sort desc"), css:"webix_primary", width:120,
					click:() => this.sortList("desc")
				}
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
		this.list = view.queryView("list"); //get List instance
		this.list.parse(getData()); //load data to it

		this.search = view.queryView("search");

		const chart = view.queryView("chart"); //get Chart instance
		chart.sync(this.list); //synchronize Chart with List

		this.form = this.ui(WindowView);

		this.on(this.app, "onDataChange", (data) => {
			if(data.id){
				saveData("update", data).then((res) => this.list.updateItem(res.data.id, res.data));
			}else{
				saveData("add", data).then((res) => this.list.add(res.data, 0));
			}
		});
	}

	sortList(direction){
		this.list.sort("#name#", direction, "string");
	}

	searchList(){
		const search_value = this.search.getValue().toLowerCase();
		this.list.filter(function(obj){
			return obj.name.toLowerCase().indexOf(search_value) !== -1;
		});
	}

}
