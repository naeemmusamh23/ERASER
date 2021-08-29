const initialState = {}
  
  export default (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
      case 'SET':
        return {
            ...payload
        }
      default:
        return state;
    }
  }
  export const setCourse = payload => {
      return {
          type: 'SET',
          payload
      }
  }