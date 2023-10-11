import { Observable, delay, of } from "rxjs"


export class Dependency{
    constructor(){

    }

    ASynchrounousMethod(){

    }

    async AnAsynchronousMethod(){
        return "After a bit of time"
    }

    AnObservableResult(name:string):Observable<string>{
        return of(`${name} will be a little late`).pipe(delay(10))
     }
}

class DIService{
    private _dependency:Dependency

    get DISynchronousResult(){
        return this._dependency.ASynchrounousMethod()
    }

    get DIASynchronousResult(){
        return this._dependency.AnAsynchronousMethod()
    }

    get DIObservableResult(){
        return this._dependency.AnObservableResult("Mark")
    }

    constructor(dependency:Dependency){
        this._dependency = dependency
    }
}

export default DIService