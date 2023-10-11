import AnAsyncService from "./service"
import { instance, mock, spy, when } from 'ts-mockito'
import { TestScheduler } from 'rxjs/testing'
import { Observable } from "rxjs";

describe("A Simple Service",()=>{

    let mockedService:AnAsyncService;
    let realService:AnAsyncService;
    let serviceInstance:AnAsyncService;
    let randomNumber:number;
    let randomString:string;
    let testScheduler:TestScheduler

    beforeAll(()=>{
        mockedService = mock(AnAsyncService);
        realService = new AnAsyncService();
        testScheduler = new TestScheduler((actual,expected)=>{
            return expect(actual).toEqual(expected)
        })
    })

    beforeEach(()=>{
        randomNumber = Math.round(Math.random()*100);
        randomString = [1,2,3,4,5].reduce((final,_v)=> 
            final.concat(String.fromCharCode(Math.floor(Math.random() * 256)))
        ,"");
        when(mockedService.value).thenReturn(randomNumber)
        when(mockedService.ready).thenReturn(true)
        when(mockedService.ASynchronousMethod()).thenReturn(randomString)
        when(mockedService.AnAsynchronousMethod()).thenResolve(randomString)
    })

    it("instance should be ready",()=>{
        serviceInstance = instance(mockedService);
        expect(serviceInstance.ready).toBeTruthy();
    })

    it("instance should return expected random integer",()=>{
        serviceInstance = instance(mockedService);
        expect(serviceInstance.value).toBe(randomNumber);
    })

    it("instance should return expected result from stubed method",()=>{
        const result = instance(mockedService).ASynchronousMethod();
        expect(result).toBe(randomString);
    })

    it("instance should return a real result from spy of the mocked service",()=>{
        spy(realService)
        expect(realService.ASynchronousMethod()).toBe("Real Response");
    })

    it("instance should return a stubbed response from async method returning promise",async ()=>{
        const result = await instance(mockedService).AnAsynchronousMethod()
        expect(result).toBe(randomString);
    })

    it("instance should return a an observable result",()=>{
        const result:Observable<string> = realService.AnObservableResult("Mark");
        const expectedMarbles = '10ms (a|)';
        const expectedValues = {a:"Mark will be a little late"};

        testScheduler.run(({expectObservable})=>{
            expectObservable(result).toBe(expectedMarbles,expectedValues)
        })
    })
})