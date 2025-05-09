export class Make {
    id!:number;
    name:string;
    cnpj:string;

    constructor(name: string, cnpj:string ){
        this.name = name;
        this.cnpj = cnpj;
    }
}
