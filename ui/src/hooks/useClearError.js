import { useEffect } from 'react';
import { useSetRecoilState } from "recoil";
import { transactionOperationErrorAtom } from 'recoil/atoms/TransactionOperationErrorAtom';

function useClearError(condition) {

    const setError = useSetRecoilState(transactionOperationErrorAtom);

    useEffect(() => {
        if (condition === undefined || condition == null || condition) {
            setError({
                Message: null,
                Variant: null
            })
        }
    }, [setError, condition]);
}

export { useClearError }