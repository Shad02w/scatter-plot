/************************************************************************

document and window related function

*************************************************************************/

var start = false;
var zoomRect = false; //start of scatter_plot_rect-zoom
var xaxistextStore = [];
var yaxistextStore = [];


function getLinear(d) {
    return d;
}

function getLog2(d) {

    return Math.log2(d);
}

function getLog10(d) {
    return Math.log10(d);
}


var logTools = {
    'linear': getLinear,
    'log2': getLog2,
    'log10': getLog10
}




var imgSize = {
    width: 112,
    height: 84,
}

var Domain = function (x, y) {
    var xDomain, yDomain = new Array();
    this.xDomain = x;
    this.yDomain = y;
}

var fileName = new Array();


$(document).ready(function () {
    $(".body_content").css("height", window.innerHeight - 60);
    $(".body_content").css("min-height", window.innerHeight - 60);
    $(".body_content").css("max-height", window.innerHeight - 60);
    navtitle_hide();
    //    startPU();
    if (start == true) {
        guidePU();
        selectArea_hide(); //whole selectArea
        selector_hide(); //just selector
    };
    popupPU(); // update popup position to maintain center;
    canvasSU(null);
    //    $("#guide").fadeIn(1500);
    $("#dropzone").fadeIn(1500);

});

$(window).on("resize", function () {
    $(".body_content").css("height", window.innerHeight - 60);
    $(".body_content").css("min-height", window.innerHeight - 60);
    $(".body_content").css("max-height", window.innerHeight - 60);
    //    startPU();
    navtitle_hide();
    if (start == true) {
        guidePU();
        selectArea_hide(); //whole selectArea
        selector_hide(); //just selector
    }
    popupPU();
    canvasSU(null);
});

$(document).on("click", function (e) {
    xsb.fadeOut(300);
    ysb.fadeOut(300);
    $("#downloadPNGOption").fadeOut(300);
    // hide popup
    $("#popup").hide("scale", {}, 150);
    $("#popupContent").hide();
    $("#popupB").hide();
});

var pressCtrl = false;
document.addEventListener("keydown", keyDownTextField, false);
document.addEventListener("keyup", function () {
    pressCtrl = false;
}, false);

function keyDownTextField(e) {
    if (e.keyCode == 16) {
        pressCtrl = true;
    }
}
var isC = false;
$(document).on("keydown", function (e) {
    if (e.keyCode == 16) {
        isC = true;
    }
    if (isC == true) {
        if (e.keyCode == 80) {
            svgCut();
        }
    }
})

$(document).on("keyup", function (e) {
    if (e.keyCode == 27) {
        $("#popup").hide("scale", {}, 150);
        $("#popupContent").hide();
        $("#popupB").hide();
    }
    isC = false;
    pressCtrl = false;
});


//resize canvas size 
function canvasSU(rh) {
    cwidth = c_width();
    cheight = c_height();
    d3.select("#scatter_canvas")
        .attr("width", cwidth)
        .attr("height", cheight);
    if (zoomRect == true) {
        var width = (c_width() - 10);
        var height = rh;
        d3.select("#his_canvas")
            .attr("width", width)
            .attr("height", height);
    }
}




//hide selectArea when window is small
function selector_hide() {
    var selector = document.getElementsByClassName("Vselector");
    if (window.innerWidth < 600) {
        for (var i = 0; i < selector.length; i++) {
            selector[i].style.display = "none";
        }
    } else {
        for (var i = 0; i < selector.length; i++) {
            selector[i].style.display = "block";
        }
    }
}

function selectArea_hide() {
    if (window.innerWidth < 400) {
        $(".selectArea").hide();
    } else {
        $(".selectArea").fadeIn(700);
    }
}


//hide rightbar title when the width of window is smaller than 1100
function navtitle_hide() {
    if (window.innerWidth < 1100) {
        document.getElementById("navbartitle").style.display = "none";
        $("#selectbox").css("left", "0px");
    } else {
        $("#navbartitle").fadeIn(700);
        $("#selectbox").css("left", "380px");
    }
}


function guidePU() {
    var h = $(".body_content").innerHeight();
    $("#guide").css("margin-top", h / 2 - 100);
}

function startPU() {
    var h = $(".body_content").innerHeight();
    var w = $(".body_content").innerWidth();
    $("#start-wrapper").css("margin-top", h / 2 - 130);
    $("#start-wrapper").css("margin-left", w / 2 - 270 / 2);

}



// get body_content's height and width
function c_width() {
    var a;
    if (zoomRect == false) {
        a = $(window).outerWidth();
        return a;
    } else {
        a = $(window).outerWidth() / 2;
        return a;
    }
}

function c_height() {
    var a = $(window).outerHeight() - 60;
    return a;
}

/************************************************************************

popup message function

*************************************************************************/

function popupPU() {
    var h = $(window).height();
    $("#popup").css("top", (h / 2 - 150 / 2) + "px");
}

function popupCU(e, content) { //enter the content;
    var z = content;
    $("#popup").show("scale", {}, 150);
    $("#popupContent").delay(150).show(0);
    $("#popupB").delay(150).show(0);
    $(".popupM").text(content);
    $("#popupB").on("click", function () {
        $("#popup").hide("scale", {}, 150);
        $("#popupContent").hide();
        $("#popupB").hide();
    });
    e.stopPropagation();
}






/************************************************************************

inputbtn ripple effect

*************************************************************************/


$("#inputBtn").on("click", createRipple); //jquery syntax

function createRipple(e) {
    $(".ripple").remove();
    $(this).append("<div>");
    $(this).find("div").addClass("ripple");
    var d = Math.max(this.clientWidth, this.clientHeight);
    var left = e.clientX - this.offsetLeft - d / 2 + "px";
    var top = e.clientY - this.offsetTop - d / 2 + "px";
    $(this).find(".ripple")
        .css("width", d + "px")
        .css("height", d + "px")
        .css("left", left)
        .css("top", top);
}


/************************************************************************

setup global variable

*************************************************************************/

var xfactor = "";
var yfactor = "";
var xfactor_temp = "";
var yfactor_temp = "";
var xAxisTag = "";
var yAxisTag = "";
var xAxisTag_temp = "";
var yAxisTag_temp = "";
var xscaletype = "linear";
var yscaletype = "linear";
var xMax = 0;
var xMin = 0;
var yMax = 0;
var yMin = 0;



var margin = {
    top: 15,
    right: 10,
    bottom: 20,
    left: 50
}


var cwidth = c_width();
var cheight = c_height();
var width = cwidth - margin.left - margin.right;
var height = cheight - margin.top - margin.bottom;


/************************************************************************

get dataObject

*************************************************************************/





/************************************************************************

Press start to get the variables selector

*************************************************************************/


var datalist;

var xs = $(".Vselector.xVS");
var xsb = $(".VselectBox.xVSB");
var ys = $(".Vselector.yVS"); // Y axis variable selector
var ysb = $(".VselectBox.yVSB");
var xsbli, ysbli;
var selectboxAid = document.querySelectorAll(".selectboxAid a");

var dropzone = document.getElementById('dropzone');

dropzone.ondragover = function () {
    this.className = 'dropzone dragover';
    return false;
}

dropzone.ondragleave = function () {
    this.className = 'dropzone';
    return false;
}

dropzone.ondrop = function (e) {
    e.stopPropagation();
    e.preventDefault();
    this.className = 'dropzone';
    readDataLoop(e);

}


function findFileName(name) {
    var at = 0;
    for (var z = name.length - 1; z >= 0; z--) {
        if (name.charAt(z) == '.') {
            at = z;
            break;
        }
    }
    name = name.slice(0, at);
    return name;
}

function fixdata(data) {
    var o = "",
        l = 0,
        w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}


function readDataLoop(e) {

    var files = e.dataTransfer.files;
    for (var z = 0; z < files.length; ++z) {
        readData(files[z], z, files.length);
    }

}

function readData(file, num, length) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        var workbook;
        var arr = fixdata(data);
        workbook = XLSX.read(btoa(arr), {
            type: 'base64'
        });
        var first_sheet_name = workbook.SheetNames[0];
        //
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];

        var objectList = XLSX.utils.sheet_to_json(worksheet, {
            raw: 1
        });

        selectboxAid[num].text = findFileName(file.name);
        fileName.push(findFileName(file.name));

        dataObject[num]["allData"] = objectList;
        dataObject[num]["filename"] = findFileName(file.name);
        if (num == length - 1) {
            loadVariableList();
        }
    }
    reader.readAsArrayBuffer(file);
}


function loadVariableList() {
    start = true;
    guidePU();
    $("#dropzone").fadeOut(300, function () {
        $("#guide").fadeIn(300);
        $("#inputBtn").fadeIn(300);
        $(".selectArea").fadeIn(300);
    });


    //get all the var type
    datalist = getJsonKey();


    //create the variables list

    for (var z = 0; z < datalist.length; z++) {
        $(".VselectBox.xVSB").append("<li value='" + datalist[z] + "'>");
        $(".VselectBox.xVSB >li:eq(" + z + ")").text(datalist[z]);
    };

    for (var z = 0; z < datalist.length; z++) {
        $(".VselectBox.yVSB").append("<li value='" + datalist[z] + "'>");
        $(".VselectBox.yVSB >li:eq(" + z + ")").text(datalist[z]);
    };



    xsbli = $(".VselectBox.xVSB > li");
    ysbli = $(".VselectBox.yVSB > li");

    ///////////////////////////////////////
    //                                   //
    //     X & y selector function       //
    //                                   //
    /////////////////////////////////////// 

    xs.on("click", function (e) {
        ysb.fadeOut(300); // hide another one if it is showing
        if (xsb.css("display") == "none") {
            showxySB(xsb, xsbli, e);
        } else {
            hidexySB(xsb, xsbli, e);
        }
    });

    ys.on("click", function (e) { // hide another one if it is showing
        xsb.fadeOut(300);
        if (ysb.css("display") == "none") {
            showxySB(ysb, ysbli, e);
        } else {
            hidexySB(ysb, ysbli, e);
        }
    });




    ///////////////////////////////////////
    //                                   //
    //       Return Axes Variable        //
    //                                   //
    /////////////////////////////////////// 

    xsbli.on("click", function (e) {
        var textx = $(this).text(); //get the Name of the data
        var valueX = $(this).attr("value"); // get the code name of the dataset
        xfactor_temp = valueX;
        xAxisTag_temp = textx;
        $(".VselectorT.xT").fadeOut(100, function () { //change selected name 
            $(this).text(textx).fadeIn(300);
            $(this).css("color", "#fff");
        });
        xsb.fadeOut(300);
        e.stopPropagation();
        //
        //    console.log(textx);
        //    console.log(valueX);
    });

    ysbli.on("click", function (e) {
        var texty = $(this).text();
        var valuey = $(this).attr("value");
        yfactor_temp = valuey;
        yAxisTag_temp = texty;
        $(".VselectorT.yT").fadeOut(100, function () {
            $(this).text(texty).fadeIn(300);
            $(this).css("color", "#fff");
        });
        ysb.fadeOut(300);
        e.stopPropagation();

        //    console.log(texty);
        //    console.log(valuey);
    });


};




