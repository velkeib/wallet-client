import { Colors } from './colors';

export class Dataset {
    label: string;
    stack: string;
    data: number[];
    backgroundColor: string; 

    color:Colors = new Colors();

    constructor(label: string, stack: number, data: number[]){
        this.label = label;
        this.stack = 'Stack ' + stack;
        this.data = data;
    }

    setColor(i: number){
        this.backgroundColor = this.color.getRandomColor(i);
    }

    getColor(){
        return this.backgroundColor;
    }

}