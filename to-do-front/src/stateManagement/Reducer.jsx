function reducer(state, action){
    //here I have the actions that can be performed on my app, I affect the state from here
    switch(action.type){
        case 'get-categories':
            const stateWithAllTheCategories = [...action.payload
            ]
            return stateWithAllTheCategories

        case 'add-category':
            console.log("adding category");
            const newCategory = {
                id:Math.floor(Math.random()*100),
                categoryTitle:action.payload.categoryTitle,  
            }

            const newStateAddedCategory = [...state, newCategory] 
        
            return newStateAddedCategory;

           
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