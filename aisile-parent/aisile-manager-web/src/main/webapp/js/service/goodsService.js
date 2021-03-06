    app.service('goodsService',function($http){
    	//查询全部
    	this.findAll=function(){
    		return  $http.get('../goods/findAll.do');
    	}
    	//分页
    	this.findPage=function(page,rows){
    	   return $http.get('../goods/findPage.do?page='+page+'&rows='+rows)
    	} 
    	//条件查询
    	this.findSearch=function(page,rows,searchEntity){
    		return $http.post('../goods/findSearch.do?page='+page+"&rows="+rows,searchEntity)
    	}
    	//保存
    	this.update =function(entity){
    		return $http.post('../goods/update.do',entity)
    	}
    	this.add =function(entity){
    		return $http.post('../goods/addgoods.do',entity)
    	}
    	//查询实体
    	this.findOne=function(id){
    		return $http.get('../goods/findOne.do?id='+id)
    	}
    	//删除
    	this.dele=function(selectIds) {
    		return $http.get('../goods/delete.do?ids='+selectIds)
    	}
    	//更改状态
    	this.updateStatus=function(ids,status){
    		return $http.get('../goods/updateStatus.do?ids='+ids+"&status="+status);
    	}  
    })