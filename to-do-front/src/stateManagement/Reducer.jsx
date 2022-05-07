function reducer(state, action){
    //here I have the actions that can be performed on my app, I affect the state from here
    switch(action.type){
        case 'get-categories':
            const stateWithAllTheCategories = [...action.payload
            ]
            return stateWithAllTheCategories

        case 'add-category':
            
                const newCategory = action.payload;

                const newListOfCategoriesAddedOne = [...state, newCategory] 
    
                return newListOfCategoriesAddedOne;
            

           
        case 'remove-category':
            const newListOfCategoriesWithoutPayloadCategory = state.filter(category => category.id !== action.payload.id)
            return newListOfCategoriesWithoutPayloadCategory;

        case 'add-task': 
            return state

        case 'update-task':
            const stateCategoryToUpdate = state.find(tasks=> tasks.id === action.payload.fkCategoryId)
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
            const stateCategoryOfTheTaskToBeErased = state.find(tasks=> tasks.id === action.payload.fkCategoryId)
            const stateTaskToErased = stateCategoryOfTheTaskToBeErased.tasks.filter(task => {
             return task.id!==action.payload.id   
            })
            const newStateCategoryWithoutTheTask = {...stateCategoryOfTheTaskToBeErased, tasks:stateTaskToErased}

            const newStateWithoutTask = state.map(category => {
                if ( category.id === action.payload.fkCategoryId) {
                    return newStateCategoryWithoutTheTask 
                }
                return category    
             })

             return newStateWithoutTask


    }
}
export default reducer