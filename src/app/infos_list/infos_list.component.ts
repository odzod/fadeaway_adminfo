
import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {ConfigService} from "../config";

@Component({
    moduleId: module.id,
    selector: 'infos-list',
    templateUrl: 'infos_list.component.html',
    styleUrls: ['infos_list.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ConfigService],
    preserveWhitespaces: false,
})

export class InfosListComponent implements OnInit{

    constructor(private route: ActivatedRoute,private router: Router, private config:ConfigService) {
        this.route.params.subscribe();
    }

    ngOnInit() {
        this.config.httpGET("news/last","").subscribe(res=>
        {
            this.list_of_news = res['data'];
        });
    }

    list_of_news = [];

}