/************************************************************************

create Vselectbox by using dataset json

*************************************************************************/

// find the data json with the longest key length and get all its key name
function getJsonKey() {
    var a = [];
    var temp = 0;
    var Number;
    for (var z = 0; z < 5; z++) {
        if (dataObject[z]["allData"].length !== 0) {
            if (Object.keys(dataObject[z]["allData"][0]).length > temp) {
                temp = Object.keys(dataObject[z]["allData"][0]).length;
                Number = z;
            } else {
                continue;
            }
        } else {
            continue;
        }

    }
    temp = Object.keys(dataObject[Number]["allData"][0]);
    for (var z = 0; z < temp.length; z++) {
        if (temp[z] == "Bin_ID" || temp[z] == "Cell_ID" || temp[z] == "Label") {
            continue;
        } else {
            a.push(temp[z]);
        }
    }
    return a;
}







/************************************************************************

X and Y axis variable select function

*************************************************************************/





function showxySB(box, li, e) {
    box.show();
    var len = li.length;
    var overall = 130;
    var delay = overall / len;
    for (var z = 0; z < len; z++) {
        li.eq(z).css("animation", "fade .7s cubic-bezier(0,1.13,.74,.97) " + z * delay + "ms forwards");
        li.eq(z).css("animation", "fade .7s cubic-bezier(0,1.13,.74,.97) " + z * delay + "ms forwards");
    };
    e.stopPropagation();
}

function hidexySB(a_class, li_class, e) {
    a_class.hide(); //hide selectbox(ul)

    e.stopPropagation(); // stop event propagation 

    li_class.removeAttr("class"); //remove all calss
}





/************************************************************************

change scale: linear, log 2 and log 10 after selected xy variable

*************************************************************************/


function dataInput(x, y) {
    for (var z = 0; z < 5; z++) { //clear all the data in dataObject
        dataObject[z].hasdata = false;
        dataObject[z].x = [];
        dataObject[z].y = [];
        dataObject[z].ds = [];
    }
    //change x axis value in ds according to the scaletype
    if (xscaletype == "linear") {
        for (var z = 0; z < 5; z++) {
            if (dataObject[z].allData.length !== 0) {
                for (var i = 0; i < dataObject[z].allData.length; i++) {
                    dataObject[z].x.push(dataObject[z].allData[i][x]);
                }
                dataObject[z].hasdata = true;
            } else {
                continue;
            }
        }
    } else if (xscaletype == "log2") {
        for (var z = 0; z < 5; z++) {
            if (dataObject[z].allData.length !== 0) {
                for (var i = 0; i < dataObject[z].allData.length; i++) {
                    dataObject[z].x.push(Math.log2(dataObject[z].allData[i][x]));
                }
                dataObject[z].hasdata = true;
            } else {
                continue;
            }
        }
    } else if (xscaletype == "log10") {
        for (var z = 0; z < 5; z++) {
            if (dataObject[z].allData.length !== 0) {
                for (var i = 0; i < dataObject[z].allData.length; i++) {
                    dataObject[z].x.push(Math.log10(dataObject[z].allData[i][x]));
                }
                dataObject[z].hasdata = true;
            } else {
                continue;
            }
        }
    };

    //change y axis value in ds according to the scaletype
    if (yscaletype == "linear") {
        for (var z = 0; z < 5; z++) {
            if (dataObject[z].allData.length !== 0) {
                for (var i = 0; i < dataObject[z].allData.length; i++) {
                    dataObject[z].y.push(dataObject[z].allData[i][y]);
                }
                dataObject[z].hasdata = true;
            } else {
                continue;
            }
        }
    } else if (yscaletype == "log2") {
        for (var z = 0; z < 5; z++) {
            if (dataObject[z].allData.length !== 0) {
                for (var i = 0; i < dataObject[z].allData.length; i++) {
                    dataObject[z].y.push(Math.log2(dataObject[z].allData[i][y]));
                }
                dataObject[z].hasdata = true;
            } else {
                continue;
            }
        }
    } else if (yscaletype == "log10") {
        for (var z = 0; z < 5; z++) {
            if (dataObject[z].allData.length !== 0) {
                for (var i = 0; i < dataObject[z].allData.length; i++) {
                    dataObject[z].y.push(Math.log10(dataObject[z].allData[i][y]));
                }
                dataObject[z].hasdata = true;
            } else {
                continue;
            }
        }
    }
    //combine x ang y axis values to each ds
    for (var z = 0; z < 5; z++) {
        if (dataObject[z].allData.length !== 0) {
            for (var i = 0; i < dataObject[z].allData.length; i++) {
                dataObject[z].ds.push([dataObject[z].x[i], dataObject[z].y[i]]);
            }
        } else {
            continue;
        }
    }
};


// all available data for calculating max & min

function all_data() {

    var result = [];
    for (var z = 0; z < 5; z++) {
        if (dataObject[z].hasdata == true) {
            for (var i = 0; i < dataObject[z]["ds"].length; i++) {
                result.push(dataObject[z]["ds"][i]);
            }
        } else {
            continue;
        }
    }
    return result;
}


// generate 1D array of x or y data to form dataObject 2D dataset :(array, x or y:[0 or 1])
function twoToOne(arr, va) {
    var result = new Array();
    for (var z = 0; z < arr.length; z++) {
        result.push(arr[z][va]);
    }
    return result;
}

//expand the domain

function addMindomain(max, min, length) {
    var absmax = Math.abs(max);
    var absmin = Math.abs(min);
    var retain = (absmax - absmin) / length * 200
    var absretain = Math.abs(retain);
    retain = min - absretain;
    return retain;
}

function addMaxdomain(max, min, length) {
    var absmax = Math.abs(max);
    var absmin = Math.abs(min);
    var retain = (absmax - absmin) / length * 200
    var absretain = Math.abs(retain);
    retain = max + absretain;
    return retain;
}






/************************************************************************

main function for creating Svg

*************************************************************************/


$("#inputBtn").on("click", function (e) {
    var message = "";
    var _this = this;
    if (!xfactor_temp && !yfactor_temp) {
        var message = "Please select X and Y variables";
        popupCU(e, message);
    } else if (!xfactor_temp) {
        var message = "Please select X variables";
        popupCU(e, message);
    } else if (!yfactor_temp) {
        var message = "Please select Y variables";
        popupCU(e, message);
    } else {
        xfactor = xfactor_temp;
        yfactor = yfactor_temp;
        xAxisTag = xAxisTag_temp;
        yAxisTag = yAxisTag_temp;
        //remove svg wrapper div
        $("#svg-wrapper").remove();
        //show dataicon
        $("#dataicon").fadeIn(200);
        $("#download").fadeIn(200);
        //Input data to the dataObject
        dataInput(xfactor, yfactor);
        $("#guide").fadeOut(270);
        setTimeout(function () {
            $(_this).off("click");
            createSvg();
        }, 300);
    }
});



