/* eslint-disable no-underscore-dangle */

import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  public noticias: Article[] = [];
  private _storage: Storage | null = null;
  constructor(private storage: Storage,
    public toastCtrl: ToastController) {
    this.init();
    this.cargarFavoritos();
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async init(){
    const storage =  await this.storage.create();
    this._storage = storage;
  }

  guardarNoticias(noticia){
  const existe = this.noticias.find(findNoticia => findNoticia.title === noticia.title);
  if(!existe){
    this.noticias.unshift(noticia);
    this._storage.set('favoritos', this.noticias);
  }
  this.presentToast('Agregado a favoritos');
  }

async cargarFavoritos(){
  const result = await this.storage.get('favoritos');
  if(result){
    this.noticias = result;
  }
  }

  borrarNoticia(noticia){
    this.noticias = this.noticias.filter( filertNoticia =>  filertNoticia.title !== noticia.title );
    this._storage.set('favoritos', this.noticias);
    this.presentToast('Borrado de favoritos');
  }
}
