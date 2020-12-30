function displayDemographicData(){
    
    d3.json("/data/samples.json").then((data) => {
            console.log(data);
        
        var metaData = data.metadata[0];
            console.log(metaData);
        
        // var metaDataID = metaData.map(item => item.id);
        //     console.log(metaDataID);    

        var results = d3.select("#sample-metadata");

        Object.entries(metaData).forEach(([key, value]) => {
            results.append("p").text(`${key}:${value}`);
           
        

        });
    });
}

function init(){
        d3.json("samples.json").then((data) => {
            console.log(data);

            var metaDataID = data.metadata.map(item => item.id);
            console.log(metaDataID);

            DropDownMenu();

            buildPlot();

            displayDemographicData();
        });
    }

function DropDownMenu() {
    d3.json("/data/samples.json").then((data) => {
        console.log(data);

    var metaDataID = data.metadata;

    var metaDataIDs = metaDataID.map(item => item.id);
        console.log(metaDataIDs); 
    
    var results = d3.select("#selDataset");

    Object.entries(metaDataIDs).forEach(([key,value]) => {
        results.append("option").text(`${value}`);

    });
});

}


 function buildPlot(){

    d3.json("/data/samples.json").then((data) => {
        samples = data.samples;
        console.log(samples);
           
        var otu_ids = samples[0].otu_ids.slice(0,10).reverse().map(id => id);
                      console.log(otu_ids);

        var sample_values = samples[0].sample_values.slice(0,10).reverse();
                            console.log(sample_values);
        
        var otu_labels = samples[0].otu_labels.slice(0,10).reverse();
                         console.log(otu_labels);


          //*******************************
          //*********** BAR CHART *********
          //*******************************
        var barchart = {
            x: sample_values,
            y: otu_ids.map(otu_ids => `OTU ${otu_ids}`),
            text: otu_labels,
            type: "bar",
            orientation: "h",
            marker: {
                color: 'rgb(142,124,195)'
              }
          };
        
          var data = [barchart];

          var layout = {
            title: "Belly Button Bacteria Top 10 OTUs",
            margin: {
              l: 100,
              r: 100,
              t: 120,
              b: 50
            },
            xaxis: {title:"Sample Values"},
          };

          Plotly.newPlot("bar", data, layout);



          //*******************************
          //*********** BUBBLE CHART ******
          //*******************************
          var bubblechart = {
            x: otu_ids.map(otu_ids => `OTU ${otu_ids}`),
            y: sample_values,
            text: otu_labels,
            type: "scatter",
            mode: 'markers',
            marker: {
                    size: sample_values,
                    color: otu_ids, 
                    colorscale: "Earth"              
            }
          };
        
          var data = [bubblechart];

          var layout = {
            title: "Belly Button Bacteria Bubble Chart",
            margin: {
                l: 100,
                r: 100,
                t: 120,
                b: 50
              },
            xaxis: {title:"OTU ID"},
            yaxis: {title:"Sample Values"},
          };

          Plotly.newPlot("bubble", data, layout);
    });

 }

// function optionChanged(blah){
//     buildPlot(blah);
// //    displayDemographicData(blah);
// }

init();

