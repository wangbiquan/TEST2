app.controller('specController',function($scope,specService,$controller){

	//继承basecontroller
	$controller('baseController',{$scope:$scope});
	$scope.list=[];
	$scope.findAll=function(){
		specService.findAll.success(
				function(response){
					$scope.list=response;
				}
		);
	}

	$scope.findPage=function(page,rows){
		specService.findPage(page,rows,$scope.searchEntity).success(
				function(response){
					$scope.list=response.rows;	
					$scope.paginationConf.totalItems=response.total;//更新总记录数
				}

		);
	}

	//新增行
	$scope.entity={specificationOptionList:[]};
	$scope.addTableRow=function(){
		$scope.entity.specificationOptionList.push({});
	} 
	//删除行
	$scope.deleTableRow=function(index){			
		$scope.entity.specificationOptionList.splice(index,1);//删除			
	} 

	//条件查询
	$scope.searchEntity={};//定义搜索对象
	$scope.findSearch=function(page,rows){
		specService.findSearch(page,rows,$scope.searchEntity).success(
				function(response){
					$scope.paginationConf.totalItems=response.total;//总记录数 
					$scope.list=response.rows;//给列表变量赋值 
				}		
		);				
	}
	//保存 
	$scope.save=function(){
		var methodName="";
		if($scope.entity.specification.id!=null){//如果有ID
			methodName=specService.update($scope.entity);
		}else{
			methodName=specService.addBrand($scope.entity);

		}	

		methodName.success(
				function(response){
					if(response.success){
						//重新查询 
						$scope.reloadList();//重新加载
					}else{
						alert(response.message);
					}
				}		
		);				
	}

	//查询实体 
	$scope.findOne=function(id){
		specService.findOne(id).success(
				function(response){
					$scope.entity= response;					
				}
		);				
	}


	//批量删除 
	$scope.dele=function(){			
		swal({
			title : '确定删除吗？',
			text : '你将无法恢复它！',
			type : 'warning',
			showCancelButton : true,
			confirmButtonColor : '#3085d6',
			cancelButtonColor : '#d33',
			confirmButtonText : '确定！',
			cancelButtonText : '取消！',
			confirmButtonClass : 'btn btn-success',
			cancelButtonClass : 'btn btn-danger'
		}).then(function(isConfirm) {
			if (isConfirm.value == true) {
				specService.dele($scope.selectIds).success(
						function(response){
							if(response.success){ 
								$scope.reloadList();//刷新列表
							}						
						}		
				);				 
			}else{
				swal('删除失败！', '请稍后再试。', 'error');
			}
		})		
	} 



});



