import { bazeUrl } from "./constants";
import { TTrain } from "./types";

export class Api {
  private _bazeUrl: string;
  private _trains: Promise<TTrain[]> | undefined;

  constructor(bazeUrl: string) {
    this._bazeUrl = bazeUrl;
  }

  _handleResult(res: Response) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getTrains() {
    this._trains = fetch(this._bazeUrl).then(this._handleResult);
    return this._trains;
  }
}

export const api = new Api(bazeUrl);
