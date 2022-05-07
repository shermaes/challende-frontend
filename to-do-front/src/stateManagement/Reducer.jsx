function reducer(state, action){
    //here I have the actions that can be performed on my app, I affect the state from here
    switch(action.type){
        case 'get-categories':
            const stateWithAllTheCategories = [...action.payload
            ]
            return stateWithAllTheCategories

        case 'add-category':
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
            const stateCategoryToUpdate = state.find(tasks=> tasks.id === action.payload.fkCategoryId)
            // console.log(stateCategoryToUpdate)
            const stateTasksToUpdate = stateCategoryToUpdate.tasks.map(task => {
                if(task.id===action.payload.id){
                    return action.payload
                }
                return task
            })
            const newStateCategoryWithModifiedCheckbox = {...stateCategoryToUpdate, tasks:stateTasksToUpdate}

            const newStateWithUpdatedTask = state.map(category => {
                if ( category.id === action.payload.fkCategoryId) {
                    return newStateCategoryWithModifiedCheckbox
                }
                return category
            })

            return newStateWithUpdatedTask 
            
        case 'remove-task':
            return state          
    }
}
export default reducer