class Summation {
    constructor() {
        this._sum_ = 0
    }

    set sum(number){
        this._sum_ += number;
    }

    get sum() {
        return this._sum_;
    }
}

class Adding extends Summation {
    * generator_function() {
        yield 1000;
        yield 2000;
        yield 3000;
        yield 4000;
        yield 5000;
        yield 6000;
    }

    calculate_total() {
        for(let number of this.generator_function()){
            super.sum = number;
        }
    }

    print_total() {
        console.log("The total is " + super.sum);
    }
}

let add = new Adding();
add.print_total(add.calculate_total());

export default function * idMaker() {
    var index = 0;
    while(true)
        yield index++
}
var gen = idMaker();
console.log(gen.next().value);