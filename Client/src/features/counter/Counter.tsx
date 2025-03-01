import { Button, ButtonGroup, Typography } from '@mui/material'
import { decrement, increment, incrementByAmount } from './counterSlice';
import { useAppSelector, useAppDispatch } from '../../store/store';

function Counter() {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();
    return (
        <>
            <Typography>{count}</Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(increment())}>Increment</Button>
                <Button onClick={() => dispatch(decrement())}>Decrement</Button>
                <Button onClick={() => dispatch(incrementByAmount(5))}>Increment by Amount</Button>
            </ButtonGroup>
        </>
    )
}

export default Counter