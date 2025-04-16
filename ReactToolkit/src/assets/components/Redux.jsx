import {createStore} from 'redux';
import React from 'react';

const initialState = {count : 0};

function productReducer(state = initialState, action){
 switch(action.type){
    case 'increment':
        return {count: state.count + 1};
    case 'decrement':
        return {count : state.count -1};
    default:
        return state;
}
}

function DemoRedux(){
    const store = createStore(productReducer);
    return (
        
        <>
           <div>
                
                <button onClick={() => store.dispatch({type: 'increment'})}>+</button>
                <button onClick={() => store.dispatch({type: 'decrement'})}>-</button>
                <p>Count: {store.getState}</p>
            </div>
        </>
    )
}
export default DemoRedux;