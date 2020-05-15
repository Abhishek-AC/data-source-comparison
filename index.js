var jsonDiff = require('json-diff'), boData = require('./data.json'), cfaData = require('./organizations.json');

function createList(n){
    let i;
    let arr=[];
    for(i=0;i<n;++i)
        arr.push(i);
    return arr;
}
function setDifference(a,b) {
    let diff;
    diff = a.filter(x => !b.includes(x) );
    return diff;
}
function mapEntries(diff, data){
    let i, arr = [];
    for(i=0;i<diff.length;++i){
        arr.push(data[diff[i]]);
    }
    return arr;
}


var indexInBoData, indexIncfaData, count = 0, matchedIndexInBoData = [], matchedIndexInCfaData = [], matchedEntries = [], remainingBoEntries = [], remainingCfaEntries = [];

// Finding matched entries on the basis of name field in both data sources
for (indexInBoData = 0; indexInBoData< boData.length; ++indexInBoData) {
    for(indexIncfaData = 0; indexIncfaData< cfaData.length; ++indexIncfaData) {
        if(boData[indexInBoData].name.toUpperCase() === cfaData[indexIncfaData].name.toUpperCase() ){
            matchedIndexInBoData.push(indexInBoData) ;
            matchedIndexInCfaData.push(indexIncfaData);
            count ++;
            jsonOne = boData[indexInBoData];
            jsonTwo = cfaData[indexIncfaData];
            matchedEntries.push(jsonDiff.diff(jsonOne, jsonTwo));
            break;
        }
    }
}


// Finding unmatched Entries from Bo's Data
arr = createList(boData.length);
diff = setDifference(arr, matchedIndexInBoData);

remainingBoEntries = mapEntries(diff, boData);


//Finding unmatched Entries from Cfa's Data
arr = createList(cfaData.length);
diff = setDifference(arr, matchedIndexInCfaData);

remainingCfaEntries = mapEntries(diff, cfaData);



matchedEntriesJSON = JSON.stringify(matchedEntries);
remainingCfaEntriesJSON = JSON.stringify(remainingCfaEntries);
remainingBoEntriesJSON = JSON.stringify(remainingBoEntries);

var fs = require('fs');
fs.writeFile('./analysed/matchedEntries.json', matchedEntriesJSON, 'utf8', function(err){
    if(err) throw err;
  });

fs.writeFile('./analysed/remainingCfaEntries.json', remainingCfaEntriesJSON, 'utf8', function(err){
    if(err) throw err;
  });

fs.writeFile('./analysed/remainingBoEntries.json', remainingBoEntriesJSON, 'utf8', function(err){
if(err) throw err;
});

console.log('length of boData = ', boData.length);
console.log('length of cfaData = ', cfaData.length);
console.log('Matched entries = ', count);



