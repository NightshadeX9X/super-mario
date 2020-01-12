import { Lib } from "./main.js";

export default class Loader {
    private urls = new Lib.Collection<string, any>();
    private _paths = new Lib.Collection<'json' | 'text' | 'blob' | 'image', string>()
    async image(_url: string): Promise<HTMLImageElement> {
        let path = this._paths.get('image')
        let url = (path ?? "") + _url;
        return new Promise(async res => {
            let get = this.urls.get(url);
            if (get !== undefined) res(get);
            else {

                let image = new Image();
                image.addEventListener('load', () => res(image));
                image.src = url;
                this.urls.set(url, image)
            }
        })
    }
    async file(_url: string, type: 'text' | 'json' | 'blob'): Promise<string | Blob | object> {
        let url = _url;
        let get = this.urls.get(url);
        if (get !== undefined) return (get);
        else {
            let fetched = await fetch(url);
            let data = await fetched[type]();
            return data;
        }
    }
    async json(_url: string) {
        let path = this._paths.get('json')
        let url = (path ?? "") + _url;
        let json = await this.file(url, 'json');
        return json as object;
    }
    async text(_url: string) {
        let path = this._paths.get('text')
        let url = (path ?? "") + _url;
        let string = await this.file(url, 'text');
        return string as string;
    }
    async blob(_url: string) {
        let path = this._paths.get('blob')
        let url = (path ?? "") + _url;
        let blob = await this.file(url, 'blob');
        return blob as Blob;
    }
    get paths() {
        return this._paths
    }
}