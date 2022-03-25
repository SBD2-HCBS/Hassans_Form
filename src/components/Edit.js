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
        [originalArray, setOriginalArray]=useState(from.current),
        [errors,setErrors] = useState([]),
        [showErrorMessage,setShowErrorMessage] = useState(false)

    const error={
        name:'Your first or last name need to be less than 50 characters',
        name_required:'You must enter a first and last name',
        age:'Your Age is must be between 1-110 years Old',
        age_min:'Your Min age must be 18',
        age_required:'Please enter a valid age over 18',
        hobby_min:'Your Hobbies must be at least 5 characters long',
        hobby_max:'Your Hobbies cannot be longer than 250 characters',
        hobby_required: 'Please include a hobby'
    }
    const fixStr=(str)=>{
            let firstLetter =str !==undefined?str.substring(0,1).toUpperCase() + str.substring(1).toLowerCase():''

            if(str===''){
                setErrors((prev)=>[...prev,error.name_required])
            }

            else if(firstLetter.length > 50) {

                setErrors((prev)=>[...prev,error.name])

            }

            return firstLetter.replace(/\s/g,"_")
        },
        fixAge=(age)=>{
            if(age>110) {
                setErrors((prev)=>[...prev,error.age])
            }
            if(!age){
                setErrors((prev)=>[...prev,error.age_required])
            }
            else if(age<18 && age !==undefined){
                setErrors((prev)=>[...prev,error.age_min])
            }

            return age
        },
        fixHobbies=(hobby)=>{
            if(hobby.length > 250){
                setErrors((prev)=>[...prev,error.hobby_max])
            }
            if(!hobby){
                setErrors((prev)=>[...prev,error.hobby_required])
            }
            else if(hobby.length<5){
                setErrors((prev)=>[...prev,error.hobby_min])
            }
            return hobby
        };


    const addNewPerson = async() => {

            await setPerson({
                id: id,
                firstName: fixStr(firstName),
                lastName: fixStr(lastName),
                age: fixAge(age),
                hobbies: fixHobbies(hobbies)
            })

        }


    const handleFirstNameChange=async(e)=>{
            e.preventDefault();
            // const {firstName, lastName, age, hobbies} = e.target;
           await setFirstName(e.target.value)
        await setID(from.current.id)
            setErrors([]);
            setShowErrorMessage(false)

        },
        handleLastNameChange=(e)=>{
            e.preventDefault();
            setErrors([]);
            setShowErrorMessage(false)
            setLastName(e.target.value)
        },
        handleAgeChange=(e)=>{
            e.preventDefault();
            setErrors([]);
            setShowErrorMessage(false)
            setAge(e.target.value)
        },
        handleHobbiesChange=(e)=>{
            e.preventDefault();
            setErrors([]);
            setShowErrorMessage(false)
            setHobbies(e.target.value)
        };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(errors.length===0) {

            await setIsMounted(true)
            console.log(firstName, lastName)
            await addNewPerson()

            //addPerson(person)

            setFirstName('')
            setLastName('')
            setAge('')
            setHobbies('')
        }else{
            firstNameRef.current.focus()
        }


    }
    useEffect( ()=>{
        firstNameRef.current.focus()
    },[])
    useEffect(async()=>{
        if(isMounted) {
            console.log(person,'person')
        if(errors.length > 0) {
            console.log(errors)

           await setShowErrorMessage(true)

        }else{
            setSubmit(true)
         dispatch(updatePersonFunction(person))
            setErrors([]);
            setShowErrorMessage(false)

        return async()=> {
            await setIsMounted(false)
            setTimeout(() => {
                setSubmit(false)
            }, 1500)
        }
        }
        }

    },[person])

    const reset=(e)=>{
        e.preventDefault()
        if(firstName.length ===0 && lastName.length === 0 && age.length === 0 && hobbies.length === 0){
            window.alert(`Cannot clear an empty field`)
        }else{
            setFirstName('')
            setLastName('')
            setAge('')
            setHobbies('')

        }
        firstNameRef.current.focus()
    }

    return(
        <div className="App-header outSide">
            {showErrorMessage ?(
                <div>
                    <h3>Errors</h3>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </div>
            ):<div>
                <span><h2>Full Name: {!firstName?from.current.firstName:firstName} {!lastName?from.current.lastName:lastName}</h2></span>
                <h2>Age: {!age?from.current.age:age}</h2>
                <h3>Hobbies: {!hobbies?from.current.hobbies:hobbies}</h3>
            </div>}
            <form onSubmit={handleSubmit}>
                <span id='spans'><h2>Update Your Form</h2></span>

                <div id='form' >
                        <input
                            type='text'
                            name={firstName}
                            placeholder="First Name"
                            onChange={handleFirstNameChange}

                            value={firstName}
                            ref={firstNameRef}
                        />
                        <input
                            type='text'
                            name={lastName}
                            placeholder="last Name"
                            onChange={handleLastNameChange}

                            value={lastName}
                        />
                        <input
                            type={'number'}
                            name={age}
                            placeholder="age"
                            onChange={handleAgeChange}

                            value={age}
                        />
                        <input
                            type={'text'}
                            name={hobbies}
                            placeholder="Hobbies"
                            onChange={handleHobbiesChange}

                            value={hobbies}
                            ref={hobbyRef}
                        />
                    </div>
                <div>
                    <button onClick={reset}>Reset</button>
                <button >Submit Form</button>
                </div>
            <Link to='/viewContainer'  >
                <button>See List</button>
            </Link>
            </form>
            {submit?(<div className='green'><h2>You Have Successfully updated a Person!</h2></div>):null}
        </div>
    )
}
export default Edit
