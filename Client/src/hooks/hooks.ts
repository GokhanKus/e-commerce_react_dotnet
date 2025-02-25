import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

//cagirmak istedigimiz zaman bunları tek bir kere yazarak bunları kullanarak cagırabiliriz 
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();