import { useEffect, useRef } from 'react';
import { useRecoilState } from "recoil";
import { errorAtom } from 'recoil/atoms/ErrorAtom';

function useShowError() {

    const [error, setError] = useRecoilState(errorAtom);

    const previousError = useRef(null)

    useEffect(() => {
        //if (!previousError || error !== previousError) {
        setError(error)
        previousError.current = error;
        // }
    }, [setError, error]);
}

export { useShowError }