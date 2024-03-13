import { useEffect } from 'react';
import { useSetRecoilState } from "recoil";
import { transactionOperationErrorAtom } from 'recoil/atoms/TransactionOperationErrorAtom';

function useSetError(message, variant, condition) {

    const setError = useSetRecoilState(transactionOperationErrorAtom);

    useEffect(() => {
        if (condition === undefined || condition == null || condition) {
            setError({
                Message: message,
                Variant: variant
            })
        }
    }, [setError, message, variant, condition]);
}

export { useSetError }