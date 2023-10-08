import "./assets/css/App.css";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./redux/actions/index";

function FunctionCounterComponent() {
    const counter = useSelector((state) => state || 0);
    const dispatch = useDispatch();

    return (
        <div className="wrapper">
            <p>Function: </p>
            <button className="button pls"
                onClick={() => dispatch(increment())}>plus</button>
            <span className="counterOutput">
                {counter}
            </span>
            <button className="button mns"
                onClick={() => dispatch(decrement())}>minus</button>
        </div>
    )
}

export default FunctionCounterComponent