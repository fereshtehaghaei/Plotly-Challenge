// ***FUNCTION***
// Demographic Info Display Card
function demographicInfo(sample){
    
  // fetch the metadata using d3.json
    d3.json("data/samples.json").then((data) => {
            console.log(data);
             
        var metaData = data.metadata;
            console.log(metaData);
        
        // filter metadataID for one or more results
        var metaDataID = metaData.filter(item => item.id == sample);
            console.log(metaDataID);    

        // store and select #sample-metadata using d3    
        var metaDataSelector = d3.select("#sample-metadata");
        
        // clear any existing metada
        metaDataSelector.html(""); 

        // Add each key and value pair to metaDataSelector
        Object.entries(metaDataID[0]).forEach(([key, value]) => {
            metaDataSelector.append("p").text(`${key.toUpperCase()} : ${value}`);


        });

        
    });

    
};

// ***FUNCTION***
// Drop Down Menu for MetaData IDs
function DropDownMenu() {
    d3.json("data/samples.json").then((data) => {
        console.log(data);

    var metaDataID = data.metadata;

    // looping through each metada ID
    var metaDataIDs = metaDataID.map(item => item.id);
        console.log(metaDataIDs); 

    // store and select selDataset
    var results = d3.select("#selDataset");

    // Add each value option in drop down list
    Object.entries(metaDataIDs).forEach(([key,value]) => {
        results.append("option").text(`${value}`);

    });
});

};

// ***FUNCTION***
// Building BAR and BUBBLE Chart
 function buildPlot(sample){

    d3.json("data/samples.json").then((data) => {
        samples = data.samples;
        console.log(samples);

        // filtering the samples
        var results = samples.filter(item => item.id == sample)

        // assign the 1st value to result (which is index 0)
        var result = results[0];
           
        var otu_ids = result.otu_ids;
            console.log(otu_ids);
    
        var sample_values = result.sample_values;
            console.log(sample_values);
        
        var otu_labels = result.otu_labels;
            console.log(otu_labels);


          //*******************************
          //*********** BAR CHART *********
          //*******************************
        var barchart = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.map(otu_ids => `OTU ${otu_ids}`).slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h",
            marker: {
                color: 'rgb(142,124,195)',
                //color: otu_ids,
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
                    colorscale: "Rainbow"              
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



          var piechart = {
            values: sample_values,
            labels: otu_ids,
            hovertext: otu_labels,
            type: 'pie'
          };

          var data = [piechart];
      
          var layout = {
            height: 500,
            width: 600
          };
      
          Plotly.newPlot('pie', data, layout);
      
      
    });

 };




 
 // ***FUNCTION***
 // Fetch New Data each time a new metadata ID is selected 
 function optionChanged(newValue){

    demographicInfo(newValue);
    buildPlot(newValue);

 }

 // ***FUNCTION***
 // Grab the first sample to build the initial html page Dashboard 
 function init(){

    d3.json("data/samples.json").then((data) => {
        console.log(data);

        var firstSample = data.metadata.map(item => item.id);
            console.log(firstSample[0]);

        // Call other function in init to use the first sampole to build initial plots, demographicInfo, menu option
        DropDownMenu(firstSample[0]);
        buildPlot(firstSample[0]);
        demographicInfo(firstSample[0]);
        
        
     });
};

// Initialize the Dashboard
init();
