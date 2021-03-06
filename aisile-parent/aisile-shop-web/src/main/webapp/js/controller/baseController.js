app.controller('baseController',function($scope){


	//重新加载列表 数据
	$scope.reloadList=function(){
		$scope.findSearch($scope.paginationConf.currentPage, 
				$scope.paginationConf.itemsPerPage);
	}
	//分页初始值
	$scope.paginationConf = {
			currentPage: 1,
			totalItems: 10,
			itemsPerPage: 10,
			perPageOptions: [10, 20, 30, 40, 50],
			onChange: function(){
				$scope.reloadList();//重新加载
			}
	};  



	//批删
	$scope.selectIds=[];//选中的ID集合 
	$scope.updateSelection = function($event, id) {		
		if($event.target.checked){//如果是被选中,则增加到数组
			$scope.selectIds.push( id);			
		}else{
			var idx = $scope.selectIds.indexOf(id);
			$scope.selectIds.splice(idx, 1);//删除 
		}
		console.log($scope.selectIds.length);
	}


	//提取某个字符串中的属性 返回拼接字符串
	$scope.jsonToString =function(jsonString,key){
		var json=JSON.parse(jsonString);
		var value="";
		for (var i = 0; i < json.length; i++) {
			if(i>0){
				value+=","
			}
			value+=json[i][key];
		}
		return value;
	}
	//从集合中按照key查询对象
	$scope.searchObjectByKey=function(list,key,keyValue){
		for(var i=0;i<list.length;i++){
			if(list[i][key]==keyValue){
				return list[i];
			}			
		}		
		return null;
	}
})