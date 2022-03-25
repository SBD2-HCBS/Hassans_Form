import {default as reducer,ADD_PERSON, DELETE_PERSON, VIEW_PERSON, INITALIZED} from './reducer'


const newState={
    person:{id:0,firstName: 'Jim', lastName: 'Smith', age:4, hobbies:'Everythign under the sun'}
}

describe("testing the reducer", () => {
    describe('when the last state is undefined', () => {
        test("when the last state is undefined it should return an empty person array",()=>{
            const actual = reducer(undefined,{
                type:INITALIZED
            })
            expect(actual).toEqual({id:0,person:[]})
        })
        test('Should update the current state',()=>{
            const actual = reducer(newState,{
                type:ADD_PERSON,
                payload:newState
            })
            expect(actual).toEqual({
                    person: {
                        id:0,
                        age: 4,
                        lastName: 'Smith',
                        firstName: 'Jim',
                        hobbies: 'Everythign under the sun',
                    }
                }
            )
        })
        // test('should remove a person from list', () => {
        //     const actual = reducer(newState,{
        //         type:'DELETE_PERSON',
        //         payload: ({newState,id:0})
        //     })
        //     expect(actual).toEqual({})
        // })
    })
})