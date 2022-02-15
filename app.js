// Written by Jeremy Fischer
const fs = require("fs")
const XLSX = require("xlsx")
const jsontoxml = require("jsontoxml")

// Set up
const workbook = XLSX.readFile("rural_and_crp_matched_dataset.xlsx");

let worksheets = {}
for(const sheetName of workbook.SheetNames){
    worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
}

//console.log("json: \n", JSON.stringify(worksheets["crp data"]), "\n\n");

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

console.log(aggregatedCRPdata)