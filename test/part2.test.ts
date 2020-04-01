import { expect } from "chai";

import { partition, mapMat } from "../src/part2/part2"

<<<<<<< HEAD
import { mapMat } from "../src/part2/part2"

function biggerthen10(element:number) { 
=======
function biggerthen10(element:number) {
>>>>>>> 58e92dc855a075fd8762628eba68784b4f672576
    return (element >= 10);
}

describe("Assignment 1 Part 2 Q:1 (partition)", () => {
    let a12 = [1, 2, 34, 4, 576, 3];
    let a13 = [[34, 576], [1, 2, 4, 3 ]];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    it("check 1",()=> {
        expect(partition(biggerthen10,a12)).to.eql(a13);
    });

    it("check 2",()=> {
        expect(partition(x => x % 2 === 0, numbers)).to.eql([[2, 4, 6, 8], [1, 3, 5, 7, 9]]);
    });
<<<<<<< HEAD
})


describe("Assignment 1 Part 2 Q:2", () => {
=======
});

describe("Assignment 1 Part 2 Q:2 (mapMat)", () => {
>>>>>>> 58e92dc855a075fd8762628eba68784b4f672576
    let result =  [[ 1, 4, 9 ], [ 16, 25, 36 ], [ 49, 64, 81 ]];
    let start =  [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
<<<<<<< HEAD
        ]
        ;
    it("chack modle 1 ",()=> {
        expect(mapMat(x => x * x, start)).to.eql(result);
    });
})
=======
    ];
    it("check 1 ", () => {
        expect(mapMat(x => x * x, start)).to.eql(result);
    });
});
>>>>>>> 58e92dc855a075fd8762628eba68784b4f672576
