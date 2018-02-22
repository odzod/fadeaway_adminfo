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

/**
 * @title Table retrieving data through HTTP
 */
@Component({
    selector: 'infos-list',
    styleUrls: ['infos_list.component.css'],
    templateUrl: 'infos_list.component.html',
})
export class InfosListComponent implements OnInit {
    displayedColumns = ['news_id', 'news_difuse', 'news_type', 'news_title', 'news_create', 'news_update',  'news_user', 'news_edit'];
    exampleDatabase: ExampleHttpDao | null;
    dataSource = new MatTableDataSource();

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    private myEditor;

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.exampleDatabase = new ExampleHttpDao(this.http);

        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);


        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.exampleDatabase!.getRepoData(
                        this.sort.active, this.sort.direction, this.paginator.pageIndex);
                }),
                map(data => {
                    // Flip flag to show that loading has finished.
                    this.isLoadingResults = false;
                    this.isRateLimitReached = false;
                    this.resultsLength = data.total_count;

                    return data.items;
                }),
                catchError(() => {
                    this.isLoadingResults = false;
                    // Catch if the GitHub API has reached its rate limit. Return empty data.
                    this.isRateLimitReached = true;
                    return observableOf([]);
                })
            ).subscribe(data => this.dataSource.data = data);
    }
}

export interface ResultFormat {
    items: any[];
    total_count: number;
}


/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
    constructor(private http: HttpClient) {}

    getRepoData(sort: string, order: string, page: number): Observable<ResultFormat> {
        const href = 'http://api.fadeaway.fr/index.php/admin/news/list';
        const requestUrl =
            `${href}?q=test&sort=${sort}&order=${order}&page=${page}`;

        return this.http.get<ResultFormat>(requestUrl);
    }
}