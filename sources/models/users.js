export function getData(){
	return webix.ajax("../../data/user_data.js");
}

export function saveData(operation, data){
	//emulate server response
	return webix.promise.resolve({data:data, status:"success"});

	//real backend
	/*const url = "save/users";
	if(operation == "add"){
		return webix.ajax().post(url, data);
	}else if(operation == "update"){
		return webix.ajax().put(url, data);
	}else if(operation == "remove"){
		return webix.ajax().del(url, data);
	}*/
}
