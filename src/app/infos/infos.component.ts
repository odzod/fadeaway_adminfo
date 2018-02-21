import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'infos',
    templateUrl: 'infos.component.html',
    styleUrls: ['infos.component.css'],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
})

export class InfosComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe(res => console.log(res.id));
    }

    ngOnInit() {
    }

    sendMeHome() {
        this.router.navigate(['']);
    }


    infos_test = 'Voici la question et rumeur du jour ! Isaiah Thomas serait-il transférable avant la Trade deadline ?<br/>' +
        '<br/>' +
        'Malgré la victoire à l\'arraché de cette nuit contre Minnesota, les Cavaliers sont toujours dans une situation difficile. Il se murmure que le petit lutin (/vert/) de Cleveland pourrait être utilisé comme monnaie d’échange lors de cette dernière journée de Trade. <br/>' +
        'Transférer l’un des meilleurs scoreurs de la saison passée ? Non ? Eh bien oui, la question est réelle. Cette saison le meneur de 29 ans peine à retrouver son niveau et depuis son retour l’équipe va mal.<br/>' +
        '<br/>' +
        'Quand on voit que lors des mois de novembre et décembre, les Cavs ont aligné 13 victoires consécutives (et 18 victoires en 19 matchs) avec El Jose Calderon à la baguette, on se dit que "oui" Thomas n’a pas réussi son intégration dans le collectif de Cleveland et qu’un départ serait possible.<br/>' +
        '<br/>' +
        'Sachant que son contrat arrive à terme en fin de saison. La question de son transfert est légitime !<br/>' +
        'Réponse dans les heures à venir !<br/>';

}
