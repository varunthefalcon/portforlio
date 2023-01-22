import { useState, useEffect } from "react";

const Randomizer = (props) => {

    const { height = 40, width = 40 } = props;

    const speed = 5;
    const frameRate = 100;

    const [top, setTop] = useState(Math.random() * window.innerHeight)
    const [left, setLeft] = useState(Math.random() * window.innerWidth)
    const [leftToggle, setLeftToggle] = useState((parseInt(Math.random() * 10)) % 2)
    const [topToggle, setTopToggle] = useState((parseInt(Math.random() * 10)) % 2)


    useEffect(() => {
        setTimeout(() => {
            setTop(top => {
                if ((top + (height * 2)) >= window.innerHeight) {
                    setTopToggle(true)
                }
                if ((top + (speed * 2)) < 0) {
                    setTopToggle(false)
                }
                if (topToggle) {
                    return top - speed
                } else {
                    return top + speed
                }
            })

        }, frameRate);
    }, [top])

    useEffect(() => {
        setTimeout(() => {
            setLeft(left => {
                if ((left + (width * 2)) >= window.innerWidth) {
                    setLeftToggle(true)
                }
                if ((left + (speed * 2)) < 0) {
                    setLeftToggle(false)
                }
                if (leftToggle) {
                    return left - speed
                } else {
                    return left + speed
                }
            })
        }, frameRate);
    }, [left])

    return <>
        <div style={{ top, left, width: width + 'px', height: height + 'px', position: 'absolute', }} className="floatItems">
            {props.children}
        </div>
    </>
};

export default Randomizer;