import json
with open('./links.json') as handle:
    linksDump = json.loads(handle.read())
with open('./converted.json') as same:
    convertedDump = json.loads(same.read())
    
newDict = []
for i in range(0,len(linksDump)):
    temp = convertedDump[i]
    temp["social_profiles"] = linksDump[i]
    newDict.append(temp)

with open('../data.json', 'w') as outfile:
    json.dump(newDict, outfile)




