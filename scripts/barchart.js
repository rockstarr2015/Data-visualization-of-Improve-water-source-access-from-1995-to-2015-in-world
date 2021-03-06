/**
 * Created by anike on 4/17/2017.
 */

    var Barchart = function(a,world,data,meta_data,D1)
{

    var spacing = d3.select("body")
        .append("svg")
        .attr("width", 1100)
        .attr("height", 100)
        .attr("class","first");

    spacing.append("text")
        .attr("x",470)
        .attr("y",70)
        .style("text-anchor","middle")
        .text(" 2)Bar chart for top 25 countries for percentage of water resource ")
        .attr("font-size","30px").attr("font-weight","bold")
        .attr("font-family","sans-serif");


    var container = d3.select("body").append("svg").attr("width", 1500).attr("height", 800).attr("class","first");

    var margin = {left:15,right:10,top:10,bottom:10};

    var width1 = 1500 - margin.left -margin.right;

    var height1 = 800 - margin.top - margin.bottom;

    var padding = margin.left +60;

    var barpadding = margin.left + 1 +70;

    var h = 800;

    var w = 1500;

    var padding1 = h ;

    var scale = d3.scale.linear()
        .domain([0,100])
        .range([height1 -100 ,50]);

    var Y_axis = d3.svg.axis().scale(scale).orient("left");

    var Y = container.append("g")
        .attr("class","Yaxis")
        .attr("transform","translate( "+padding+" , -8)")
        .call(Y_axis);

    var Differname =[]; var Differvalue = [];

    D1.forEach(function b(a){
        var n = "Country"+" "+"Name";
        var name = a[n];//country names

        var data_2015 = a[2015];
        var data_1995 = a[1995];
        var diff = data_2015 - data_1995;

        var count ={};
        meta_data.forEach(function b (c){
            var n2 = "Country"+" "+"Name";
            var country_name = c[n2];
            var key = "IncomeGroup";
            var Inc = c[key];
            if(country_name == name )
            {count = {name:name,value:diff, group:Inc};
                Differname.push(count);
            }
        });
    });

    Differname.sort(function(obj1,obj2){
        return obj2.value - obj1.value;
    });

    var k4 = Differname.splice(0,25);  //taking top 25 countries for ploting .


    var tip = d3.tip()
        .attr("class","d3-tip")
        .offset([-10,0])
        .html(function(d) {
            return "<strong>Percentage:</strong> <span style='color:red'>" + d.value.toFixed(2) + "</span>";
        });

    container.call(tip);


    container.selectAll("rect").data(k4).enter().append("rect").attr("class","Barchart1")
        .attr("x",function(d,i){return i* 48}).attr("y",function(d){
            var value = d.value;
            return 632- value *6.3;
        })
        .attr("width",40)
        .attr("height",function(d){
            var value = d.value ;
            return value *6.3;
        })
        .attr("fill",function(d){
            var group = d.group;
            if(group == "Upper middle income") {return "#000066";}
            if(group == "High income: nonOECD") {return "#4d4dff";}
            if(group == "Lower middle income") {return "#8080ff";}
            if(group == "Low income") {return "#ccccff";}})
        .on("mouseover",function(){
            d3.select(this)
                .attr("fill","orange");
        })
        .on("mouseout",function(){
            d3.select(this)
                .attr("fill",function(d){
                    var group = d.group;
                    if(group == "Upper middle income") {return "#000066";}
                    if(group == "High income: nonOECD") {return "#4d4dff";}
                    if(group == "Lower middle income") {return "#8080ff";}
                    if(group == "Low income") {return "#ccccff";}})
        })
        .on("mouseover",tip.show)
        .on("mouseout",tip.hide)
        .attr("transform","translate("+ barpadding+",40)");



    var legend = container.append("g").attr("class","legends");
    legend.append("rect").attr("x", 1000).attr("y", 128).attr("width", 40).attr("height", 40).style("fill", "#000066");
    legend.append("rect").attr("x", 1040).attr("y", 128).attr("width", 40).attr("height", 40).style("fill", "#4d4dff");
    legend.append("rect").attr("x", 1080).attr("y", 128).attr("width", 40).attr("height", 40).style("fill", "#8080ff");
    legend.append("rect").attr("x", 1120).attr("y", 128).attr("width", 40).attr("height", 40).style("fill", "#ccccff");


    legend.append("text").attr("x",  1100 ).attr("y", 190).attr("text-anchor", "middle").text("Income Level from High to Low ").attr("font-size","25px").attr("font-family","sans-serif");
    legend.append("text").attr("x",  990 ).attr("y", 120).attr("text-anchor", "middle").text("High income").attr("font-size","20px").attr("font-family","sans-serif");
    legend.append("text").attr("x",  1200 ).attr("y", 120).attr("text-anchor", "middle").text("Low income").attr("font-size","20px").attr("font-family","sans-serif");




    container.append("text").attr("x",70).attr("y",200).style("text-anchor","middle").text("Improved water source percentage ").attr("font-size","25px").attr("font-family","sans-serif").attr("transform","translate( -160 , 400)  rotate(270) " );



    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[0].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( -500 , 725)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[1].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( -450 , 740)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[2].name).attr("font-size","17px").attr("font-family","sans-serif").attr("transform","translate( -400 , 735)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[3].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( -350 , 725)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[4].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( -300 , 735)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[5].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( -250 , 720)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[6].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( -200 , 700)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[7].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( -152 , 720)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[8].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( -100 , 720)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[9].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( -50 , 720)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[10].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( -5 , 730)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[11].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( 50 , 720)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[12].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( 80 , 720)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[13].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( 130 , 720)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[14].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( 170 , 720)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[15].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( 220 , 720)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[16].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( 270 , 720)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[17].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( 320 , 720)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[18].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( 370 , 720)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[19].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( 420 , 720)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[20].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( 470 , 720)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[21].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( 520 , 720)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[22].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( 570 , 720)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[23].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( 620 , 720)  rotate(270) " );
    container.append("text").attr("x",0).attr("y",600).style("text-anchor","middle").text(k4[24].name).attr("font-size","18px").attr("font-family","sans-serif").attr("transform","translate( 660 , 720)  rotate(270) " );


    for(var i = 0; i < 10; i ++)
    {
        container.append("line").style("stroke","white").attr("x1", 77).attr("y1", 42 + 63*i).attr("x2", 1300).attr("y2", 42 + 63 *i).style("stroke-dasharray","(13,13)");

    }




    var spacing1 = d3.select("body").append("svg").attr("width", 1100).attr("height", 100).attr("class","first");

    spacing1.append("text").attr("x",470).attr("y",70).style("text-anchor","middle").text(" 3)line graph for global average water resource 1995-2015 trend ").attr("font-size","30px").attr("font-weight","bold").attr("font-family","sans-serif");


    spacing.append("text").attr("x",470).attr("y",70).style("text-anchor","middle").text(" 2)Bar chart for top 25 countries for percentage of water resource ").attr("font-size","30px").attr("font-weight","bold").attr("font-family","sans-serif");



