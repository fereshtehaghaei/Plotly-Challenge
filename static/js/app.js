// Demographic Info Display Card
function demographicInfo(sample){
    
    d3.json("data/samples.json").then((data) => {
            console.log(data);
              
        var metaData = data.metadata;
            console.log(metaData);
        
        var metaDataID = metaData.filter(item => item.id == sample);
            console.log(metaDataID);    

            
        var metaDataSelector = d3.select("#sample-metadata");
        
        metaDataSelector.html(""); 


        Object.entries(metaDataID[0]).forEach(([key, value]) => {
            metaDataSelector.append("p").text(`${key.toUpperCase()} : ${value}`);


        });

        
    });

    
};


// Drop Down Menu for MetaData IDs
function DropDownMenu() {
    d3.json("data/samples.json").then((data) => {
        console.log(data);

    var metaDataID = data.metadata;

    var metaDataIDs = metaDataID.map(item => item.id);
        console.log(metaDataIDs); 
    
    var results = d3.select("#selDataset");

    Object.entries(metaDataIDs).forEach(([key,value]) => {
        results.append("option").text(`${value}`);

    });
});

};

// Building Bar and Bubble Chart
 function buildPlot(sample){

    d3.json("data/samples.json").then((data) => {
        samples = data.samples;
        console.log(samples);

        var result = samples.filter(item => item.id == sample)
           
        var otu_ids = result[0].otu_ids.slice(0,10).reverse();
                      console.log(otu_ids);
        
        var otu_ids = result[0].otu_ids.slice(0,10).reverse();
                      console.log(otu_ids);

        var sample_values = result[0].sample_values.slice(0,10).reverse();
                            console.log(sample_values);
        
        var otu_labels = result[0].otu_labels.slice(0,10).reverse();
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
                color: 'rgb(142,124,195)',
              }
          };
        
          var data = [barchart];

          var layout = {
            title: "<b>Belly Button Bacteria Top 10 OTUs<b>",
            margin: {
              l: 100,
              r: 100,
              t: 120,
              b: 50
            },
            xaxis: {title:"Sample Values"},
            width: 500,
            height: 600
          };

          Plotly.newPlot("bar", data, layout);



          //*******************************
          //*********** BUBBLE CHART ******
          //*******************************
          var bubblechart = {
            x: otu_ids,
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
            title: "<b>Belly Button Bacteria Bubble Chart</b>",
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

 };

 // option changed
 function optionChanged(sample2){

  demographicInfo(sample2);
  buildPlot(sample2);

 }


 // init Function to load the sample on loading html page
 function init(){

    d3.json("data/samples.json").then((data) => {
        console.log(data);

        var firstSample = data.metadata.map(item => item.id);

        console.log(firstSample[0]);

        DropDownMenu(firstSample[0]);

        buildPlot(firstSample[0]);

        demographicInfo(firstSample[0]);
        
        
     });
};

init();
