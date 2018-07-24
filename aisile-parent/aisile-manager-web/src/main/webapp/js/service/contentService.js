    app.service('contentService',function($http){
    	//查询全部
    	this.findAll=function(){
    		return  $http.get('../content/findAll.do');
    	}
    	//分页
    	this.findPage=function(page,rows){
    	   return $http.get('../content/findPage.do?page='+page+'&rows='+rows)
    	} 
    	//条件查询
    	this.findSearch=function(page,rows,searchEntity){
    		return $http.post('../content/findSearch.do?page='+page+"&rows="+rows,searchEntity)
    	}
    	//保存
    	this.update =function(entity){
    		return $http.post('../content/update.do',entity)
    	}
    	this.addBrand =function(entity){
    		return $http.post('../content/addBrand.do',entity)
    	}
    	//查询实体
    	this.findOne=function(id){
    		return $http.get('../content/findOne.do?id='+id)
    	}
    	//删除
    	this.dele=function(selectIds) {
    		return $http.get('../content/delete.do?ids='+selectIds)
    	}
    	
    	//更改状态
    	this.updateStatus=function(ids,status){
    		return $http.get('../content/updateStatus.do?ids='+ids+"&status="+status);
    	}  
    	
    })