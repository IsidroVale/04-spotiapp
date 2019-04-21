import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spoti service listo')
  }

  getQuery( query: string ){

    const URL = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDVE0DZ4TL4p_OPQAF48d2PD2vQs8Zs3hZiU0DYk8V7hYNzgNYKcIwg-S8B_qYc4O-7c71tE3-Dvy3eQOQ'
    });

    return this.http.get(URL, { headers });

  }



  getNewReleases(){

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQBfMeTWrkxKXTqbldkhXxcu1IHVLZ-AJNeBUKnDXLdgo-MnaRgoYNGVoP4BsggtECGnoxIPA9cQmbPWLwo'
    // });

    return this.getQuery('browse/new-releases?limit=20')
                .pipe( map( data => data['albums'].items));

    //return this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', { headers } )
    //           .pipe( map( data => data['albums'].items));
  
  }

  getArtistas ( termino: string ){

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQBfMeTWrkxKXTqbldkhXxcu1IHVLZ-AJNeBUKnDXLdgo-MnaRgoYNGVoP4BsggtECGnoxIPA9cQmbPWLwo'
    // });

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
    .pipe( map( data => 
      data['artists'].items));
      
    // return this.http.get(`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`, { headers } )
    //           .pipe( map( data => 
    //             data['artists'].items));
  
  }

  getArtista ( id: string ){

    return this.getQuery(`artists/${ id }`);
    // .pipe( map( data => 
    //   data['artists'].items));
      
  }

  getTopTracks ( id: string ){

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                .pipe( map( data => data['tracks']));
      
  }

}
