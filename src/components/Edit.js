import React,{useState, useEffect} from 'react'
import {useLocation,Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
// import {addPerson} from "../ducks/reducer";
import {addPersonFunction, updatePersonFunction} from "../ducks/actions";
import '../App.css';
const Edit=()=>{
    const location = useLocation()

    const {from} =  location.state
    //const person = useSelector(state=>state.person[from])

    const [submit,setSubmit] = useState(false)
    const dispatch = useDispatch();
    const hobbyRef=React.useRef(),
        firstNameRef = React.useRef();
  // console.log(from.people,'edit')
  //   console.log(from.current)
    const [firstName,setFirstName] = useState(''),

        [lastName,setLastName] = useState(''),
        [age,setAge] = useState(''),
        [hobbies,setHobbies] = useState(''),
        [id,setID] = useState(from.current.id),
        [person,setPerson] = useState({
            id,
            firstName,
            lastName,
            age,
            hobbies
        }),
        [isMounted,setIsMounted] = useState(false),
        [originalArray, setOriginalArray]=useState(from.current)

    const fixStr=(str)=>{
            let firstLetter = str.substring(0,1).toUpperCase() + str.substring(1).toLowerCase()
            if(firstLetter.length > 50) {
                window.alert(`Max length is 50 characters; will only save the first 50 characters + :${firstLetter}`)

                firstLetter = firstLetter.slice(49)
                // return firstLetter.replace(/\s/g,"")
            }
            return firstLetter.replace(/\s/g,"_")
        },
        fixAge=(age)=>{
            if(age>110) {
                window.alert(`Max age is 110 you put ${age} resetting to max age`)
                age = 110
            }
            return age
        },
        fixHobbies=(str)=>{

        }

    // const replaceById =(id,arr,person)=>{
    //     let newArray = arr
    //     const index=newArray.findIndex(p=>p.id===id)
    //     console.log(index)
    //     newArray[index].name ='juju'
    //     console.log(newArray)
    //     return newArray
    // }

   function replaceArrayById(originalArray,newArray){

   let rest;

       //  let newArray33=[originalArray].slice();
       // console.log(newArray33)
       //  const id =   [newArray].find(o=>o.id)
       //  // console.log(id)
       //  const newItems= [newArray33].findIndex(p=>p.id===id)
       //  // console.log(newItems)
       //  let rest = [newArray33].slice(0,newItems)
       //  rest.push(newArray)
        // console.log(newArray33)
        //console.log(newObject)

        return rest
    }
    let finalArray;
    let newPerson;
    const addNewPerson = async() => {
        if (hobbies.length<5){
            window.alert('Hobbies must be at least 5 characters long')
            hobbyRef.current.focus();
            return;

        }if(hobbies.length>4) {

            await setPerson({
                id: id,
                firstName: fixStr(firstName),
                lastName: fixStr(lastName),
                age: fixAge(age),
                hobbies: hobbies
            })
         //   finalArray=await replaceItemsById(from.people, person)

            // finalArray= replaceArrayById(originalArray,person)
            // console.log(finalArray)
        }
    }
//console.log(person)
    const handleFirstNameChange=async(e)=>{
            e.preventDefault();
            // const {firstName, lastName, age, hobbies} = e.target;
           await setFirstName(e.target.value)
        await setID(from.current.id)
            console.log(firstName)
        console.log(id)

        },
        handleLastNameChange=(e)=>{
            e.preventDefault();
            setLastName(e.target.value)
        },
        handleAgeChange=(e)=>{
            e.preventDefault();
            setAge(e.target.value)
        },
        handleHobbiesChange=(e)=>{
            e.preventDefault();
            setHobbies(e.target.value)
        };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (hobbies.length < 5) {
            window.alert('Hobbies must be at least 5 characters long')
            hobbyRef.current.focus();
            return;

        }
        if (hobbies.length > 4) {
            await setIsMounted(true)

            await addNewPerson()
            setSubmit(true);
            // addPerson(person)

            setFirstName('')
            setLastName('')
            setAge('')
            setHobbies('')

        }
    };
    useEffect(()=>{
        firstNameRef.current.focus()
    },[])
    useEffect(()=>{
        if(isMounted) {
            console.log(person,'person')

         dispatch(updatePersonFunction(person))

        }
        return async()=> {
            await setIsMounted(false)
            setTimeout(() => {
                setSubmit(false)
            }, 1500)
        }

    },[person])

    return(
        <div className="App-header outSide">
            <form onSubmit={handleSubmit}>
                <span id='spans'><h2>Update Your Form</h2></span>
                <span><h2>Full Name: {!firstName?from.current.firstName:firstName} {!lastName?from.current.lastName:lastName}</h2></span>
                <h2>Age: {!age?from.current.age:age}</h2>
                <h3>Hobbies: {!hobbies?from.current.hobbies:hobbies}</h3>
                <div id='form' >
                        <input
                            type='text'
                            name={firstName}
                            placeholder="First Name"
                            onChange={handleFirstNameChange}
                            required
                            value={firstName}
                            ref={firstNameRef}
                        />
                        <input
                            type='text'
                            name={lastName}
                            placeholder="last Name"
                            onChange={handleLastNameChange}
                            required
                            value={lastName}
                        />
                        <input
                            type={'number'}
                            name={age}
                            placeholder="age"
                            onChange={handleAgeChange}
                            required
                            value={age}
                        />
                        <input
                            type={'text'}
                            name={hobbies}
                            placeholder="Hobbies"
                            onChange={handleHobbiesChange}
                            required
                            value={hobbies}
                            ref={hobbyRef}
                        />
                    </div>

                <button >Submit Form</button>
            <Link to='/viewContainer'  >
                <button>See List</button>
            </Link>
            </form>
            {submit?(<div className='green'><h2>You Have Successfully updated a Person!</h2></div>):null}
        </div>
    )
}
export default Edit
