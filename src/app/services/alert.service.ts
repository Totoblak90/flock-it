import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

/**
 * Servicio para manejar todos los mensajes de alerta al usuario
 */
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  public async noConectionAlert(err): Promise<void> {
    console.log(err);
    const alert = await this.alertController.create({
      header: 'Error',
      message:
        'Detectamos un error de conexión con nuestro servidor. Por favor revisá tu conexión a internet. Si el problema persiste aguardá un rato y volvé a intentar.',
    });

    await alert.present();
  }
}
