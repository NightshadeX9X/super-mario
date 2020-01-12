import { Lib } from "./main.js";

export default class Loader {
    private urls = new Lib.Collection<string, any>();
    private _paths = new Lib.Collection<'json' | 'text' | 'blob', string>
        ([{ key: 'json', value: '' }, { key: 'text', value: '' }, { key: 'blob', value: '' },])
    async image(url: string): Promise<HTMLImageElement> {
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
    async file(url: string, type: 'text' | 'json' | 'blob'): Promise<string | Blob | object> {
        let get = this.urls.get(url);
        if (get !== undefined) return (get);
        else {
            let fetched = await fetch(url);
            let data = await fetched[type]();
            return data;
        }
    }
    async json(url: string) {
        let path = <string>this._paths.get('json')
        let json = await this.file(path + url, 'json');
        return json as object;
    }
    async text(url: string) {
        let path = <string>this._paths.get('text')
        let string = await this.file(path + url, 'text');
        return string as string;
    }
    async blob(url: string) {
        let path = <string>this._paths.get('blob')
        let blob = await this.file(path + url, 'blob');
        return blob as Blob;
    }
    get paths() {
        return this._paths
    }
}