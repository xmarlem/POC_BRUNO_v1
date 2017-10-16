import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class JobsService implements Resolve<any>
{
    jobs: any[];
    routeParams: any;
    board: any;

    onJobsChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onJobChanged: BehaviorSubject<any> = new BehaviorSubject([]);

    constructor(private http: HttpClient)
    {
    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {
            Promise.all([
                this.getJobs()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getJobs(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get('api/jobpositions')
                .subscribe((response: any) => {
                    this.jobs = response.data;
                    this.onJobsChanged.next(this.jobs);
                    resolve(this.jobs);
                }, reject);
        });
    }

    getBoard(boardId): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get('api/jobpositions/' + boardId)
                .subscribe((response: any) => {
                    this.board = response.data;
                    this.onJobChanged.next(this.board);
                    resolve(this.board);
                }, reject);
        });
    }

    // addCard(listId, newCard)
    // {
    //     this.board.lists.map((list) => {
    //         if ( list.id === listId )
    //         {
    //             return list.idCards.push(newCard.id);
    //         }
    //     });

    //     this.board.cards.push(newCard);

    //     return this.updateBoard();
    // }

    // addList(newList)
    // {

    //     this.board.lists.push(newList);

    //     return this.updateBoard();

    // }

    // removeList(listId)
    // {
    //     const list = this.board.lists.find((_list) => {
    //         return _list.id === listId;
    //     });

    //     for ( const cardId of list.idCards )
    //     {
    //         this.removeCard(cardId);
    //     }

    //     const index = this.board.lists.indexOf(list);

    //     this.board.lists.splice(index, 1);

    //     return this.updateBoard();
    // }

    // removeCard(cardId, listId?)
    // {

    //     const card = this.board.cards.find((_card) => {
    //         return _card.id === cardId;
    //     });

    //     if ( listId )
    //     {
    //         const list = this.board.lists.find((_list) => {
    //             return listId === _list.id;
    //         });
    //         list.idCards.splice(list.idCards.indexOf(cardId), 1);
    //     }

    //     this.board.cards.splice(this.board.cards.indexOf(card), 1);

    //     this.updateBoard();
    // }

    // updateBoard()
    // {
    //     return new Promise((resolve, reject) => {
    //         this.http.post('api/scrumboard-boards/' + this.board.id, this.board)
    //             .subscribe(response => {
    //                 this.onBoardChanged.next(this.board);
    //                 resolve(this.board);
    //             }, reject);
    //     });
    // }

    // updateCard(newCard)
    // {
    //     this.board.cards.map((_card) => {
    //         if ( _card.id === newCard.id )
    //         {
    //             return newCard;
    //         }
    //     });

    //     this.updateBoard();
    // }

    // createNewBoard(board)
    // {
    //     return new Promise((resolve, reject) => {
    //         this.http.post('api/scrumboard-boards/' + board.id, board)
    //             .subscribe(response => {
    //                 resolve(board);
    //             }, reject);
    //     });
    // }
}

// @Injectable()
// export class BoardResolve implements Resolve<any>
// {

//     constructor(private scrumboardService: JobcardService)
//     {
//     }

//     resolve(route: ActivatedRouteSnapshot)
//     {
//         return this.scrumboardService.getBoard(route.paramMap.get('boardId'));
//     }
// }
