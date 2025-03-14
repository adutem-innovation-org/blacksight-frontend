import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { StoreState } from "@/interfaces";
import { StoreDispatch } from "@/store";

export const useStore = () => {
  const dispatch: StoreDispatch = useDispatch();

  const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector;

  const getState = <K extends keyof StoreState>(reducer: K): StoreState[K] =>
    useStoreSelector((state) => state[reducer]);

  return { dispatch, useStoreSelector, getState };
};
