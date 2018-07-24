app.controller('contentCateController',function($scope,contentCateService,contentService,$controller){

	//继承basecontroller
	$controller('baseController',{$scope:$scope});
	$scope.list=[];
	$scope.findAll=function(){
		contentCateService.findAll.success(
				function(response){
					$scope.list=response;
				}
		);
	}
	$scope.contentList=[];
    $scope.findContentList=function(){
    	contentService.findAll().success(
    		function(response){
    			$scope.contentList=response;
    		}	
    	)
    }
    
    $scope.status=["无效","有效"]
    
    //更改状态
  	$scope.updateStatus=function(status){
  		alert(status)
  		contentService.updateStatus($scope.selectIds,status).success(
  			function(response){
  				if(response.success){//成功
  					$scope.reloadList();//刷新列表
  					$scope.selectIds=[];//清空ID集合
  				}else{
  					alert(response.message);
  				}
  			}
  		);		
  	}
	$scope.findPage=function(page,rows){
		contentCateService.findPage(page,rows,$scope.searchEntity).success(
				function(response){
					$scope.list=response.rows;	
					$scope.paginationConf.totalItems=response.total;//更新总记录数
				}

		);
	}

	//保存 
	$scope.save=function(){
		var methodName="";
		if($scope.entity.id!=null){//如果有ID
			methodName=contentCateService.update($scope.entity);
		}else{
			methodName=contentCateService.addBrand($scope.entity);

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
		contentCateService.findOne(id).success(
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
				contentCateService.dele($scope.selectIds).success(
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


	//条件查询
	$scope.searchEntity={};//定义搜索对象
	$scope.findSearch=function(page,rows){
		contentCateService.findSearch(page,rows,$scope.searchEntity).success(
				function(response){
					$scope.paginationConf.totalItems=response.total;//总记录数 
					$scope.list=response.rows;//给列表变量赋值 
				}		
		);				
	}

});