function createSvg() {

    d3.select("#openHis")
        .style("display", "block");
    d3.select("#openHis")
        .on("mouseenter", function () {
            $("#zoom-rect").fadeIn(200);
        })
        .on("mouseleave", function () {
            $("#zoom-rect").fadeOut(200);
        });


    d3.select("#check_box_title")
        .style("display", "block");

    var dataBeselected = { //dataNmber
        "0": false,
        "1": false,
        "2": false,
        "3": false,
        "4": false
    };

    var axislabelMatch = {
        "linear": "",
        "log2": "[Log 2]",
        "log10": "[Log 10]",
    };

    var zoomStore = { // store the zoom domain for htmap zoom
        "x": [],
        "y": []
    };



    d3.select("#appendSvg")
        .append("div")
        .attr("id", "svg-wrapper");

    cwidth = c_width();
    cheight = c_height();
    width = cwidth - margin.left - margin.right;
    height = cheight - margin.top - margin.bottom;


    var displaymode = "pts";




    var xAxis = d3.svg.axis();
    var yAxis = d3.svg.axis();
    var xScale = d3.scale.linear();
    var yScale = d3.scale.linear();

    var zoom = d3.behavior.zoom();

    ///////////////////////////////////////
    //                                   //
    //          tooltip  setup           //
    //                                   //
    ///////////////////////////////////////

    function textboxPU(e) {
        if (e.clientX > window.innerWidth * 2 / 3) {
            $("#textbox").attr("class", "toLeft");
        } else {
            $("#textbox").attr("class", "toRight");
        }
    }



    var tip = d3.tip()
        //        .offset(function () {
        //            return [-20, 0];
        //        })
        //        .direction(function () {
        //            return 'n';
        //        })
        .attr("class", "d3-tip")
        .html(function (d, i, event) {
            var dN = $(this).attr("dataNumber");
            var keyname = Object.keys(dataObject[dN].allData[i]);

            var xValue = d[0].toFixed(5);
            var yValue = d[1].toFixed(5);

            if ((d[0] < 0.01 && d[0] > -0.01) || d[0] > 5000) {
                xValue = d[0].toExponential(5);
            }
            if ((d[1] < 0.01 && d[1] > -0.01) || d[1] > 5000) {
                yValue = d[1].toExponential(5);
            }
            var a = "";
            a += "<img class='tip_img' src='image/" + dataObject[dN].filename + "/" + dataObject[dN].allData[i]["Bin_ID"] + "_" + dataObject[dN].allData[i]["Cell_ID"] + ".jpg'/><br/>"
            a += "<div class='textboxA'>From<br/>ID<br/>" + xfactor + axislabelMatch[xscaletype] + "<br/>" + yfactor + axislabelMatch[yscaletype] + "<br/>" + "</div>";
            a += "<div class='textboxB'><span style='color:" + dataObject[dN].color + "'>" + dataObject[dN].filename + "</span><br/>" + dataObject[dN].allData[i]["Bin_ID"] + "_" + dataObject[dN].allData[i]["Cell_ID"] + "<br>" + xValue + "<br/>" + yValue + "<br/>" + "</div>";

            return a;


        });

    var imgtip = d3.tip()
        .offset([-20, 0])
        .attr("class", "d3-tip")
        .html(function (d, i, event) {
            var dN = $(this).attr("dataNumber");
            var xValue = d[0].toFixed(5);
            var yValue = d[1].toFixed(5);

            if ((d[0] < 0.01 && d[0] > -0.01) || d[0] > 5000) {
                xValue = d[0].toExponential(5);
            }
            if ((d[1] < 0.01 && d[1] > -0.01) || d[1] > 5000) {
                yValue = d[1].toExponential(5);
            }
            var a = "";
            a += "<div class='textboxA'>From<br/>ID<br/>" + xfactor + axislabelMatch[xscaletype] + "<br/>" + yfactor + axislabelMatch[yscaletype] + "<br/>" + "</div>";
            a += "<div class='textboxB'><span style='color:" + dataObject[dN].color + "'>" + dataObject[dN].filename + "</span><br/>" + dataObject[dN].allData[i]["Bin_ID"] + "_" + dataObject[dN].allData[i]["Cell_ID"] + "<br>" + xValue + "<br/>" + yValue + "<br/>" + "</div>";
            return a;


        });


    ///////////////////////////////////////
    //                                   //
    //   Update Axis and  scale chage    //
    //                                   //
    /////////////////////////////////////// 

    function scalechange() {

        //get All available datasets 
        var availableData = all_data();

        //find the Max and Min
        xMax = Math.max.apply(Math, twoToOne(availableData, 0));
        xMin = Math.min.apply(Math, twoToOne(availableData, 0));
        yMax = Math.max.apply(Math, twoToOne(availableData, 1));
        yMin = Math.min.apply(Math, twoToOne(availableData, 1));


        xScale
            .domain([addMindomain(xMax, xMin, width), addMaxdomain(xMax, xMin, width)])
            .range([0, width]);

        yScale
            .domain([addMindomain(yMax, yMin, height), addMaxdomain(yMax, yMin, height)])
            .range([height, 0]);

        xAxis
            .scale(xScale)
            .orient("bottom")
            .ticks(13, ".3s")
            .tickSize(-height);

        if ((xMin < 0.01 && xMin > -0.01) || xMin > 5000) {
            xAxis
                .tickFormat(d3.format(".3e"));
        } else {
            xAxis
                .tickFormat(d3.format(".3g"));
        }

        yAxis
            .scale(yScale)
            .orient("left")
            .ticks(7)
            .tickSize(-width);

        if ((yMin < 0.01 && yMin > -0.01) || yMin > 5000) {
            yAxis
                .tickFormat(d3.format(".3e"));
        } else {
            yAxis
                .tickFormat(d3.format(".3g"));
        }

        zoom
            .x(xScale)
            .y(yScale)
            .on("zoom", zooming);
    }

    scalechange();


    ///////////////////////////////////////
    //                                   //
    //         Create svg structure      //
    //                                   //
    /////////////////////////////////////// 


    d3.select("#svg-wrapper")
        .append("div")
        .attr("id", "svgholder")
        .append("svg")
        .attr("id", "mainSvg")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
        .append("rect")
        .attr("id", "cutImgRect")
        .style("fill", "none");


    var svg = d3.select("#mainSvg")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .append("g")
        .on("mousedown", getDomain_his) //end of rect-zoom



    svg.append("rect")
        .attr("id", "zoombox")
        .style("fill", "transparent");


    svg.append("defs")
        .append("clipPath")
        .attr("id", "clip")
        .append("rect");

    svg.append("g")
        .attr("id", "ptsCount")
        .append("text")
        .style({
            "text-anchor": "end",
            "font-size": "12px",
            fill: '#fff'

        });

    svg.append("g")
        .attr("class", "x_axis")
        .append("text")
        .attr("class", "label")
        .attr("id", "xaxisLabel")
        .style("text-anchor", "end")
        .style("font-size", "20px");


    svg.select('.x_axis')
        .append("foreignObject")
        .attr("class", "powerIndex x")
        .attr("width", "100")
        .attr("height", "25")
        .style({

            "font-size": "15px",
            "color": "#fff",
        });






    svg.append("g")
        .attr("class", "y_axis")
        .append("text")
        .attr("class", "label")
        .attr("id", "yaxisLabel")
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "end")
        .style("font-size", "20px");


    svg.select('.y_axis')
        .append("foreignObject")
        .attr("class", "powerIndex y")
        .attr("width", "100")
        .attr("height", "25")
        .style({
            "font-size": "15px",
            "color": "#fff",
        });




    svg.append("defs")
        .append("clipPath")
        .attr("id", "imgclip")
        .append("rect");


    svg.call(zoom);
    svg.call(tip);
    svg.call(imgtip);

    var htmap_gp = svg.append("g")
        .attr("class", "htmap-gp")
        .attr("clip-path", "url(#clip)");


    var dataset = svg.append("g")
        .attr("class", "scatter")
        .attr("clip-path", "url(#clip)");


    var image = svg.append("g")
        .attr("id", "imgbox").attr("clip-path", "url(#imgclip)");


    ///////////////////////////////////////
    //                                   //
    // Update attr with width and height //
    //    and change the xy axis tag     //
    //                                   //
    /////////////////////////////////////// 


    function svgchange(x, y) { // x variable , y variable

        d3.select("#mainSvg")
            .attr("width", cwidth)
            .attr("height", cheight);

        d3.select("#cutImgRect")
            .attr("width", cwidth)
            .attr("height", cheight);

        d3.select("#zoombox")
            .attr("width", width)
            .attr("height", height);

        d3.select("#ptsCount")
            .attr("transform", "translate(" + (width - 2) + "," + 14 + ")");

        d3.select("#clip > rect")
            .attr("width", width)
            .attr("height", height);

        d3.select(".x_axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        d3.select("#xaxisLabel")
            .attr("x", width - 5)
            .attr("y", -6)
            .text(x + axislabelMatch[xscaletype]);

        d3.select(".powerIndex.x")
            .attr("x", width - 100)
            .attr("y", -41)
            .html("");

        d3.select(".y_axis")
            .call(yAxis);
        d3.select("#yaxisLabel")
            .attr("x", -5)
            .attr("y", 6)
            .attr("dy", ".71em")
            .text(y + axislabelMatch[yscaletype]);

        d3.select(".powerIndex.y")
            .attr("x", 25)
            .attr("y", 3)
            .html("");

        d3.select("#imgclip > rect")
            .attr("width", width)
            .attr("height", height);


    }

    svgchange(xAxisTag, yAxisTag);








    function createpts(dataNumber) {
        $("#clearbtn").fadeIn(100);
        var z = dataNumber;
        dataset.selectAll(".pts." + dataObject[z].filename)
            .data(dataObject[z]["ds"])
            .enter()
            .append("circle")
            .attr("class", "pts " + dataObject[z].filename)
            .attr("dataNumber", z)
            .attr("from", dataObject[z].filename)
            .attr("r", 5)
            .style("fill", dataObject[z].color)
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide);
        ptsUpdate();
        $(".pts").on("mouseenter", textboxPU);
        //        $(".pts").on("mouseenter", updateTip);

    };

    function removepts(dataNumber) {
        var z = dataNumber;
        $(".pts." + dataObject[z].filename).remove();

    }



    ///////////////////////////////////////
    //                                   //
    //           Create img              //
    //                                   //
    /////////////////////////////////////// 



    function createimg(dataNumber, e) {
        $("#clearbtn").fadeIn(100);
        var z = dataNumber;
        image.selectAll(".ptsImg." + dataObject[z].filename)
            .data(dataObject[z]["ds"])
            .enter()
            .append("image")
            .attr("class", "ptsImg " + dataObject[z].filename)
            .attr("dataNumber", z)
            .attr("width", imgSize.width + "px")
            .attr("height", imgSize.height + "px")
            .attr("xlink:href", function (d, i) {
                var a = "image/" + dataObject[z].filename + "/" + dataObject[z].allData[i]["Bin_ID"] + "_" + dataObject[z].allData[i]["Cell_ID"] + ".jpg";
                return a;
            })
            .on("mouseover", imgtip.show)
            .on("mouseout", imgtip.hide);
        imgUpdate();
        $(".ptsImg").on("mouseover", textboxPU);
        imgUpdate();
    }



    function removeimg(dataNumber) {
        var z = dataNumber;
        $(".ptsImg." + dataObject[z].filename).remove();
    }


    ///////////////////////////////////////
    //                                   //
    //        Update pts and img         //             
    //             with zoom             //
    //                                   //
    /////////////////////////////////////// 

    function ptsUpdate() {
        d3.selectAll(".pts")
            .attr("cx", function (d, i) {
                return xScale(d[0]);
            })
            .attr("cy", function (d, i) {
                return yScale(d[1]);
            });
        ptsCount();
    }

    function imgUpdate() {
        d3.selectAll(".ptsImg")
            .attr("x", function (d, i) {
                return xScale(d[0]) - (imgSize.width / 2);
            })
            .attr("y", function (d, i) {
                return yScale(d[1]) - (imgSize.width / 2);
            });
    }


    ///////////////////////////////////////
    //                                   //
    //        Count the point            //             
    //                                   //
    /////////////////////////////////////// 

    function inRange(domain, data) {
        if (data < domain[0] || data > domain[1]) return false;
        return true;
    }

    function ptsCount() {

        var d = new Domain(xScale.domain(), yScale.domain());
        var c = 0;
        for (var z = 0; z < fileName.length; z++) {
            if (dataBeselected[z] == false) continue;
            for (var x = 0; x < dataObject[z].allData.length; x++) {
                if (!(inRange(d.xDomain, dataObject[z].allData[x][xAxisTag]) && inRange(d.yDomain, dataObject[z].allData[x][yAxisTag]))) continue;
                c++;
            }
        }
        $("#ptsCount > text").text(c);
    };




    function indexChange() {

        xaxistextStore = [];
        yaxistextStore = [];

        var Allxaxis = $("#mainSvg .x_axis .tick text");
        var Allyaxis = $("#mainSvg .y_axis .tick text");

        var xaxisMin = Number(Allxaxis.html());
        var yaxisMin = Number(Allyaxis.html());
        if (xaxisMin == 0) {
            xaxisMin = Number(Allxaxis.eq(1).html());
        }
        if (yaxisMin == 0) {
            yaxisMin = Number(Allyaxis.eq(1).html());
        }

        for (var z = 0; z < Allxaxis.length; z++) {
            xaxistextStore.push(Number(Allxaxis.eq(z).html()));
        }

        for (var z = 0; z < Allyaxis.length; z++) {
            yaxistextStore.push(Number(Allyaxis.eq(z).html()));
        }


        var x_prefix = d3.formatPrefix(xaxisMin);
        for (var z = 0; z < Allxaxis.length; z++) {
            var temp = Number(Allxaxis.eq(z).html());
            temp = x_prefix.scale(temp);
            //            Allxaxis.eq(z).html(d3.format(".3g")(temp));
            Allxaxis.eq(z).html(parseFloat(temp.toPrecision(3)));
        }
        $(".powerIndex.x").html('<div xmlns= "http://www.w3.org/1999/xhtml" style="text-align:right"><span class="prefix" xmlns= "http://www.w3.org/1999/xhtml">' + x_prefix.symbol + "</span>" + changeUnit(unit[xAxisTag]) + '</div>');





        var y_prefix = d3.formatPrefix(yaxisMin);
        for (var z = 0; z < Allyaxis.length; z++) {
            var temp = Number(Allyaxis.eq(z).html());
            temp = y_prefix.scale(temp);
            //            Allyaxis.eq(z).html(d3.format(".3g")(temp));
            Allyaxis.eq(z).html(parseFloat(temp.toPrecision(3)));
        }

        //        $(".powerIndex.y").html(y_prefix.symbol + "$" + unit[yAxisTag] + "$");
        $(".powerIndex.y").html('<div xmlns= "http://www.w3.org/1999/xhtml" style="text-align:left"><span class="prefix" xmlns= "http://www.w3.org/1999/xhtml">' + y_prefix.symbol + "</span>" + changeUnit(unit[yAxisTag]) + '</div>');


    }


    indexChange();


    function zooming() {
        if (htmap_mode == true) {

        } else {
            zoom.scaleExtent([zoom.scale() * 0.9, zoom.scale() * 1.1]);
            svg.select(".x_axis").call(xAxis);
            svg.select(".y_axis").call(yAxis);
            ptsUpdate();
            imgUpdate();
            indexChange();

        }

    }


    function htmap_zooming() {
        svg.select(".x_axis").call(xAxis);
        svg.select(".y_axis").call(yAxis);

    }


    ///////////////////////////////////////
    //                                   //
    //      swap displaymode btn         //
    //                                   //
    ///////////////////////////////////////

    d3.select("#svg-wrapper")
        .append("img")
        .attr("id", "clearbtn").attr("src", "icon/showImg.png");

    $("#clearbtn").on("click", function (e) {
        if (htmap_mode == true) return;
        toggleImg(e);
    });


    function imgLimit(e) {
        var limited = 0;
        xScaleRange = xScale.domain();
        yScaleRange = yScale.domain();

        var dataset_beselected_x = [] //x-axis
        var dataset_beselected_y = [] //y-axis
        for (var z = 0; z < 5; z++) {
            if (dataBeselected[z] == true) {
                for (var j = 0; j < dataObject[z].allData.length; j++) {
                    dataset_beselected_x.push(dataObject[z].allData[j][xAxisTag]);
                    dataset_beselected_y.push(dataObject[z].allData[j][yAxisTag]);
                }
            } else {
                continue;
            }
        }


        var counter_pts = 0

        for (var i = 0; i < dataset_beselected_x.length; i++) {
            if (dataset_beselected_x[i] > xScaleRange[0] && dataset_beselected_x[i] < xScaleRange[1] && dataset_beselected_y[i] > yScaleRange[0] && dataset_beselected_y[i] < yScaleRange[1]) {
                counter_pts = counter_pts + 1;
            }
        }

        if (counter_pts > 250) {
            popupCU(e, "More than 250 points");
            limited = 1;
        }


        return limited;
    }

    function toggleImg(e) {

        if (displaymode == "pts") {
            if (imgLimit(e)) {
                return false;
            }
            displaymode = "img";
            $("#clearbtn").attr("src", "icon/showPts.png");
            //first remove all pts 
            $(".pts").remove();
            //then create img for the selected data
            for (var z = 0; z < 5; z++) {
                if (dataBeselected[z] == true) {
                    createimg(z, e);
                } else {
                    continue;
                }
            }

        } else if (displaymode == "img") { // if the Img is already slow in the graph
            displaymode = "pts";
            $("#clearbtn").attr("src", "icon/showImg.png");

            // first remove all selected dataset img
            $(".ptsImg").remove();

            //then add all the selected dataset pts
            for (var z = 0; z < 5; z++) {
                if (dataBeselected[z] == true) {
                    createpts(z);
                } else {
                    continue;
                }
            }

        }
    }


    ///////////////////////////////////////
    //                                   //
    //      Histogram function           //
    //                                   //
    ///////////////////////////////////////



    var initialHeight = 30;
    var recentHeight = 0;
    var bin_num = 20;
    var recentDomain = new Domain();
    var hisOrder = new Array();
    var hisOrderHeight = new Array();

    var hisHeight = function () {
        var h = ($("#his-wrapper").height() - 40) / 3;
        return h;
    }

    $("#zoom-rect").on("click", function (e) {
        var hasD = false;
        for (var z = 0; z < fileName.length; z++) {
            if (dataBeselected[z] != true) continue;
            hasD = true;
            break;
        }
        if (hasD == false) {
            popupCU(e, "Please select dataset.")
            return;
        }

        if (zoomRect == false) {
            zoomRect = true;
            $("#svg-wrapper").css("width", c_width());
            svgAreaResize();
            addHisArea();
            canvasSU(recentHeight);
        } else {
            zoomRect = false;
            removeHisArea();
            $("#svg-wrapper").css("width", c_width());
            svgAreaResize();
            canvasSU(recentHeight);
        }
    });


    // resize mainsvg when histogram is on
    function svgAreaResize() {
        cwidth = c_width();
        width = cwidth - margin.left - margin.right;


        scalechange();
        svgchange(xAxisTag, yAxisTag);
        zooming();
    }


    function listenter() {
        $(this).css("background", "#374757");
    };

    function listleave() {
        $(this).css("background", "#1e2730");

    }


    //histogram datalist selectlist function 
    function getColor(status) {
        if (status == 1) {

            //disable the hover animation
            $(this).off("mouseenter");
            $(this).off("mouseleave");

            $(this).css("background", "#07d2c6");


            //
        } else {
            $(this).css("background", "#1e2730");

            //link to hover animation again
            $(this).on("mouseenter", listenter);
            $(this).on("mouseleave", listleave);
        }
    }


    function getGraph(status, num) {
        if ($("#allHisSvgHolder").length == 0) {
            initializeHisSvg();
        }
        //update the data each click
        if (status == 1) {
            addHistogramBase(getDatasetByName(), num, bin_num);
            addHistogramInBox(getDatasetByName(), getDatasetByNameInBox(), num, bin_num);
        } else {
            deleteHistogram(num);
        }


    }

    function his_switch(on) {
        var status, num;
        //swap the status
        if (on == 1) {
            status = 0;
        } else {
            status = 1;

        }
        $(this).attr("on", status);
        num = Number($(this).attr("value"));
        getColor.call(this, status);
        getGraph.call(this, status, num);
        return status;
    };






    function addHisArea() {
        $("#appendSvg").append("<div id='his-wrapper'>");
        $("#his-wrapper").css("width", $(window).outerWidth() / 2);
        $("#his-wrapper").css("height", c_height());


        $("#reset").css("right", (20 + c_width()) + "px");
        $("#htmapBtn").css("right", (20 + c_width()) + "px");
        $("#clearbtn").css("right", (20 + c_width()) + "px");
        $("#colorlabel").css("right", (20 + c_width()) + "px");
        $("#openHis").css("right", c_width() + "px");
        $("#zoom-rect").attr("src", "icon/hide.png");

        //#histogram guide messages
        $("#his-wrapper").append("<div id='hisguide'>");
        $("#hisguide").html("Please use <strong>Shift + LeftButton</strong> to select the domain");


        //add bin selector 
        $(".body_content").append("<div id='bin-wrapper'>");
        $("#bin-wrapper").append("<input type='number' id='bin' style='width:50px' >")
        $("#bin-wrapper").append("<input id='binSubmit' type='submit' value='Submit'>");



        //add selectlist
        $(".body_content").append("<ul id='hislist-wrapper'>");
        $("#hislist-wrapper").append("<li>");
        $("#hislist-wrapper > li").text("Datalist")

        var hislist = $("#hislist-wrapper").append("<ul id = 'hislist'>");
        for (var z = 0; z < datalist.length; z++) {
            $("#hislist").append("<li on='0' value='" + z + "'>");
            $("#hislist > li").eq(z).text(datalist[z]);
        }


        $("#hislist > li").on("mouseenter", listenter);
        $("#hislist > li").on("mouseleave", listleave);


        $("#hislist > li").on("click", function () {
            var status = $(this).attr("on");
            his_switch.call(this, status);
        });



        //add graph to the his-wrapper


    }

    function removeHisArea() {
        hisOrder = [];
        hisOrderHeight = [];
        recentHeight = 0;

        $("#his-wrapper").remove();
        $("#bin-wrapper").remove();
        $("#hislist-wrapper").remove();
        $("#reset").css("right", 20);
        $("#htmapBtn").css("right", 20);
        $("#clearbtn").css("right", 20);
        $("#colorlabel").css("right", 20);
        $("#openHis").css("right", "0px");
        $("#zoom-rect").attr("src", "icon/show.png");
    }

    //get all data by Data Name in the dataset which is being selected
    function getDatasetByName() {
        var dataset_byName = new Array();
        for (var z = 0; z < datalist.length; z++) {
            dataset_byName[z] = new Array();
        }
        for (var z = 0; z < fileName.length; z++) {
            if (!dataBeselected[z]) continue;
            for (var x = 0; x < datalist.length; x++) {
                for (var i = 0; i < dataObject[z].allData.length; i++) {
                    dataset_byName[x].push(dataObject[z].allData[i][datalist[x]]);
                }
            }
        }
        return dataset_byName;
    }


    function getDatasetByNameInBox() {
        // get Dataset array by data name
        var wholeData = getDatasetByName();
        var len = wholeData.length;
        var DataInBox = new Array();
        var DataInBoxPoint = new Array(); //which dataset,which point,data
        for (var z = 0; z < datalist.length; z++) {
            DataInBox[z] = new Array();
            DataInBoxPoint[z] = new Array();
        }


        for (var z = 0; z < fileName.length; z++) {
            if (!dataBeselected[z]) continue;
            for (var x = 0; x < datalist.length; x++) {
                for (var i = 0; i < dataObject[z].allData.length; i++) {
                    var data = dataObject[z].allData[i][datalist[x]];



                    var xdata = dataObject[z].allData[i][xAxisTag];
                    var ydata = dataObject[z].allData[i][yAxisTag];

                    xdata = logTools[xscaletype](xdata);
                    ydata = logTools[yscaletype](ydata);

                    if (inRange(recentDomain.xDomain, xdata) && inRange(recentDomain.yDomain, ydata)) {
                        DataInBox[x].push(data);
                    }
                }

            }

        }

        return DataInBox;

    }





    function initializeHisSvg() {
        getDatasetByName();
        //        console.log("add svg first");

        recentHeight = initialHeight;

        d3.select("#his-wrapper")
            .append("svg")
            .attr("id", "allHisSvgHolder")
            .attr("width", c_width())
            .attr("height", initialHeight)
            .style({
                "font-family": "'Roboto', sans-serif",
                "color": "#fff",
            })
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("xmlns:xlink", "http://www.w3.org/1999/xlink");

        d3.select("#allHisSvgHolder")
            .append("rect")
            .attr("id", "allHisSvgHolderBackground")
            .attr("width", c_width())
            .attr("height", initialHeight)
            .style({
                "fill": "none",
            });


        var whiteLegend = d3.select("#allHisSvgHolder")
            .append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + 25 + ",10)");

        var blueLegend = d3.select("#allHisSvgHolder")
            .append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + (25 + 100) + ",10)");


        whiteLegend
            .append("rect")
            .attr("width", "10px")
            .attr("height", "10px")
            .style({
                "fill": "#fff"
            })


        whiteLegend
            .append("text")
            .text("Global")
            .attr("dx", "15")
            .attr("dy", "10")
            .style({
                "font-size": "11px",
            });



        blueLegend
            .append("rect")
            .attr("width", "10px")
            .attr("height", "10px")
            .style({
                "fill": "#07d2c6"
            });

        blueLegend
            .append("text")
            .text("Local")
            .attr("dx", "15")
            .attr("dy", "10")
            .style({
                "font-size": "11px",
            });

        canvasSU(recentHeight);
    }





    function getDomain_his() {
        if (pressCtrl == false || zoomRect == false) return;
        svg.on("mousedown.zoom", null);
        var e = this,
            origin = d3.mouse(e),
            rect = svg.append("rect").attr("class", "scatter_zoom");
        d3.select("body").classed("noselect", true);
        d3.select(e).on("mousemove", function () {
            var m = d3.mouse(e);
            rect.attr("x", d3.min([origin[0], m[0]]))
                .attr("y", d3.min([origin[1], m[1]]))
                .attr("width", Math.abs(origin[0] - m[0]))
                .attr("height", Math.abs(origin[1] - m[1]));
        })
        d3.select(e).on("mouseup", function () {
            var m = d3.mouse(e);
            //remove the guide 
            $("#hisguide").remove();

            //remove the indicate rect
            d3.selectAll(".scatter_zoom").remove();


            d3.select("body").classed("noselect", false);

            //disable all mouse event first
            d3.select(e).on("mousemove", null);
            d3.select(e).on("mouseup", null);
            $("#bin-wrapper").fadeIn(200);
            $("#hislist-wrapper").fadeIn(200);
            //333
            if (origin[0] !== m[0] || origin[1] !== m[1]) {


                svg.call(zoom);



                var zoom_x_min = d3.min([xScale.invert(m[0]), xScale.invert(origin[0])]);
                var zoom_x_max = d3.max([xScale.invert(m[0]), xScale.invert(origin[0])]);
                var zoom_y_min = d3.min([yScale.invert(m[1]), yScale.invert(origin[1])]);
                var zoom_y_max = d3.max([yScale.invert(m[1]), yScale.invert(origin[1])]);

                recentDomain.xDomain = [zoom_x_min, zoom_x_max];
                recentDomain.yDomain = [zoom_y_min, zoom_y_max];

                $("#binSubmit").on("click", function (e) {
                    var temp = Number($("#bin").val());
                    if (temp > 150) {
                        popupCU(e, "Range: 1 ~ 150");
                        return;
                    } else {
                        //change the variavble
                        bin_num = temp;
                        recentHeight = initialHeight;

                        //change the svg size 
                        $('#allHisSvgHolder').attr('height', recentHeight);
                        $('allHisSvgHolderBackground').attr('height', recentHeight);

                        //delete recent histogram group
                        $('.histo_svg_container').remove();

                        //re-product the histogram according to the hisOrder 
                        //save the histogram order
                        var hisOrder_temp = hisOrder;
                        hisOrder = [];
                        hisOrderHeight = [];

                        for (var z = 0; z < hisOrder_temp.length; z++) {
                            addHistogramBase(getDatasetByName(), hisOrder_temp[z], bin_num);
                            addHistogramInBox(getDatasetByName(), getDatasetByNameInBox(), hisOrder[z], bin_num);
                        }
                    }

                });

            };

            if (!$('#allHisSvgHolder').length == 0) reselectDomain();
        });



        d3.event.stopPropagation();



    };

    // 


    //hide the ticks of histogram to prevent overlay
    function changeHistogramTick(bin, num) {
        var allxticks = $(".his_xAxis.data" + num + " > .tick text");
        var allyticks = $(".his_yAxis.data" + num + " > .tick text");

        var prefix = $('.histo_svg_container.data' + num + ' > foreignObject div')
        console.log(num);
        var xmin, ymin, xprefix, yprefix;
        for (var z = 0; z < allxticks.length; z++) {
            var value = Number(allxticks.eq(z).text());
            if (value == 0) continue;
            xprefix = d3.formatPrefix(value);
            break;

        }


        for (var z = 0; z < allyticks.length; z++) {
            var value = Number(allyticks.eq(z).text());
            if (value == 0) continue;
            yprefix = d3.formatPrefix(value);
            break;
        }

        //hide all x tick first
        var ticksNumber = allxticks.length;
        var reduce = Math.round(ticksNumber / 10);

        if (reduce > 1) {
            allxticks.hide();
        }


        for (var z = 0; z < ticksNumber; z += reduce) {
            var tickNum = xprefix.scale(Number(allxticks.eq(z).text()));

            allxticks.eq(z).html(parseFloat(tickNum.toPrecision(3)));
            allxticks.eq(z).show();


        }

        //add the prefix and unit to the histogram

        console.log(num);
        prefix.html('<span xmlns=http://www.w3.org/1999/xhtml class="prefix">' + xprefix.symbol + '</span>' + changeUnit(unit[datalist[num]]));

        //        MathJax.Hub.Typeset();


    }





    function addHistogramBase(wholeData, num, bin_num) {

        var width = (c_width() - 10);
        var height = hisHeight();
        var padding = {
            left: 40,
            right: 5,
            top: 8,
            bottom: 40
        };


        var dataset_his = wholeData[num];
        //indicate y translate of recent histogram
        var heightAt = recentHeight;


        // change the height information
        recentHeight += hisHeight();
        //increase the height of svg
        $("#allHisSvgHolder").attr("height", recentHeight);
        $("#allHisSvgHolderBackground").attr("height", recentHeight);


        //updata the canvas size
        canvasSU(recentHeight);

        //hisOrder is the order of the histogram of the dataset
        //add the dataset num to hisOrder 
        hisOrder.push(num);
        hisOrderHeight.push(heightAt);


        var histogram = d3.layout.histogram()
            .range([d3.min(dataset_his), d3.max(dataset_his)]) // .range([d3.min(dataset_his), d3.max(dataset_his)])
            .bins(bin_num)
            .frequency(true);

        var data = histogram(dataset_his);

        var allx = new Array(),
            ally = new Array();

        for (var z = 0; z < data.length; z++) {
            allx.push(data[z].x)
            ally.push(data[z].y)
            if (z == data.length - 1) {
                allx.push(data[z].x + data[z].dx);
            }
        }

        var ff = d3.select("#allHisSvgHolder")
            .append("g")
            .attr("class", "histo_svg_container data" + num)
            .attr("transform", "translate(0," + heightAt + ")")
            .attr("datalist", num)

        ff.append("rect")
            .attr("class", "his_background")
            .attr("width", width)
            .attr("height", height)
            .style({
                "fill": "none"
            })

        var graphics = ff.append("g")
            .attr("transform", "translate(" + padding.left + ", " + padding.top + ")")
            .attr("maxCount", d3.max(ally));


        var xScale = d3.scale.ordinal()
            .domain(allx)
            .rangeBands([0, width - padding.left - padding.right]);



        var yScale = d3.scale.linear()
            .domain([0, d3.max(ally)])
            .range([height - padding.top - padding.bottom, 0]);


        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");


        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");


        if ((d3.min(dataset_his) < 0.01 && d3.min(dataset_his) > -0.01) || d3.min(dataset_his) > 5000) {
            xAxis
                .tickFormat(d3.format(".2e"));
        } else {
            xAxis
                .tickFormat(d3.format(".2f"));
        }

        graphics.append("g")
            .attr("class", "his_xAxis data" + num)
            .attr("transform", "translate(0, " + (height - padding.top - padding.bottom) + ")")
            .call(xAxis);

        graphics.append("g")
            .attr("class", "his_yAxis data" + num)
            .call(yAxis);

        var prefix_unit = d3.select('.histo_svg_container.data' + num)
            .append('foreignObject')
            .attr('width', '80')
            .attr('height', '25')
            .attr('x', width - 80)
            .attr('y', height - padding.top - padding.bottom + 25);

        prefix_unit.append('xhtml:div')
            .attr('xmlns', 'http://www.w3.org/1999/xhtml')
            .style({
                //                'text-align': 'right',

                'width': 'auto',
                'height': '25px',
                'color': '#fff',
                'font-size': '10px',
                'text-align': 'right',
            })


        d3.select(".his_yAxis.data" + num)
            .append("text")
            .attr("class", "hisLabel")
            .attr("transform", "rotate(90)")
            .attr("dy", -(width - padding.left - padding.right - 7))
            .style("text-anchor", "start")
            .style("font-size", "15px")
            .style({
                "font-family": "'Roboto', sans-serif",
                "color": "#fff",
            })
            .text(datalist[num]);

        graphics.selectAll(".his_rect")
            .data(ally)
            .data(ally)
            .enter()
            .append("rect")
            .attr("class", "his_rect")
            .attr("x", function (d, i) {
                return xScale(allx[i]) + xScale.rangeBand() / 2;
            })
            .attr("y", function (d, i) {
                return yScale(d);
            })
            .attr("width", xScale.rangeBand())
            .attr("height", function (d) {
                return height - padding.top - padding.bottom - yScale(d);
            }).style({
                "fill": "#fff"
            })

        changeHistogramTick(bin_num, num);


    };

    function addHistogramInBox(wholeData, DataInBox, num, bin_num) {


        var his = d3.select(".histo_svg_container.data" + num + " >g");

        var width = (c_width() - 10)
        var height = hisHeight();
        var padding = {
            left: 40,
            right: 5,
            top: 8,
            bottom: 40
        };

        var maxCount = Number(his.attr("maxCount"));


        var dataset_his = wholeData[num];
        var dataInBox = DataInBox[num];

        var histogram = d3.layout.histogram()
            .range([d3.min(dataset_his), d3.max(dataset_his)])
            .bins(bin_num)
            .frequency(true);

        var data = histogram(dataInBox);



        var y = new Array();
        var x = new Array();

        for (var z = 0; z < data.length; z++) {
            x.push(data[z].x);
            y.push(data[z].y);
            if (z == data.length - 1) {
                x.push(data[z].x + data[z].dx);
            }
        }



        var xScale = d3.scale.ordinal()
            .domain(x)
            .rangeBands([0, width - padding.left - padding.right]);

        var yScale = d3.scale.linear()
            .domain([0, maxCount])
            .range([height - padding.top - padding.bottom, 0]);



        his.selectAll(".his_rect_zoom")
            .data(y)
            .enter()
            .append("rect")
            .attr("class", "his_rect_zoom")
            .style({
                "fill": "#07d2c6"
            })
            .attr("x", function (d, i) {
                return xScale(x[i]) + xScale.rangeBand() / 2;
            })
            .attr("y", function (d, i) {
                return yScale(d);
            })
            .attr("width", xScale.rangeBand())
            .attr("height", function (d, i) {
                return height - padding.top - padding.bottom - yScale(d);

            });
    }

    function deleteHistogram(num) {

        recentHeight -= hisHeight();
        canvasSU(recentHeight);
        $("#allHisSvgHolder").attr("height", recentHeight);


        var g = $(".histo_svg_container.data" + num);
        var start = hisOrder.indexOf(num);
        var temp = new Array();
        var tempHeight = new Array();



        for (var z = (hisOrder.length - 1); z > start; z--) {
            temp.push(hisOrder.pop());
            tempHeight.push(hisOrderHeight.pop());
        }
        hisOrder.pop();
        hisOrderHeight.pop();
        g.remove();

        for (var z = (temp.length - 1); z >= 0; z--) {
            var changeNum = temp[z];
            var changeHeight = tempHeight[z] - hisHeight();


            $(".histo_svg_container.data" + changeNum).attr("transform", "translate(0," + changeHeight + ")");


            hisOrder.push(changeNum);
            hisOrderHeight.push(changeHeight);
        }


    }


    function reselectDomain() {
        var allRect = $('.his_rect_zoom');
        allRect.remove();
        for (var z = 0; z < hisOrder.length; z++) {
            addHistogramInBox(getDatasetByName(), getDatasetByNameInBox(), hisOrder[z], bin_num);
        }
    }

    ///////////////////////////////////////
    //                                   //
    //       create a reset button       //
    //                                   //
    ///////////////////////////////////////

    var noOneClick;


    d3.select("#svg-wrapper")
        .append("img")
        .attr("src", "icon/resetzoom.png")
        .attr("id", "reset")
        .on("click", function () {

            if (htmap_mode == true) {
                noOneClick = setTimeout(function () {
                    if (zoomStore.x.length == 0 || zoomStore.y.length == 0) return;
                    xScale.domain([zoomStore.x[zoomStore.x.length - 1][0], zoomStore.x[zoomStore.x.length - 1][1]]).range([0, width]);
                    yScale.domain([zoomStore.y[zoomStore.y.length - 1][0], zoomStore.y[zoomStore.y.length - 1][1]]).range([height, 0]);
                    zoom
                        .x(xScale)
                        .y(yScale);
                    zoomStore.x.splice(zoomStore.x.length - 1, 1);
                    zoomStore.y.splice(zoomStore.y.length - 1, 1);
                    $(".htmap_rect").remove();
                    htmap_zooming();
                    createHtRect(width, height);
                }, 300);
            } else {
                //remove the stored domain for the htmap 
                resetzoom();
            }
        });


    function resetzoom() {
        d3.transition().duration(750).tween("zoom", function () {
            var ix = d3.interpolate(xScale.domain(), [addMindomain(xMax, xMin, width), addMaxdomain(xMax, xMin, width)]),
                iy = d3.interpolate(yScale.domain(), [addMindomain(yMax, yMin, height), addMaxdomain(yMax, yMin, height)]);
            return function (t) {
                zoom.x(xScale.domain(ix(t))).y(yScale.domain(iy(t)));
                zooming();
            };
        });
    } //end of resetzoom function 


    $("#reset").on("dblclick", function () {
        if (!htmap_mode) return;
        clearTimeout(noOneClick);
        zoomStore.x = [];
        zoomStore.y = [];
        $(".htmap_rect").remove();
        // reset domain to default
        xScale.domain([addMindomain(xMax, xMin, width), addMaxdomain(xMax, xMin, width)]);
        yScale.domain([addMindomain(yMax, yMin, height), addMaxdomain(yMax, yMin, height)]);
        zoom
            .x(xScale)
            .y(yScale);

        htmapChange();
    });



    ///////////////////////////////////////
    //                                   //
    //     data selectbox hide&show      //
    //             animation             //
    //                                   //
    /////////////////////////////////////// 

    var enterornot = false; //selectbox enter value
    var justleave = false; //just leave the dataicon
    var iconjustleave = false;
    var selectbox = $("#selectbox");
    var sbt = $(".selectboxAid");

    var STC; //delay mouseeneter event on dataicon
    var STC_justleave; //delay for hiding selectbox when reentering the dataicon

    function hideselectbox() { //function of hiding selectbox & animation(determine whether enter selectbox or not)
        if (enterornot == false) {
            selectbox.hide("scale", {
                origin: ["left", "top"]
            }, 150);
            sbt.delay(30).hide(0);
        }
    }

    $("#dataicon").on("mouseenter", function () {
        if (justleave = true) {
            clearTimeout(STC_justleave);
        }
        STC = setTimeout(function () {
            selectbox.show("scale", {
                origin: ["left", "top"]
            }, 250);
            sbt.delay(230).show(0);
        }, 350);
    });


    $("#dataicon").on("mouseleave", function () {
        clearTimeout(STC);
        setTimeout(function () {
            hideselectbox();
        }, 250);
    });

    selectbox.on("mouseenter", function () {
        enterornot = true;
    });

    selectbox.on("mouseleave", function () {
        enterornot = false;
        justleave = true;
        STC_justleave = setTimeout(function () {
            hideselectbox();
            justleave = false;
        }, 200)
    });

    ///////////////////////////////////////
    //                                   //
    //        selectbox selected         //
    //       function & animation        //
    //                                   //
    /////////////////////////////////////// 

    function beSelected(e) {
        var a = $(this).attr("value");
        var message = dataObject[a].name + " is Empty";
        if (dataObject[a]["ds"].length !== 0) {
            $(this).css("background", "#07d2c6");
            dataBeselected[a] = true; // to tell the system the data is unselected
            addColorLabel(a);
            if (htmap_mode == true) {
                $(".htmap_rect").remove();
                htmapChange();
            } else {
                if (displaymode == "pts") {
                    createpts(a);
                } else if (displaymode == "img") {
                    createimg(a, e);
                }
            }

            $(this).one("click", notBeSelected);
        } else {
            $(this).one("click", beSelected);
            if ($("#popup").css("display") !== "none") { //popup animation
                $("#popup").effect("bounce", {
                    distance: 20,
                    times: 3,
                    direction: "left"
                }, 300);
                popupCU(e, message);
            } else {
                popupCU(e, message);
            }
        }
    };

    function notBeSelected(e) {
        $(this).css("background", "transparent");
        var a = $(this).attr("value");
        dataBeselected[a] = false; // to tell the system the data is unselected
        removeColorLabel(a);
        if (htmap_mode == true) {
            $(".htmap_rect").remove();
            htmapChange();
        } else {
            if (displaymode == "pts") {
                removepts(a);
            } else if (displaymode == "img") {
                removeimg(a);
            }
        }

        $(this).one("click", beSelected);
    }


    sbt.one("click", beSelected);
    /*************************************************************

    Append Color label textbox

    **************************************************************/

    var appendLabel = d3.select("#svg-wrapper")
        .append("div")
        .attr("id", "colorlabel");

    function addColorLabel(dataNumber) {
        var dA = dataNumber;
        if ($("#colorlabel").css("display") == "none") {
            $("#colorlabel").fadeIn({
                duration: 500,
                queue: false
            });
        }
        $("#colorlabel").animate({
            height: "+=23px"
        }, {
            duration: 300,
            queue: false
        });
        appendLabel
            .append("p")
            .attr("class", "colorlabelpts " + dataObject[dA].addclass)
            .append("svg")
            .attr({
                id: "ptssvg",
                width: "8",
                height: "8",
                viewBox: "0 0 8 8",
                version: "1.1"
            })
            .append("circle").attr({
                r: 4,
                cx: 4,
                cy: 4
            })
            .style("fill", dataObject[dA].color);
        appendLabel.select(".colorlabelpts." + dataObject[dA].addclass).append("a").text(dataObject[dA].filename);
        appendLabel.append("br").attr("class", "br" + dataObject[dA].addclass);

    }

    function removeColorLabel(dataNumber) {
        var dR = dataNumber;
        if (dataObject[dR]["ds"].length !== 0) {
            $("#colorlabel").animate({
                height: "-=23px"
            }, {
                duration: 150,
                queue: false
            });
            $(".colorlabelpts." + dataObject[dR].addclass).remove();
            $(".br" + dataObject[dR].addclass).remove();
            if (!$('#colorlabel').html()) {
                $("#colorlabel").fadeOut(300);
                $("#clearbtn").fadeOut(300);
            };
        } else {

        }
    }

    /*************************************************************

    change scale function

    **************************************************************/


    ///////////////////////////////////////
    //                                   //
    //     create scale change btn       //
    //                                   //
    ///////////////////////////////////////

    var typelistMatch = {
        "Linear": "linear",
        "Log 2": "log2",
        "Log 10": "log10"
    };

    var axistypeX = d3.select("#svg-wrapper")
        .append("div")
        .attr("class", "axistype-wrapper xaxis");
    var axistypeY = d3.select("#svg-wrapper")
        .append("div")
        .attr("class", "axistype-wrapper yaxis");

    $(".axistype-wrapper")
        .append("<div class='axistype'>")
        .append("<ul class='axistype_ul'>");

    $(".axistype")
        .append("<div class='axislabel'>")
        .append("<div class='axistypeT'>");
    $(".axistypeT").text("Linear");

    $(".xaxis .axislabel").text("X");
    $(".yaxis .axislabel").text("Y");

    $(".axistype_ul")
        .append("<li class='typelist1'>")
        .append("<li class='typelist2'>");
    $(".typelist1").text("Log 2");
    $(".typelist2").text("Log 10");

    $(".xaxis .typelist1,.xaxis .typelist2").on("click", function (e) {

        //first store the value of selected and present scaletype
        var selected = $(this).text();
        var orig = $(".xaxis .axistypeT").text();

        // then reverse two of them
        $(this).text(orig);
        $(".xaxis .axistypeT").fadeOut(200, function () {
            $(".xaxis .axistypeT").text(selected).fadeIn(150);
        })


        //change the global scaletyple x value
        xscaletype = typelistMatch[selected];

        //change the ds in dataObject
        dataInput(xfactor, yfactor);

        //remove the stored domain for the htmap 
        zoomStore.x = [];
        zoomStore.y = [];

        // remove all pts and ptsImg
        $(".pts").remove();
        $(".ptsImg").remove();

        // activate the main function to change the X y scale, Axis ,zoom
        scalechange();
        svgchange(xAxisTag, yAxisTag);
        indexChange();
        if (htmap_mode == true) {
            $(".htmap_rect").remove();
            htmapChange();
        } else {
            // create pts or ptsImg again for the selected dataset (depend on display mode )
            if (displaymode == "pts") {
                // select the dataset that is selected
                for (var z = 0; z < 5; z++) {
                    if (dataBeselected[z] == true) {
                        createpts(z, e);
                    } else {
                        continue;
                    }
                }
            } else if (displaymode == "img") {
                // select the dataset that is selected
                for (var z = 0; z < 5; z++) {
                    if (dataBeselected[z] == true) {
                        createimg(z, e);
                    } else {
                        continue;
                    }
                }
            }
        }
    });

    $(".yaxis .typelist1,.yaxis .typelist2").on("click", function (e) {

        //first store the value of selected and present scaletype
        var selected = $(this).text();
        var orig = $(".yaxis .axistypeT").text();

        // then reverse two of them
        $(this).text(orig);
        $(".yaxis .axistypeT").fadeOut(200, function () {
            $(".yaxis .axistypeT").text(selected).fadeIn(150);
        })

        //change the global scaletyple x value
        yscaletype = typelistMatch[selected];

        //change the ds in dataObject
        dataInput(xfactor, yfactor);

        //remove the stored domain for the htmap 
        zoomStore.x = [];
        zoomStore.y = [];

        // remove all pts and ptsImg
        $(".pts").remove();
        $(".ptsImg").remove();

        // activate the main function to change the X y scale, Axis ,zoom
        scalechange();
        svgchange(xAxisTag, yAxisTag);
        indexChange();
        if (htmap_mode == true) {
            $(".htmap_rect").remove();
            htmapChange();
        } else {
            // create pts or ptsImg again for the selected dataset (depend on display mode )
            if (displaymode == "pts") {
                // select the dataset that is selected
                for (var z = 0; z < 5; z++) {
                    if (dataBeselected[z] == true) {
                        createpts(z, e);
                    } else {
                        continue;
                    }
                }
            } else if (displaymode == "img") {
                // select the dataset that is selected
                for (var z = 0; z < 5; z++) {
                    if (dataBeselected[z] == true) {
                        createimg(z, e);
                    } else {
                        continue;
                    }
                }
            }
        }
    });





    /*************************************************************

    add tooltip box

    **************************************************************/

    //    $("#svg-wrapper").append("<div id='textbox'>");
    //    $("#textbox").append("<div id ='textboximg'>")
    //    $("#textbox").append("<div class='textboxA'>");
    //    $("#textbox").append("<div class='textboxB'>");


    /*************************************************************

    change svg size, scale ,asix, pts position when window is resized

    **************************************************************/

    $(window).on("resize", resizeSvg);

    function resizeSvg() {

        if (htmap_mode == false) {

            cwidth = c_width();
            cheight = c_height();
            width = cwidth - margin.left - margin.right;
            height = cheight - margin.top - margin.bottom;

            scalechange();
            svgchange(xAxisTag, yAxisTag);
            zooming();
            if (zoomRect == true) {
                $("#svg-wrapper").css("width", c_width());
                $("#his-wrapper").css("width", c_width());
                $("#reset").css("right", (20 + c_width()) + "px");
                $("#htmapBtn").css("right", (20 + c_width()) + "px");
                $("#clearbtn").css("right", (20 + c_width()) + "px");
                $("#colorlabel").css("right", (20 + c_width()) + "px");

                // resize each div contain svg
                var hisWidth = (c_width() - 35) / 2;
                $(".his_div").css("width", hisWidth);
                $(".his_div").css("height", hisHeight());
            }

        } else if (htmap_mode == true) {

            $(".htmap_rect").remove();
            cwidth = c_width();
            cheight = c_height();
            width = cwidth - margin.left - margin.right;
            height = cheight - margin.top - margin.bottom;

            xScale.range([0, width]);
            yScale.range([height, 0]);

            xAxis
                .scale(xScale)
                .ticks(40)
                .tickSize(-height);
            yAxis
                .scale(yScale)
                .ticks(35)
                .tickSize(-width);

            svg.select(".x_axis").call(xAxis);
            svg.select(".y_axis").call(yAxis);
            svgchange(xAxisTag, yAxisTag);
            htmapChange();


        }

    }

    /*************************************************************

    binding click function to #inputBtn after create svg

    **************************************************************/

    $("#inputBtn").on("click", reloadaxis);

    // reload the default axis setting with changed x y variable
    function reloadaxis(e) {

        cwidth = c_width();
        cheight = c_height();
        width = cwidth - margin.left - margin.right;
        height = cheight - margin.top - margin.bottom;

        //change stored x y variable        
        xfactor = xfactor_temp;
        yfactor = yfactor_temp;
        xAxisTag = xAxisTag_temp;
        yAxisTag = yAxisTag_temp;

        //Input data to dataObject again with changed xfactor yfactor
        dataInput(xfactor, yfactor);

        //change the zoom,scale and axis
        scalechange();
        svgchange(xAxisTag, yAxisTag);

        indexChange();

        //remove the stored domain for the htmap 
        zoomStore.x = [];
        zoomStore.y = [];
        $(".pts").remove();
        $(".ptsImg").remove();

        // create pts or ptsImg again for the selected dataset (depend on display mode )
        if (htmap_mode == true) {
            $(".htmap_rect").remove();
            htmapChange();
        } else {
            if (displaymode == "pts") {
                // select the dataset that is selected
                for (var z = 0; z < 5; z++) {
                    if (dataBeselected[z] == true) {
                        createpts(z, e);
                    } else {
                        continue;
                    }
                }
            } else if (displaymode == "img") {
                // select the dataset that is selected
                for (var z = 0; z < 5; z++) {
                    if (dataBeselected[z] == true) {
                        createimg(z, e);
                    } else {
                        continue;
                    }
                }
            }
        }



    }

    /*************************************************************

    creat heat map function 

    **************************************************************/

    function selectedDataset() {
        var ay = [];
        for (var z = 0; z < 5; z++) {
            if (dataBeselected[z] == true) {
                for (var i = 0; i < dataObject[z]["ds"].length; i++) {
                    ay.push(dataObject[z]["ds"][i]);
                }
            } else {
                continue;
            }
        }
        return ay;
    }


    ///////////////////////////////////////
    //                                   //
    //        Create a color legend      //
    //                                   //
    ///////////////////////////////////////

    //    var colors = ["transparent", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"];
    var colors = ["transparent", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"];

    $("#svg-wrapper").append("<div id='htmap_label'>");



    d3.select("#htmap_label").append("svg")
        .attr("id", "labelsvg")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
        .attr("width", 8 * 30 + "px")
        .attr("height", "22px");

    d3.select("#labelsvg")
        .selectAll(".labelrect")
        .data(colors)
        .enter()
        .append("rect")
        .attr("height", "12px")
        .attr("width", "30px")
        .attr("x", function (d, i) {
            return 30 * i;
        })
        .attr("y", 0)
        .style("fill", function (d, i) {
            return d;
        });



    $("#htmap_label").on("mouseenter", function () {
        $(this).css({
            "opacity": 0.4,
        });
    });

    $("#htmap_label").on("mouseleave", function () {
        $(this).css({
            "opacity": 1,
        });
    });

    var htmap_mode = false;

    //create an heatmap mode swapping btn
    $("#svg-wrapper")
        .append("<img id='htmapBtn'>");
    $("#htmapBtn").attr("src", "icon/heatmap.png")
    $("#htmapBtn").on("click", heatmapMode);


    function htmapChange() { // change scale and axis when htmap mode is used
        $(".pts,.ptsImg").remove();
        $("#colorlabel").hide();
        cwidth = c_width();
        cheight = c_height();
        width = cwidth - margin.left - margin.right;
        height = cheight - margin.top - margin.bottom;

        xScale.range([0, width]);
        yScale.range([height, 0]);

        xAxis
            .scale(xScale)
            .ticks(40)
            .tickSize(-height);
        yAxis
            .scale(yScale)
            .ticks(35)
            .tickSize(-width);

        svg.select(".x_axis").call(xAxis);
        svg.select(".y_axis").call(yAxis);
        createHtRect(width, height);
    }





    function checkdata() { // any data the is selected
        var a = false;
        for (var z = 0; z < 5; z++) {
            if (dataBeselected[z] == true) {
                a = true;
            } else {
                continue;
            }
        }
        return a;
    }


    function heatmapMode(e) { //toggle heatmap mode

        if (checkdata() == false) {
            popupCU(e, "Plase select data");
        } else if (checkdata() == true) {
            if (htmap_mode == true) {
                $("#ptsCount").show();
                //recall zoom function
                svg.on("mousedown", null);
                svg.call(zoom);
                svg.on("mousedown", getDomain_his)

                $("#htmap_label").fadeOut(150);
                $("#colorlabel").fadeIn(150);
                $(".x_axis > g > text").show();
                htmap_mode = false;

                //remove the stored domain for the htmap 
                zoomStore.x = [];
                zoomStore.y = [];


                cwidth = c_width();
                cheight = c_height();
                width = cwidth - margin.left - margin.right;
                height = cheight - margin.top - margin.bottom;

                //

                xAxis
                    .ticks(13)
                    .tickSize(-height);

                yAxis
                    .ticks(7)
                    .tickSize(-width);


                svg.select(".x_axis").call(xAxis);
                svg.select(".y_axis").call(yAxis);

                $(".htmap_rect").remove();
                if (displaymode == "pts") {
                    for (var z = 0; z < 5; z++) {
                        if (dataBeselected[z] == true) {
                            createpts(z);
                        } else {
                            continue;
                        }
                    }
                } else if (displaymode == "img") {
                    for (var z = 0; z < 5; z++) {
                        if (dataBeselected[z] == true) {
                            createimg(z, e);
                        } else {
                            continue;
                        }
                    }
                }

                zooming();
            } else if (htmap_mode == false) {
                htmap_mode = true;
                svg.on("mousedown.zoom", null);
                svg.on("mousedown", htmapzoom);
                // show color legend
                $("#htmap_label").fadeIn(700);
                $("#ptsCount").hide();
                // create rect
                htmapChange();
            }
        }


        function htmapzoom() {
            cwidth = c_width();
            cheight = c_height();
            width = cwidth - margin.left - margin.right;
            height = cheight - margin.top - margin.bottom;

            var e = this,
                origin = d3.mouse(e),
                rect = svg.append("rect").attr("class", "htmap_zoom");
            d3.select("body").classed("noselect", true);
            d3.select(e).on("mousemove", function () {
                var m = d3.mouse(e);
                rect.attr("x", d3.min([origin[0], m[0]]))
                    .attr("y", d3.min([origin[1], m[1]]))
                    .attr("width", Math.abs(origin[0] - m[0]))
                    .attr("height", Math.abs(origin[1] - m[1]));
            })
            d3.select(e).on("mouseup", function () {
                d3.selectAll(".htmap_zoom").remove();
                d3.select("body").classed("noselect", false);
                d3.select(e).on("mousemove", null);
                var m = d3.mouse(e);
                d3.select(e).on("mouseup", null);

                if (origin[0] !== m[0] || origin[1] !== m[1]) {
                    //store the zoom domain 
                    zoomStore.x.push(xScale.domain());
                    zoomStore.y.push(yScale.domain());

                    // then change the scale 
                    xScale.domain([d3.min([xScale.invert(m[0]), xScale.invert(origin[0])]), d3.max([xScale.invert(m[0]), xScale.invert(origin[0])])]).range([0, width]);
                    yScale.domain([d3.min([yScale.invert(m[1]), yScale.invert(origin[1])]), d3.max([yScale.invert(m[1]), yScale.invert(origin[1])])]).range([height, 0]);
                    zoom
                        .x(xScale)
                        .y(yScale);

                    $(".htmap_rect").remove();
                    htmap_zooming();
                    createHtRect(width, height);
                };

            });
            indexChange();
            d3.event.stopPropagation();
        }
        //        htmap_gp;
    }

    function createHtRect(w, h) { //width,height

        //hide the axis label which %2
        $(".x_axis > g > text").show();
        for (var z = 0; z < $(".x_axis > g").length; z++) {
            if ((z % 2) !== 0) {
                continue;
            } else {
                $(".x_axis > g > text:eq(" + z + ")").hide();
            }
        }

        indexChange();


        // create an Array to store all Data;
        var all_rect_data = [];
        // get the x,y,width and height for each rect
        //        var all_Xtransform = ["0"];
        //        var all_Ytransform = [h];
        var all_Xtransform = [];
        var all_Ytransform = [];
        var all_Xtransform_half = [];
        var transformValueX = [];
        var transformValueY = [];
        for (var z = 0; z < $(".x_axis > .tick").length; z++) {
            transformValueX.push($(".x_axis > .tick:eq(" + z + ")").attr("transform"));
            all_Xtransform.push(transformValueX[z].slice(transformValueX[z].indexOf("(") + 1, transformValueX[z].indexOf(",")));
        }

        for (var z = 0; z < $(".y_axis > .tick").length; z++) {
            transformValueY.push($(".y_axis > .tick:eq(" + z + ")").attr("transform"));
            all_Ytransform.push(transformValueY[z].slice(transformValueY[z].indexOf(",") + 1, transformValueY[z].indexOf(")")));
        }

        for (var z = 0; z < all_Xtransform.length; z++) {
            all_Xtransform[z] = Number(all_Xtransform[z]);
        }

        for (var z = 0; z < all_Ytransform.length; z++) {
            all_Ytransform[z] = Number(all_Ytransform[z]);
        }
        for (var z = 0; z < all_Xtransform.length - 1; z++) {
            all_Xtransform_half.push(all_Xtransform[z]);
            all_Xtransform_half.push(all_Xtransform[z] + ((all_Xtransform[z + 1] - all_Xtransform[z]) * (1 / 4)));
            all_Xtransform_half.push(all_Xtransform[z] + ((all_Xtransform[z + 1] - all_Xtransform[z]) * (2 / 4)));
            all_Xtransform_half.push(all_Xtransform[z] + ((all_Xtransform[z + 1] - all_Xtransform[z]) * (3 / 4)));
        }
        all_Xtransform_half.push(all_Xtransform[(all_Xtransform.length - 1)]);


        //determine the x y domain repersented by each rect

        // extract the text label of each tick pts and change it to Nmuber
        function findXRange() {
            var labels = [];
            var range = [];
            var quatervalue;
            for (var z = 0; z < xaxistextStore.length; z++) {
                var number = xaxistextStore[z];
                labels.push(number);;
            };
            quatervalue = Math.abs((labels[0] - labels[1]) / 4);

            for (var z = 0; z < labels.length - 1; z++) {
                range.push([labels[z], labels[z] + quatervalue]);
                range.push([labels[z] + quatervalue, labels[z] + 2 * quatervalue]);
                range.push([labels[z] + 2 * quatervalue, labels[z] + 3 * quatervalue]);
                range.push([labels[z] + 3 * quatervalue, labels[z + 1]]);
            }
            return range;
        }

        function findYRange() {
            var labels = [];
            var range = [];
            for (var z = 0; z < yaxistextStore.length; z++) {
                var number = yaxistextStore[z];
                labels.push(number);;
            };
            for (var z = 0; z < labels.length - 1; z++) {
                range.push([labels[z], labels[z + 1]]);
            }
            return range;
        }




        function createObj(width, height, x, y, count, column, row, range) {
            var obj = new Object();
            obj.width = width;
            obj.height = height;
            obj.x = x;
            obj.y = y;
            obj.count = count;
            obj.column = column;
            obj.row = row;
            obj.range = range;
            return obj;
        }

        var xrangeAll = findXRange();
        var xrangeAll = findXRange();
        var yrangeAll = findYRange();

        //the x and y range for each rect starts form left bottom conner


        function AllDataCreate() {

            for (var z = 0; z < all_Xtransform_half.length - 1; z++) {
                for (var i = 0; i < all_Ytransform.length - 1; i++) {
                    var x = all_Xtransform_half[z];
                    var y = all_Ytransform[i + 1];
                    var width = all_Xtransform_half[z + 1] - all_Xtransform_half[z];
                    var height = all_Ytransform[i] - all_Ytransform[i + 1];
                    var count = 0;
                    var column = z; //x number
                    var row = i; //y number
                    var range = [xrangeAll[z], yrangeAll[i]]; // range[0] = x range ; range[1] = y range
                    all_rect_data.push(createObj(width, height, x, y, count, column, row, range));
                }
            }
        }

        AllDataCreate();

        var lalala = selectedDataset();


        function countRect() {
            for (var z = 0; z < lalala.length; z++) {
                for (var i = 0; i < all_rect_data.length; i++) {
                    if (lalala[z][0] > all_rect_data[i]["range"][0][0] && lalala[z][0] < all_rect_data[i]["range"][0][1]) {
                        if (lalala[z][1] > all_rect_data[i]["range"][1][0] && lalala[z][1] < all_rect_data[i]["range"][1][1]) {
                            all_rect_data[i]["count"] += 1;
                        } else {
                            continue;
                        }
                    } else {
                        continue;
                    }
                }
            }
        }

        countRect();

        function maxCount() {
            var a = [];
            for (var z = 0; z < all_rect_data.length; z++) {
                a.push(all_rect_data[z]["count"]);
            }
            var max = d3.max(a);
            return max;
        }

        function recttipBox(obj, d, i) {

            var a = d3.select(obj).attr("class");
            var toplength = document.getElementsByClassName(a)[0].getBoundingClientRect().top;
            var rightlength = document.getElementsByClassName(a)[0].getBoundingClientRect().right;
            var leftlength = document.getElementsByClassName(a)[0].getBoundingClientRect().left;
            var content = "";
            (function () {
                content += "<div class='textboxA'>X Range<br/>Y range<br/>Count<br/></div>";
                content += "<div class='textboxB'>[" + d["range"][0][0] + "," + d["range"][0][1] + "]<br />[" + d["range"][1][0] + "," + d["range"][1][1] + "]<br/>" + d["count"] + "<br/><div>";
            })();
            $(".recttip_box").html(content);
            var boxwidth = $(".recttip_box").outerWidth(),
                boxheight = $(".recttip_box").outerHeight(),
                remainwidth = window.innerWidth - rightlength,
                remainheigth = window.innerHeight - toplength;
            if (remainwidth < boxwidth * 1.2) {
                $(".recttip_box").css("top", toplength + "px");
                $(".recttip_box").css("left", (leftlength - boxwidth - 4) + "px");
            } else {
                $(".recttip_box").css("top", toplength + "px");
                $(".recttip_box").css("left", (rightlength + 4) + "px");
            }
            $(".recttip_box").show();

        };

        function hiderecttipBox() {
            $(".recttip_box").hide();
        }

        var colorScale = d3.scale.quantile()
            .domain([0, 1, maxCount() * (2 / 9), maxCount() * (4 / 9), maxCount() * (6 / 9), maxCount()])
            .range(colors);

        //chage the label number in the color legend
        $("#labelsvg > text").remove();
        d3.select("#labelsvg")
            .selectAll("text")
            .data(colors)
            .enter()
            .append("text")
            .attr("transform", function (d, i) {
                return "translate(" + 30 * i + ",22)";
            })
            .style("fill", "#fff")
            .text(function (d, i) {
                if (colorScale.invertExtent(d)[0] == 0) {
                    return "0";
                } else {
                    return "<" + Math.round(colorScale.invertExtent(d)[0]);
                }
            });

        htmap_gp.selectAll(".htmap_rect")
            .data(all_rect_data)
            .enter()
            .append("rect")
            .attr("class", function (d, i) {
                return "htmap_rect c" + d["column"] + "r" + d["row"];
            })
            .attr("x", function (d, i) {
                return d["x"];
            })
            .attr("y", function (d, i) {
                return d["y"];
            })
            .attr("width", function (d, i) {
                return d["width"];
            })
            .attr("height", function (d, i) {
                return d["height"];
            })
            .style("fill", function (d, i) {
                return colorScale(d["count"]);
            })
            .on("mouseenter", function (d, i) {
                recttipBox(this, d, i);
            })
            .on("mouseleave", hiderecttipBox)

    }

}


