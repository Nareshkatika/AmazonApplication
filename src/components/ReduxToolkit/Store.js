

import { configureStore } from "@reduxjs/toolkit";
import naresh from './slicedSolution'

const Store=configureStore({
    reducer:{
        shopping:naresh
    }
})

export default Store