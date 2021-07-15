(function(){
	let reorderButton;
	window.addEventListener("load", () => {
		reorderButton = document.getElementById("id_reorderbutton");
		reorderButton.querySelector("input[type='button'].submit").addEventListener("click", (e) => {
			var elements = document.getElementsByClassName("draggable")
			for (let i = elements.length - 1; i >= 0; i--){
				elements[i].draggable=true;
				elements[i].addEventListener("dragstart",dragStart);
				elements[i].addEventListener("dragover",dragOver);
				elements[i].addEventListener("dragleave",dragLeave);
				elements[i].addEventListener("drop",drop);
			}
	},false);
	
	let startElement;
	
	function dragStart(event) {
		startElement = event.target.closest("tr");
	}
	
	function unselectRows(rowsArray) {
		for (var i = 0; i< rowsArray.length; i++){
			rowsArray[i].querySelector("a").className = "notselected";
		}
	}
	
	function dragOver(event){
		event.preventDefault();
		var dest = event.target.closest("tr");
		dest.querySelector("a").className= "selected";
	}
	
	function dragLeave(event){
		var dest = event.target.closest("tr");
		dest.querySelector("a").className= "notselected";
	}
	
	function drop(event) {
		var dest = event.target.closest("tr");
		var table = dest.closest('table');
		var rowsArray = Array.from(table.querySelectorAll('tbody > tr'));
		var indexDest = rowsArray.indexOf(dest);
		
		if (rowsArray.indexOf(startElement) < indexDest)
			startElement.parentElement.insertBefore(startElement , rowsArray[indexDest + 1]);
		else
			startElement.parentElement.insertBefore(startElement , rowsArray[indexDest]);			
		unselectRows(rowsArray);
	}
	})
		
})();