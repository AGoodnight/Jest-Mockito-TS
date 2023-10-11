import { TestScheduler } from "rxjs/testing"
import { instance, mock, spy, when } from 'ts-mockito'
import DIService, { Dependency } from "./diService"
import { Observable, delay, of } from "rxjs"

describe("A DI Service",()=>{

    let realService:DIService
    let mockedDependency:Dependency
    let testScheduler:TestScheduler

    beforeAll(()=>{
        mockedDependency = mock(Dependency)
        realService = new DIService(instance(mockedDependency))

        testScheduler = new TestScheduler((actual,expected)=>{
            return expect(actual).toEqual(expected)
        })
    })

    it("real service should return an observable result from it's dependency",()=>{

        when(mockedDependency.AnObservableResult('Mark')).thenReturn(
            of("Mark will be a little late").pipe(delay(10))
        )

        const result:Observable<string> = realService.DIObservableResult;
        const expectedMarbles = '10ms (a|)';
        const expectedValues = {a:"Mark will be a little late"};

        testScheduler.run(({expectObservable})=>{
            expectObservable(result).toBe(expectedMarbles,expectedValues)
        })
    })

})