import { Injectable, } from "@angular/core";


@Injectable({
    providedIn: "root",
})
export class homeContentService {
    constructor()
    {
        this.primaryColor = '#5c849b';
        this.secundaryColor = '#435b64';
        this.tertiaryColor = '#2a343d';
    }   

    public primaryColor : any;
    public secundaryColor : any; 
    public tertiaryColor : any;

    public backgroundColor : string = '';

};
