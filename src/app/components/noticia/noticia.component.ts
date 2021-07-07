/* eslint-disable no-trailing-spaces */
import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
@Input() noticia: Article;
@Input() indice: number;
@Input() enFavoritos;

  constructor( private actionSheetCtrl: ActionSheetController,
                private inbrowser: InAppBrowser,
                private socialSharing: SocialSharing,
                private dataLocalService: DataLocalService
              
                ) { }

  ngOnInit() {
    
  }

  abrirNoticia(){
    console.log('Noticia', this.noticia.url);
    this.inbrowser.create(this.noticia.url,'_system','location=true');
   // const browser = this.iab.create( this.noticia.url, '_system');

  }
  
  async lanzarMenu(){
    let guardarBorrarBtn;
    if(this.enFavoritos)
    {
      guardarBorrarBtn={
      text: 'Borrar Favorito',
      icon: 'trash',
      cssClass: 'action-dark',
      handler: () => {
        console.log('Borrar de Favorito');
        this.dataLocalService.borrarNoticia(this.noticia);
      }
      };
      }else
      {
        guardarBorrarBtn={
          text: 'Favorito',
          icon: 'star',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Favorito');
            this.dataLocalService.guardarNoticias(this.noticia);
          }
          };
        }
    
    const actionSheet = await this.actionSheetCtrl.create({
      
      buttons: [
         {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url

          );
        }
      },
      guardarBorrarBtn,
       {
        text: 'Cancel',
        cssClass: 'action-dark',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
    
  }
}
