import React from 'react'
import {useDispatch } from 'react-redux'
import {connect} from "react-redux";

const ListView = (props) => {

    return(
        <div>

        </div>
    )
}
const mapStateToProps=(state)=> {
    return{
        people:state.person
    }
}
export default connect(mapStateToProps,null)(ListView);