const initialState = ''
const FilterReducer = (state = initialState, action) => {

    switch(action.type) {
        
      case 'SET_FILTER' : {
        const filter = action.data
        state = filter;
        return state;
      }
      default : return initialState
    }
  }

export const setFilter = (filter) => {
    return({
      type: 'SET_FILTER',
      data: filter
    })
  }

export default FilterReducer