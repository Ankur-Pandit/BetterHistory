/**
 * Created by jamestench on 2/12/16.
 */


(function () {

	var historyData;

	chrome.storage.sync.get("historyData", function(data){
        if (!chrome.runtime.error) {
        	historyData = data.historyData;
        	parseMetaTag();
        }
    });

	var parseMetaTag = function() {
	   	var visited = window.location.href;
	    var time = +new Date();
	    var metas, meta, i, k=0,keywords, currentKeyWordUrlList = {};
	    metas = document.getElementsByTagName("meta");
	    
	    for (i = 0; i < metas.length; i++) {
	        name = metas[i].getAttribute("name");
	        if (name == "keywords") {
	            meta = metas[i];
	            keywords = meta.getAttribute("content");
	            var temp = keywords.split(",");
	            for(var j=0; j < temp.length; j++){
	            



	            	currentKeyWordUrlList = historyData[temp[j]];

	            	

	            	if (currentKeyWordUrlList === undefined) {
	            		currentKeyWordUrlList[visited] = 1;
	            	} else {

	            		currentKeyWordUrlList[] += 1;
	            	}
	            	historyData[temp[j]] = currentKeyWordUrlList;
	            }
	            saveToLocalStorage();
	    	}
	    }  
	}

	var saveToLocalStorage = function() {
		chrome.storage.sync.set({'historyData':historyData}, function () {
	        console.log("Just visited",historyData)
	    });		
	}
   
	

})();