import { combineReducers } from 'redux';
import semesters from "./semesters";
import auth from "./auth";


const semestr = combineReducers({
    semesters, auth,
})

export default semestr;
