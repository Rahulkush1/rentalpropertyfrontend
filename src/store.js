import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./Slice/userSlice"
import propertySlice from "./Slice/propertySlice"
const store = configureStore({
    reducer : {
        user: userSlice,
        properties: propertySlice
    },
})
export default store