//**********************third  visualization start*************************

    var data2015 = [];var data2014 = [];var data2013 = [];var data2012 = [];var data2011 = [];var data2010 = [];var data2009 = [];var data2008 = [];
    var data2007 = [];var data2006 = [];var data2005 = [];var data2004 = [];var data2003 = [];var data2002 = [];var data2001 = [];var data2000 = [];
    var data1999 = [];var data1998 = [];var data1997 = [];var data1996 = [];var data1995 = [];


    D1.forEach(function a(c){
        data1995.push(c[1995]);data1996.push(c[1996]);data1997.push(c[1997]);
        data1998.push(c[1998]);data1999.push(c[1999]);  data2000.push(c[2000]);
        data2001.push(c[2001]);data2002.push(c[2002]);data2003.push(c[2003]);
        data2004.push(c[2004]); data2005.push(c[2005]);data2006.push(c[2006]);
        data2007.push(c[2007]);data2008.push(c[2008]);data2009.push(c[2009]);
        data2010.push(c[2010]);data2011.push(c[2011]);data2012.push(c[2012]);
        data2013.push(c[2013]);data2014.push(c[2014]);data2015.push(c[2015]);
    });


    function CalAvg (array){
        var total = 0;
        for(var i = 0; i < array.length; i++)
        {total += array[i];}
        var avg = total / array.length;
        return avg;
    }

    var avg_2015 = CalAvg(data2015);var avg_2014 = CalAvg(data2014);var avg_2013 = CalAvg(data2013);var avg_2012 = CalAvg(data2012);var avg_2011 = CalAvg(data2011);var avg_2010 = CalAvg(data2010);var avg_2009 = CalAvg(data2009);var avg_2008 = CalAvg(data2008);var avg_2007 = CalAvg(data2007);var avg_2006 = CalAvg(data2006);
    var avg_2005 = CalAvg(data2005);var avg_2004 = CalAvg(data2004);var avg_2003 = CalAvg(data2003);var avg_2002 = CalAvg(data2002);var avg_2001 = CalAvg(data2001);var avg_2000 = CalAvg(data2000);var avg_1999 = CalAvg(data1999);var avg_1998 = CalAvg(data1998);var avg_1997 = CalAvg(data1997);
    var avg_1995 = CalAvg(data1995);var avg_1996 = CalAvg(data1996);


    var AVG = [];
    AVG.push(avg_1995);AVG.push(avg_1996);AVG.push(avg_1997);
    AVG.push(avg_1998);AVG.push(avg_1999);AVG.push(avg_2000);
    AVG.push(avg_2001);AVG.push(avg_2002);AVG.push(avg_2003);AVG.push(avg_2004);
    AVG.push(avg_2005);AVG.push(avg_2006);AVG.push(avg_2007);AVG.push(avg_2008);
    AVG.push(avg_2009);AVG.push(avg_2010);AVG.push(avg_2011);AVG.push(avg_2012);
    AVG.push(avg_2013);AVG.push(avg_2014);AVG.push(avg_2015);


    var Data2 = [
        {Year:1995,value:AVG[0]}, {Year:1996,value:AVG[1]}, {Year:1997,value:AVG[2]}, {Year:1998,value:AVG[3]},
        {Year:1999,value:AVG[4]}, {Year:2000,value:AVG[5]}, {Year:2001,value:AVG[6]}, {Year:2002,value:AVG[7]},
        {Year:2003,value:AVG[8]}, {Year:2004,value:AVG[9]}, {Year:2005,value:AVG[10]}, {Year:2006,value:AVG[11]},
        {Year:2007,value:AVG[12]}, {Year:2008,value:AVG[13]}, {Year:2009,value:AVG[14]}, {Year:2010,value:AVG[15]},
        {Year:2011,value:AVG[16]}, {Year:2012,value:AVG[17]}, {Year:2013,value:AVG[18]}, {Year:2014,value:AVG[19]},
        {Year:2015,value:AVG[20]}
    ];

    var container2 = d3.select("body").append("svg").attr("width", 1500).attr("height", 800).attr("class","first");
    var margin2 = {left:15,right:10,top:10,bottom:10};
    var width2 = 1500 - margin2.left -margin2.right;
    var height2 = 800 - margin2.top - margin2.bottom;
    var padding2 = margin2.left +60;
    var barpadding2 = margin2.left + 1 +70;
    var h2 = 800;
    var w2 = 1500;
    var padding3 = h2 ;
    var scale2 = d3.scale.linear().domain([0,100]).range([height2 -100 ,50]);
    var Y_axis2 = d3.svg.axis().scale(scale2).orient("left");
    var Y2 = container2.append("g").attr("class","Yaxis").attr("transform","translate( "+padding2+" , -8)")
        .call(Y_axis2);


    var circle1 = container2.selectAll("circle").data(Data2).enter().append("circle")
        .attr("cx", function(d,i){return 106 + i* 48})
        .attr("cy", function(d){var val = d.value.toFixed(2);
            return 673- val * 6.3;})
        .attr("r", 9)
        .style("fill","brown")
        .on("mouseover",function(){
            d3.select(this)
                .style("fill","orange")
        })
        .on("mouseout",function(){
            d3.select(this).style("fill","brown");
        })
        .on("mouseover", tip.show)
        .on("mouseout",tip.hide);



    var linedata = [];

    for(var i = 0; i < Data2.length; i++)
    {
        var k = {x:106 + i * 48, y:672-(Data2[i].value*6.3).toFixed(2)};
        linedata.push(k);
    }

    var line = d3.svg.line().x(function(d){return d.x;}).y(function(d){return d.y;}).interpolate("linear");

    var lineplot = container2.append("path").attr("d",line(linedata)).attr("stroke","brown").attr("stroke-width",2).attr("fill","none");


    container2.append("text").attr("x",70).attr("y",200).style("text-anchor","middle").text("Improved water source percentage ").attr("font-size","25px").attr("font-family","sans-serif").attr("transform","translate( -160 , 400)  rotate(270) " );


    //*******horizontal line************
    for(var i = 0; i < 11; i ++)
    {container2.append("line").style("stroke","grey").attr("x1", 70).attr("y1", 42 + 63*i).attr("x2", 1068).attr("y2", 42 + 63 *i);}

    //*********vertical line*********
    for (var i = 0; i < 21; i ++)
    {container2.append("line").style("stroke","grey").attr("x1", 106 + 48 * i ).attr("y1", 42).attr("x2",106 + 48*i  ).attr("y2", 672);}




    //**********Text data ***********
    for (var i = 0; i < 25; i ++)
    {container2.append("text").attr("x",100+ 48.5*i).attr("y",700).style("text-anchor","middle").text(Data2[i].Year).attr("font-size","18px");}




};
