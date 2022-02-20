// Written by Jeremy Fischer
const fs = require("fs")
const XLSX = require("xlsx")
const jsontoxml = require("jsontoxml")

// Set up
const workbook = XLSX.readFile("./Data/rural_and_crp_matched_dataset.xlsx");

let worksheets = {}
for(const sheetName of workbook.SheetNames){
    worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
}

//console.log("json: \n", JSON.stringify(worksheets["crp data"]), "\n\n");

function getCRPData(){
    return worksheets["crp data"]
}

function getAggregatedCRPJSON(){
    const aggregatedCRPdata = {}

    for(const record of worksheets["crp data"]){
        // console.log(record)
        
        if(record.crp_id in aggregatedCRPdata){
            // Add to exisiting record object
            aggregatedCRPdata[record.crp_id]["conservationSubsidies"] += record["Conservation Subsidies"]
            aggregatedCRPdata[record.crp_id]["disasterSubsidies"] += record["disaster subsidies"]
            aggregatedCRPdata[record.crp_id]["commoditySubsidies"] += record["commodity subsidies"]
            aggregatedCRPdata[record.crp_id]["years"].push(record.year)
        }else{
            aggregatedCRPdata[record.crp_id] = 
            {
                "name": record.name,
                "conservationSubsidies": record["Conservation Subsidies"],
                "disasterSubsidies": record["disaster subsidies"],
                "commoditySubsidies": record["commodity subsidies"],
                "recipientZip": record["recipient zip"],
                "years": [record.year]
            }
        }
    }
    return aggregatedCRPdata
}

function getYearlyTotals(){
    // year: {}
    yearlyJSON = {}

    for(const record of worksheets["crp data"]){
        if(record.year in yearlyJSON){
            yearlyJSON[record.year]["conservationSubsidies"] += record["Conservation Subsidies"]
            yearlyJSON[record.year]["disasterSubsidies"] += record["disaster subsidies"]
            yearlyJSON[record.year]["commoditySubsidies"] += record["commodity subsidies"]

        }else{
            yearlyJSON[record.year] = 
            {
                "conservationSubsidies": record["Conservation Subsidies"],
                "disasterSubsidies": record["disaster subsidies"],
                "commoditySubsidies": record["commodity subsidies"]
            }
        }
    }
    return yearlyJSON;
}

jsonToFile(getYearlyTotals(), "yearlyTotal")

function jsonToFile(jsonData, fileName){
    const data = JSON.stringify(jsonData)
    fs.writeFile(fileName+".json", data, (err) => {
    if(err){throw err;}})
}

module.exports = {getYearlyTotals, getAggregatedCRPJSON, getCRPData}