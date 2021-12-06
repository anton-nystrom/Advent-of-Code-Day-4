import { input } from "./puzzleInput.js";
let bingo = input;
let numbers = bingo.split("\n")[0];
bingo = bingo.split("\n");
numbers = numbers.split(",").map(Number);
let fields = [];
let field = [];
let index = 0;
let number = 0;
for (let i = 2; i < bingo.length; i++) {
    const row = bingo[i].split(" ").filter(item => item !== "");
    if(row.length > 0) {
        field.push(row);
    }
    else {
        fields.push(field);
        field = [];
        index += 1;
    }
}

console.log("Part One: " + partOne().result);
console.log("Part Two: " + partTwo());

function partOne() {
    while (number < numbers.length) {
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            for (let x = 0; x < field.length; x++) {
                const row = field[x];
                for (let y = 0; y < row.length; y++) {
                    const compare = parseInt(row[y]);
                    if(compare === numbers[number]) {
                        let checkColumn = 0;
                        fields[i][x][y] = "x";
                        const checkRow = fields[i][x].filter(item => item === "x").length;
                        field.forEach(element => {
                            if(element[y] === "x") {
                                checkColumn += 1;
                            }
                        });
                        if(checkRow === 5 || checkColumn === 5) {
                            let result = "" + field;
                            result = result.split(",").filter(item => item !== "x").map(Number);
                            result = (result.reduce((a,b) => a + b)) * compare;
                            return {result, i, compare};
                        }
                    }
                }
            }
        }
        number++;
    }
};

function partTwo() {
    let compare = 0;
    let result = 0;
    let field;
    for (let x = fields.length; x > 0; x--) {
        const answer = partOne();
        field = fields[answer.i];
        compare = answer.compare;
        result = answer.result;
        fields.splice(answer.i, 1);
    }

    return result;
};