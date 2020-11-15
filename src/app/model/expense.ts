export class Expense {
    name: string;
    data: number[];


    constructor(name: string, data: number){
        this.name = name;
        this.data = [1];
        this.data[0] = data;
    }
}
