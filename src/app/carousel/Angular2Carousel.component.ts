/**
 * Created by Tareq Boulakjar. from angulartypescript.com
 * Edited by Ved Prakash
 */
import {Component} from '@angular/core';

/*Angular 2 Carousel - Gallery*/
@Component({
    selector: 'cmp-carousel',
    template: `
    <div style="float:left; width:610px;border: 1px solid black;">
    <carousel [interval]="NextPhotoInterval" [noWrap]="noLoopSlides" [slidezs]="slides" [parent]="self">
                          <slide *ngFor="let slidez of slides; let index=index"
                                 [active]="slidez.active">
                              <img [src]="slidez.img"  style="margin:auto; width:610px; height:406px;">
                          </slide>
                        </carousel>
                        </div>
                        <div style="float:left;width:360px; text-align:left; padding-left:30px;
                        border:1px solid black;height:408px;background-color:#232323;padding-right:20px; padding-top:35px;">
                                    <p class="font-1">{{info_type}}</p>
                                    <p class="font-2">{{info_title}}</p>
                                    <p class="font-3" style="text-align:justify;" [innerHtml]="info_contains"></p>
                                    <a class="lire_suite_car" routerLink="news/{{info_id}}">Lire la suite...</a>
                        </div>
                        
    `
})
export class Angular2Carousel  {
    //The time to show the next photo
    public NextPhotoInterval:number = 2800;
    //Looping or not
    public noLoopSlides:boolean = false;
    //Photos
    public slides:Array<any> = [
        {
            "id":5
            ,"type":"INFOS"
            ,"title":"La rumeur du jour : IT 's possible?"
            ,"img":"http://www.fadeaway.fr/assets/images/news_5.jpg"
            ,"date":"xx/xx/xxxx"
            ,"by":"XXXXXX X."
            ,"contains":'Voici la question et rumeur du jour ! Isaiah Thomas serait-il transférable avant la Trade deadline ?'
        }
        ,{
            "id":4
            ,"type":"CLUTCH"
            ,"title":"Le facteur X du jour : Patty Mils"
            ,"date":"xx/xx/xxxx"
            ,"by":"XXXXXX X."
            ,"img":"http://www.fadeaway.fr/assets/images/news_4.jpg"
            ,"contains":""
        }
        ,{
            "id":3
            ,"type":"DOSSIERS"
            ,"title":"Le dossier du jour : Les Toronto Raptors"
            ,"date":"xx/xx/xxxx"
            ,"by":"XXXXXX X."
            ,"img":"http://www.fadeaway.fr/assets/images/news_3.jpg"
            ,"contains":""
        }
        ,{
            "id":2
            ,"type":"INFOS"
            ,"title":"La (mauvaise) info du jour : La blessure de K. Porzingis"
            ,"date":"xx/xx/xxxx"
            ,"by":"XXXXXX X."
            ,"img":"http://www.fadeaway.fr/assets/images/news_2.jpg"
            ,"contains":""
        }
    ];

    constructor() {
            this.addNewSlide();
    }

    self = this;

    list_of_news = this.slides;
    info_type = "";
    info_title = "";
    info_contains ="";
    info_id = "";

    private addNewSlide() {
         this.slides = this.list_of_news;
    }

    private removeLastSlide() {
        this.slides.pop();
    }
}