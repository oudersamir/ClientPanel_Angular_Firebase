import { Injectable } from '@angular/core';
import{AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument}  from 'angularfire2/firestore';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Client } from './../models/clients';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

   clientsCollection :AngularFirestoreCollection<Client>;
   clientsDocs :AngularFirestoreDocument<Client>;

  constructor(private afs:AngularFirestore) {
   this.clientsCollection=this.afs.collection('clients');
   }
   addClient(client: Client) {
    this.clientsCollection.add(client);
    
      }

   getClients(user:string):Observable<Client[]>{
    return this.afs.collection('clients',ref=>ref.where('user','==',user)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );;

   }
   getClient(id:string): Observable<Client>{
     return this.clientsCollection.doc(id).valueChanges();

   }


   updateClient(client:Client){
    this.clientsDocs=this.clientsCollection.doc(client.id);
    this.clientsDocs.update(client);
   }
   deleteClient(id:string){
    this.clientsDocs=this.clientsCollection.doc(id);
    this.clientsDocs.delete();
   }
}