$("#download").on("click", function (e) {
    $("#downloadPNGOption").show();
    e.stopPropagation();
});
for (var z = 0; z < 2; z++) {
    $("#downloadPNGOption > li").eq(z).css("animation", "fade .3s cubic-bezier(0,1.13,.74,.97) " + z * 15 + "ms forwards");

}



$("#downloadPNGOption > li").on("click", function (e) {
    var a = $(this).attr("value");
    if (a == "scatter") {
        svgCut();
    } else if (a == "his") {
        if (zoomRect == true && $("#allHisSvgHolder").length != 0) {

            hisCut();
        } else {
            popupCU(e, "No Histogram shown");
        }
    }
})

function downloadPNG(imgsrc, canvas, context, dm) {
    var image = new Image;
    image.src = imgsrc;
    image.onload = function () {
        context.drawImage(image, 0, 0);

        var canvasdata = canvas.toDataURL("image/png");
        var a = document.createElement("a");
        a.download = dm;
        a.href = canvasdata;
        a.click();
    };
}

function svgCut() {

    var A = $("#svgholder").clone();

    A.find("#cutImgRect").css("fill", "#232f39");

    A.find("#mainSvg").css({
        "font": "9px sans-serif",
        "shape-rendering": "geometricPrecision"
    })
    A.find(".x_axis line,.x_axis path,.y_axis line,.y_axis path").css({
        fill: "none",
        stroke: "#405465"
    })
    A.find(".x_axis text,.y_axis text").css({
        fill: "#fff"
    })
    var html = A.html();

    var imgsrc = 'data:image/svg+xml;base64,' + btoa(html);

    var canvas = document.getElementById("scatter_canvas"),
        context = canvas.getContext("2d");
    //

    var dm = yAxisTag + "_" + xAxisTag + "_scatter.png";

    downloadPNG(imgsrc, canvas, context, dm);
};



