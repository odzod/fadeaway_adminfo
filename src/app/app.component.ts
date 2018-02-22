import {Component, ElementRef, ViewEncapsulation,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'material-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private route: ActivatedRoute,private router: Router) {
        this.route.params.subscribe(res => console.log(res.id));
    }

    ngOnInit() {

    }

    version = "1.0.0 ";

}

/**
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */