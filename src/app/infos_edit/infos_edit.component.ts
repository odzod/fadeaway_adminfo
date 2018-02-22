import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import '../../assets/jodit.js';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
    selector: 'infos-edit',
    styleUrls: ['infos_edit.component.css'],
    templateUrl: 'infos_edit.component.html',
})
export class InfosEditComponent implements OnInit {


    private myEditor;

    constructor(private http: HttpClient) {}

    ngOnInit() {

        this.myEditor = new Jodit('#editor',{
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
        this.myEditor.setEditorValue(
            `<p style="text-align: justify;">Voici la question et rumeur du jour ! <strong>Isaiah Thomas</strong> serait-il transférable avant la Trade deadline ?</p>
<p style="text-align: center;"><img src="http://www.fadeaway.fr/assets/images/news_5.jpg" style="width: 400px; height: 267px;" title="Isaiah Thomas"><br></p>
<p style="text-align: justify;"><br>Malgré la victoire à l'arraché de cette nuit contre Minnesota, les Cavaliers sont toujours dans une situation difficile. Il se murmure que le petit lutin <s>vert</s> de Cleveland pourrait être utilisé comme monnaie d’échange lors de cette dernière
    journée de Trade.
    <br>Transférer l’un des meilleurs scoreurs de la saison passée ? Non ? Eh bien oui, la question est réelle. Cette saison le meneur de 29 ans peine à retrouver son niveau et depuis son retour l’équipe va mal.<br><br>Quand on voit que lors des mois
    de novembre et décembre, les Cavs ont aligné 13 victoires consécutives (et 18 victoires en 19 matchs) avec El Jose Calderon à la baguette, on se dit que "oui" Thomas n’a pas réussi son intégration dans le collectif de Cleveland et qu’un départ serait
    possible.
    <br><br>Sachant que son contrat arrive à terme en fin de saison.&nbsp;<strong>La question de son transfert est légitime!</strong><br>Réponse dans les heures à venir !<br>
</p>`
        );

    }
}

