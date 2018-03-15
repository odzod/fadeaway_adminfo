import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {ConfigService} from '../config';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import Jodit from 'jodit';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

/**
 * @title Table retrieving data through HTTP
 */
export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'infos-edit',
    styleUrls: ['infos_edit.component.css'],
    providers: [ConfigService,
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}],
    templateUrl: 'infos_edit.component.html',
})
export class InfosEditComponent implements OnInit {


    private myEditor;
    private myEditor2;

    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private config: ConfigService) {

    }

    public returnBack() {
        this.router.navigateByUrl('');
    }

    ngOnInit() {

        this.route.params.subscribe(res => {
            this.config.httpGET('news/' + res.id, '').subscribe(res2 => {
                this.myForm = res2['data'][0];
                console.log(this.myForm['news_create']);
                this.date_create = new FormControl(this.myForm['news_create']);
                this.news_title = new FormControl(this.myForm['news_title']);
                this.myEditor.setEditorValue(
                    this.myForm['news_contains']
                );
                this.myEditor2.setEditorValue(
                    this.myForm['news_title_contains']
                );
            });
        });


        this.myEditor = new Jodit('#editor', {
            "uploader": {
                url: "http://localhost:8181/index-test.php?action=upload"
            },
            "autofocus": true,
            "spellcheck": false,
            "language": "fr",
            "defaultMode": "1",
            "toolbarAdaptive": false,
            "toolbarSticky": false,
            "showCharsCounter": false,
            "showXPathInStatusbar": false,
            "height": 500,
            "width": 650
        });

        this.myEditor2 = new Jodit('#editor_title', {
            "uploader": {
                url: "http://localhost:8181/index-test.php?action=upload"
            },
            "language": "fr",
            "toolbarSticky": false,
            "showCharsCounter": false,
            "showWordsCounter": false,
            "showXPathInStatusbar": false,
            "buttonsXS": "bold,|,brush,paragraph,|,align,|,undo,redo,|,eraser,dots",
            "height": 150,
            "width": 650
        });


    }

    public date_create: FormControl;
    public news_title: FormControl;

    public myForm = {};
}

