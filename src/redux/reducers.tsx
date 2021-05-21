
import {GET_PRODUCTS, GET_TOKEN, POST_PRODUCTS} from "./constans";

type State = {
  token: string | undefined,
  products: any
}

type ActionProps = {
  type: 'GET_TOKEN' | 'GET_PRODUCTS' | 'POST_PRODUCTS',
  payload: string | any
}

var initialState : State = {
  token: undefined,
  products: undefined
};

export const rootReducer = (state = initialState, action : ActionProps) => {
  switch (action.type) {
    case GET_TOKEN : {
      localStorage.setItem('token', action.payload)
      initialState.token = action.payload
      return state
    }
    case GET_PRODUCTS:
    case POST_PRODUCTS:  
    {
      initialState.products = action.payload
      return state
    }
    default:
      return state;
  }
};