import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useDispatchResolve = () => {
  const dispatch = useDispatch();

  return useCallback(
    (action: any) => {
      return new Promise((resolve, reject) => {
        const newAction = { ...action, resolver: { resolve, reject } };
        dispatch(newAction);
      });
    },
    [dispatch]
  );
};
