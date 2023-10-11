// export const service = "service"
import { Observable, Subject, delay, of } from 'rxjs'

class AnAsyncService{
    public ready:Boolean = false

    private _value:number = 10
    set value( val:number ){
        this._value = val
    }
    get value(){return this._value}

    constructor(){
        this.ready = true
    }

    ASynchronousMethod():string{
        return "Real Response"
    }

    async AnAsynchronousMethod():Promise<string>{
        return new Promise(()=>{
            return "I am late"
        })
    }

    AnObservableResult(name:string):Observable<string>{
       return of(`${name} will be a little late`).pipe(delay(10))
    }
}

export default AnAsyncService