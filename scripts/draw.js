/**
 * Created by anike on 4/17/2017.
 */

    //function for world map
var WorldMap = function(a, world,data,meta_data, D1)
{

    var width  = 1200;var height = 700;
    var svg = d3.select("body").append("svg").attr("width", width).attr("height", height).attr("class","first");
    var projection = d3.geo.mercator().scale(170).translate([width/2 - 100 ,height/2 + 40]);
    var p = d3.geo.path().projection(projection);
    var  color = d3.scale.linear().domain([50,100]).range(["rgb(179, 230, 255)", "rgb(0,68,102)"]).interpolate(d3.interpolateHcl);



    var k = "Data"+" "+"Source";
    var k2 = "";var k1 = data[3];
    var data_array = [] ;       // 2015 data
    data.forEach(function a(a){
        var d1   = a[k];             // country name
        var d2 = a[k2];             // value
        data_array[d1] = d2;});



    world.features.forEach(function(d){

        var jsonstate = d.properties.NAME;
        //console.log(jsonstate);
        // geting the trip data

        var data1 = data_array[jsonstate];

        if (data1 == undefined)
        {
            d.properties.value = 50;
        }
        else
        {
            d.properties.value = data1;
        }
    });



    world.features.forEach(function(d){
        var jsonstate = d.properties.NAME;
        if (jsonstate == "Russia")
        {
            d.properties.value = 97;
        }
    });




    var tip = d3.tip()
        .attr("class","d3-tip")
        .offset([-10,0])
        .html(function(d) {
            return "<strong>Percentage:</strong> <span style='color:red'>Map</span>";
        });

    svg.call(tip);





    svg.selectAll("path")
        .data(world.features)
        .enter()
        .append("path")
        .attr("d",p)
        .style("stroke","black")
        .style("fill",function(d){
            var value = d.properties.value;
            if(value)
            {
                return color(value);
            }
            else
            {
                return "grey";
            }
        })
        .on("mouseover",function(){
            d3.select(this)
                .style("fill","orange")
        })
        .on("mouseout",function(){
            d3.select(this)
                .style("fill",function(d){

                    var value = d.properties.value;
                    if(value)
                    {
                        return color(value);
                    }
                    else
                    {
                        return "grey";
                    }


                });
        })

        ;










    //legends
    var l_size = 150, numLevels = 150;

    var legend = svg.append("g")
        .attr("class","legends");


    var levels = legend.selectAll("levels")
        .data(d3.range(numLevels))
        .enter().append("rect")
        .attr("y", height - 180)
        .attr("x" ,function(d){
            return width - l_size - 400 + d* l_size / numLevels;})
        .attr("width",l_size/l_size )
        .attr("height", 40)
        .style("stroke","none");

    levels.style("fill",function(d){
        return color(50 * (l_size -d)/ l_size + 100 * d / l_size);
    });


    legend.append("text")
        .attr("x", width - l_size - 400)
        .attr("y", height - 125)
        .attr("text-anchor", "middle")
        .text("50");

    legend.append("text")
        .attr("x", width - 400 )
        .attr("y", height - 125)
        .attr("text-anchor", "middle")
        .text("100");

    legend.append("text")
        .attr("x", width - 470 )
        .attr("y", height - 185)
        .attr("text-anchor", "middle")
        .text("2015 Improve Water Source %");

    //end of legends





};