function hisCut() {

    var get = $("#his-wrapper").clone();

    get.find("line ,path").css({
        fill: "none",
        stroke: "#405465"
    })


    get.find("svg text").css({
        "font": "9px sans-serif",
        "font-weight": "300",
        "fill": "#fff",
        "font-size": "9px"
    })

    get.find("#allHisSvgHolder").css({
        "font": "9px sans-serif",
        "fill": "#fff",
        "font-weight": "300",
        "font-size": "9px"

    })


    get.find(".hisLabel").css({
        "font-size": "15px"
    })

    get.find(".his_background,#allHisSvgHolderBackground").css({
        "fill": "#232f39"
    });

    var html = get.html();
    //


    var imgsrc = 'data:image/svg+xml;base64,' + btoa(html);

    var canvas = document.getElementById("his_canvas"),
        context = canvas.getContext("2d");

    var dt = new Date();
    var time = ("0" + dt.getDate()).slice(-2) + "" + ("0" + (dt.getMonth() + 1)).slice(-2) + "" + dt.getFullYear();

    var dm = yAxisTag + "_" + xAxisTag + "_" + time + "_histogram.png";


    downloadPNG(imgsrc, canvas, context, dm);

}


var findDomain = function (xScale, yScale) {
    var d = new Domain();
    d.xDomain = xScale.domain();
    d.yDomain = yScale.domain();
    return d;
}


var imgPreload = function (filename, datasetNumber, z) {
    if (z >= dataObject[datasetNumber].allData.length) return;
    var url = "image/" + filename + "/" + dataObject[datasetNumber].allData[z].Bin_ID + "_" + dataObject[datasetNumber].allData[z].Cell_ID + ".jpg";
    var img = new Image();
    img.src = url;
    if (img.complete) {

        return;
    };
    img.onload = imgPreload(filename, datasetNumber, z + 1);
    img.onerror = function () {
        return;
    }
    return;
}
