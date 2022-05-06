function reducer(state, action){
    //here I have the actions that can be performed on my app, I affect the state from here
    switch(action.type){
        case 'add-category':
            //I have to create a new state when modifying this
            return state
        case 'remove-category':
            return state
        case 'add-task': 
            return state
        case 'update-task':
            return state 
        case 'remove-task':
            return state          
    }
}
export default reducer