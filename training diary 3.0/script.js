let wkn = 1
let rw_id = -1 // Количество нужный tr, действие с ним ниже!

//===================================
let mass_ss = []; // Массив хранит намера где селектед
mass_ss[1] = 2;mass_ss[2] = 6;mass_ss[3] = 10;mass_ss[4] = 14;
mass_ss[5] = 18;mass_ss[6] = 22;mass_ss[7] = 26;
//===================================
var array = [
	"Тренировка",
	"Отдых",
	"Прыжки",
	"Подтягивание",
	"Поднятие тяжестей",
	"Бег",
 	"Отжимание"];
//-----------------------------
function addRow(id){
    var tbody = document.getElementById(id).getElementsByTagName("TBODY")[0]
    var row = document.createElement("TR")
    var td1 = document.createElement("TD")

    td1.appendChild(document.createTextNode(wkn))
    wkn += 1

    row.appendChild(td1)

    for (var i = 2; i <= 32; i++) {
    	let td = document.createElement("TD");
    	let ta = document.createElement("TEXTAREA");
    	td.appendChild (document.createTextNode(""));
    	row.appendChild(td)

    	if (i == 2) tbody.appendChild(row);

    	if ($.inArray(i,mass_ss) != -1) 
    	{
            let ss = document.createElement("SELECT");
            ss.id = `ids${i}`;
            td.appendChild(ss);

            for (var j = 0; j < array.length; j++) {
                var option = document.createElement("option");
                option.value = array[j];
                option.text = array[j];
                ss.appendChild(option);
            }
        }
    	else {td.appendChild(ta)}
    }

    rw_id = tbody.querySelectorAll('tr').length - 4// Узнаем сколько у нас tr, чтобы проиндексировать следующие tr
    row.id = `rw${rw_id}` // проиндексировали элемент, чтобы проще потоп обрабатывать
}
//================================================
function saveTable() {
	let obj = []
	let obj2 = []

	for (var i = 0; i <= rw_id; i++) {
    	obj[i] = [];
    	$(`#rw${i} textarea`).each(function (index, value)
    	{
      		obj[i][index] = this.value
    	})
  	}

	for (var i = 0; i <= rw_id; i++) {
    	obj2[i] = []
    	$(`#rw${i} select`).each(function (index, value)
    	{
      		obj2[i][index] = this.selectedIndex
    	})
  	}

	localStorage.setItem('tableSave', JSON.stringify(obj));
	localStorage.setItem('SelectSave', JSON.stringify(obj2));
}
//================================================
function loadTable() {
	if (localStorage.getItem('tableSave'))
	{
		clearTable();
    	let obj = JSON.parse(localStorage.getItem('tableSave'));
    	let obj2 = JSON.parse(localStorage.getItem('SelectSave'));
    	wkn = 1;
    	qq = 0; //индекс для массива селекта

    	for (var i = 0; i < obj.length; i++)
    	{

    		var tbody = document.getElementById('myTable').getElementsByTagName("TBODY")[0]
    		var row = document.createElement("TR")
    		var td1 = document.createElement("TD")

    		td1.appendChild(document.createTextNode(wkn))
    		wkn += 1
    		let qq = 0; //индекс для массива селекта
    		let indj = 2;
    		row.appendChild(td1)

    		for (var j = 2; j <= 32; j++)
    		{
        		let td = document.createElement("TD");
        		let ta = document.createElement("TEXTAREA")
        		td.appendChild (document.createTextNode(``));
        		ta.value = obj[i][indj-2];
        		row.appendChild(td)

        		if (j == 2) tbody.appendChild(row);

        		if ($.inArray(j,mass_ss) != -1) {
                    let ss = document.createElement("SELECT");
                    ss.id = `ids${i}${j}`;
                    td.appendChild(ss);

                    for (var q = 0; q < array.length; q++) {
                        var option = document.createElement("option");
                        option.value = array[q];
                        option.text = array[q];
                        ss.appendChild(option);
                    }
                	$(`#ids${i}${j}`).prop('selectedIndex',obj2[i][qq]);
                    ss.appendChild(option);
                    qq++;

                }
    	else {indj++;
       		td.appendChild(ta)
    	}
	}

    rw_id = tbody.querySelectorAll('tr').length - 4; // Узнаем сколько у нас tr, чтобы проиндексировать следующие tr
    row.id = `rw${rw_id}`; // проиндексировали элемент, чтобы проще потоп обрабатывать
	}

	}
}
//===============================================
function clearTable() {
	if (rw_id >= 0) {
		for (var i = 0; i <= rw_id; i++) {
			$(`#rw${i}`).remove();
    	}
  	}
  	wkn = 1
}
