console.log("This is working")
let width = 800
let height = 600
let padding = 40

let xScale
let yScale

// Selects the canvase by tag
let svg = d3.select("svg")

function drawCanvas(){
    svg.attr("width", width)
    svg.attr("height", height)
}

function generateScales(){
    xScale = d3.scaleLinear()
                .range(padding, width-padding)
}

function drawPoints(){

}

function generateAxes(){
    let xAxis = d3.axisBottom(xScale)
    
}

drawCanvas()
generateScales()
drawPoints()
generateAxes()