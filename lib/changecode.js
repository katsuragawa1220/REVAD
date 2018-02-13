const fs = require("fs");
const parse = require("csv").parse;

module.exports = { 
    hasIf:async function (event, context) {
        let pull = (await context.github.issues.get(context.issue())).data;
        let diff_url = pull.pull_request.diff_url;

        var request = require("request");
        request(diff_url, function (error, response, body) {
            if (!error) {

                const re = /\+\s*if\s*\((.*)\)\s*\{?\n/g,
                    newstr = re.exec(body);

                if (!newstr) {

                    const param = context.issue({"body": "This changes does't have if changes"});

                    return context.github.issues.createComment(param);

                }

                const changed_condition =  newstr[1];
                
                // console.log(newstr);
                const filename = "rules.csv";
                
                const columns = [
                    "lhs","rhs","ori","rev","count","support","all_num","confidence","lhs_count","lift","link"
                ];
                const parser = parse({columns: columns});
                
                const readableStream = fs.createReadStream(filename, {encoding: "utf-8"});
                
                readableStream.pipe(parser);
                
                let message = `Your \`if\` change is \`if (${changed_condition})\`\n`;
                let i = 0;
                
                parser.on("readable", () => {
                    let data;

                    /* eslint no-cond-assign:0 */
                    while (data = parser.read()) {
                        if (i==1)
                            message += `\nThis bot suggests change candidates based on past ${data["all_num"]} merged changes.\n`;
                        i +=1;
                            
                        if (changed_condition.includes(data["lhs"])){
                            const example = `\`\`\`diff\n- ${data["ori"]}\n+ ${data["rev"]}\n\`\`\``;
                            const confidence = `${data["count"]} / ${data["lhs_count"]}`;
                            
                            message += `\nSuggest adding \`${data["rhs"]}\` with \`${data["lhs"]}\`(confidence: ${confidence})．\n\nRecent fix example\n\n${example}\n`;
                        }
                    }
                });
                
                parser.on("end", () => {
                    let param = context.issue({"body": message});
                    return context.github.issues.createComment(param);
                });


            }
        });
    }
};