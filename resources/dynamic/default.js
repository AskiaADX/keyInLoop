{%
Dim i
%}
var row = 1;
var instance = 0;

function getNumberFromKeycode(n) {
    switch (n) {
        case 48:
            return 0;
            break;
        case 49:
            return 1;
            break;
        case 50:
            return 2;
            break;
        case 51:
            return 3;
            break;
        case 52:
            return 4;
            break;
        case 53:
            return 5;
            break;
        case 54:
            return 6;
            break;
        case 55:
            return 7;
            break;
        case 56:
            return 8;
            break;
        case 57:
            return 9;
            break;
    }

    return ('!' + n.toString());
}

function getStringFromKeycode(e) {
    e = e || event;
    return String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode-48 : e.keyCode)
    //return String.fromCharCode(e.keyCode);
}

document.addEventListener("keydown", function(e){
    if (e.key == '{%= CurrentADC.PropValue("clearItem") %}' && instance+1 == {%= CurrentADC.InstanceId %}) {  //clear Item
        var radioTemp = document.getElementsByClassName('keyInRow'+row)[instance].getElementsByTagName('input');
        for (i = 0; i < radioTemp.length; i++) {
        	radioTemp[i].checked = false;
   		}
    }
}, false);

document.onkeydown = function(e){
    /**if (e.key == '{%= CurrentADC.PropValue("clearItem") %}') {  //clear Item
        var radioTemp = document.getElementsByClassName('keyInRow'+row)[instance].getElementsByTagName('input');
        for (i = 0; i < radioTemp.length; i++) {
        	radioTemp[i].checked = false;
   		}
    }*/

	if(e.keyCode == 9) { //TAB to change instance
        if((instance+1) >= document.getElementsByClassName('keyInRow1').length) { //to check the instance number
            var rowF = document.getElementsByClassName('keyInRow'+row)[instance].classList;
            if (rowF.contains("select"+(instance+1))) {
            	rowF.remove("select"+(instance+1));
        	}
            row = 1;
            instance = 0;
            var rowL = document.getElementsByClassName('keyInRow'+row)[instance].classList;
            if (!rowL.contains("select"+(instance+1))) {
         		rowL.add("select"+(instance+1));
        	}
        } else {
            rowF = document.getElementsByClassName('keyInRow'+row)[instance].classList;
            if (rowF.contains("select"+(instance+1))) {
            	rowF.remove("select"+(instance+1));
        	}
            row = 1;
            instance += 1;
            rowL = document.getElementsByClassName('keyInRow'+row)[instance].classList;
            if (!rowL.contains("select"+(instance+1))) {
         		rowL.add("select"+(instance+1));
        	}
        }
    }

    var rowF;
    var rowL;
    if (e.keyCode==38 && row > 1) { //up arrow
        rowF = document.getElementsByClassName('keyInRow'+row)[instance].classList;
        row -= 1
        rowL = document.getElementsByClassName('keyInRow'+row)[instance].classList;
        if (rowF.contains("select"+(instance+1))) {
            rowF.remove("select"+(instance+1));
        }
        if (!rowL.contains("select"+(instance+1))) {
            rowL.add("select"+(instance+1));
        }
        
    } else if (e.keyCode==40 && row < {%= CurrentQuestion.ParentLoop.AvailableResponses.Count%}) { // down arrow
     	rowF = document.getElementsByClassName('keyInRow'+row)[instance].classList;
     	row +=1;
        rowL = document.getElementsByClassName('keyInRow'+row)[instance].classList;
    
        if (rowF.contains("select"+(instance+1))) {
            rowF.remove("select"+(instance+1));
        }
        if (!rowL.contains("select"+(instance+1))) {
            rowL.add("select"+(instance+1));
        }
    }
    var i = getStringFromKeycode(e);
    if(!isNaN(i) && (i>0) && (i<={%= CurrentQuestion.AvailableResponses.Count%})) {   //numpad
        var radios = document.getElementsByClassName('keyInRow'+row)[instance].getElementsByTagName('input');
        var radioV = radios[i];
        radios[i-1].checked = !radios[i-1].checked;
		
		if (({%= CurrentADC.PropValue("autoNext") = "1" %} == 1)  && ({%= CurrentQuestion.Type = "single"%} == 1) && row < {%= CurrentQuestion.ParentLoop.AvailableResponses.Count%}) {
            rowF = document.getElementsByClassName('keyInRow'+row)[instance].classList;
            row +=1;
            rowL = document.getElementsByClassName('keyInRow'+row)[instance].classList;

            if (rowF.contains("select"+(instance+1))) {
                rowF.remove("select"+(instance+1));
            }
            if (!rowL.contains("select"+(instance+1))) {
                rowL.add("select"+(instance+1));
            }        
        }
    }
    var bool = true;
    var is_checked;
    if (({%= CurrentADC.PropValue("autoForward") = "1" %} == 1)  && ({%= CurrentQuestion.Type = "single"%} == 1)) {
        {% For i = 1 To CurrentQuestion.ParentLoop.AvailableResponses.Count %}
            var is_checked = false;
        	var radios = document.getElementsByClassName('keyInRow'+{%= i %})[instance].getElementsByTagName('input');
			for (j = 0; j < radios.length; j++) {
                is_checked = is_checked || radios[j].checked;
            }
        	bool = bool && is_checked;
        {%Next%}
        if (bool) {
            var submit = document.getElementsByName("Next");
            submit[submit.length-1].click();
        }
    }
	return false;
}

document.getElementsByTagName

window.onload = function() {
    var row = document.getElementsByClassName('keyInRow1')[0].classList;
    row.add("select1");
}