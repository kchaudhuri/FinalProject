//<!-- Name - Kaustubh Chaudhuri -->

//////////////////////////////////////////////////////
window.onload=readTextFile();


var selectedCar;

function listAllFunc()
{
  document.getElementById("msg").innerHTML="";
  for (var i = 0; i < 393; i++)
  {
      displayItem(carDetailArr[i][1], carDetailArr[i][8]);
  }
}

function cmpAllFunc()
{
  saveInfo("all", 0);
}

function readTextFile()
{
    var companies = [];
    var fileObj = new XMLHttpRequest();
    fileObj.overrideMimeType('text/plain');
    fileObj.open("GET", "car.txt", true);
    fileObj.onreadystatechange = function ()
    {
            if(fileObj.status === 200 || fileObj.status == 0)
            {
                var allText = fileObj.responseText;

                var oneLineArr = allText.split("\n");
                var entryLen = oneLineArr.length - 1;
                var propArr = oneLineArr[0].split(",");


                for(j = 1; j<oneLineArr.length; j++)
                {
                  carDetailArr[j-1] = oneLineArr[j].split(",");

                }

            }
        }
    //}
    fileObj.send("\n");
}

var carDetailArr = [];

function searchAuto()
{
  document.getElementById("msg").innerHTML="";
  document.getElementById('carList').innerHTML = '';
  var company = document.getElementById("make").value;
  company = company.toLowerCase();

  var year = document.getElementById("year").value;

  var found = 0;

  if(isNaN(year) && year!='')
  {
    document.getElementById("msg").innerHTML="invalid year entered";
  }

  else {
    if(((year < 1970) || (year > 1982)) && year != '')
    {
      document.getElementById("msg").innerHTML="please enter year between 1970 and 1982";
    }
    else
    {
    year = year%100;

  if((company != "") && (year != ""))//search by company and year
  {
    for (var i = 0; i < 393; i++)
    {
      if((carDetailArr[i][0] == company) && (carDetailArr[i][8] == year))
      {
        displayItem(carDetailArr[i][1], year);
        found ++;
      }
    }
    if(found == 0)
    {
      document.getElementById("msg").innerHTML="no cars found with given details";
    }
  }
  if((company != "") && (year == ""))// search by company only
  {

    for (var i = 0; i < 393; i++)
    {
      if((carDetailArr[i][0] == company))
      {
        displayItem(carDetailArr[i][1], 0);
        found ++;
      }
    }
    if(found == 0)
    {
      document.getElementById("msg").innerHTML="no cars found with given details";
    }
  }
  if((company == "") && (year != ""))// search by year only
  {
    for (var i = 0; i < 393; i++)
    {
      if((carDetailArr[i][8] == year))
      {
        displayItem(carDetailArr[i][1], year);
        found ++;
      }
    }
    if(found == 0)
    {
      document.getElementById("msg").innerHTML="no cars found with given details";
    }
  }
  else {
    console.log("<------no fields entered------>");
  }
}
}
}

function displayItem(input, year)
{

    var tempList = document.getElementById('carList');
    var temp_ul = document.createElement('ul');
    var temp_a = document.createElement('a');
    temp_a.innerHTML = input;
    temp_a.id = input;
    temp_a.href = "2a.html";
    temp_a.style = "text-decoration:none"
    temp_a.onclick = function() { saveInfo(input, year); }
    temp_ul.appendChild(temp_a);
    tempList.appendChild(temp_ul);
    //document.getElementById(input).onclick = saveInfo;
}

function saveInfo(input, year)
{
  setCookie("car",input,5);
  setCookie("cyr",year,5)
  //console.log("car selected is -" + input);//scaff
}

function loadInfo()
{
  ////////////////////--
  var select = getCookie("car");
  var year = getCookie("cyr")

  if((select == "all") && (year == 0))
  {
    for (var i = 0; i < 393; i++)
    {
      tableEntry(carDetailArr[i]);
    }
  }
  for (var i = 0; i < 393; i++)
  {
    if(year == 0)
    {
      if(carDetailArr[i][1] == select)
      {
        tableEntry(carDetailArr[i]);
      }
    }
    else
    {
      if((carDetailArr[i][1] == select) && (carDetailArr[i][8] == year))
      {
        tableEntry(carDetailArr[i]);
      }
    }
  }
  /////-------------------------------------------------------
}


function tableEntry(entry)
{
  var parentTable = document.getElementById("detailTable")
  var temp_tr = document.createElement("tr");

  for (var i = 0; i < entry.length; i++)
  {
    var temp_th = document.createElement("th");
    temp_th.innerHTML = entry[i];
    temp_tr.appendChild(temp_th)
  }
  parentTable.appendChild(temp_tr)

}
//courtesy of w3schools, from: http://www.w3schools.com/js/js_cookies.asp
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
// //courtesy of w3schools, from: http://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
