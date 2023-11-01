import styles from "./Home.module.css";
import { BsSuitHeartFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { navOff } from "../../redux/redux";
import { useState, useEffect } from "react";
import moment from "moment";

export default function Home(): JSX.Element {
  const [heartOn, setHeartOn] = useState(false);
  const [day, setDay] = useState(
    moment(moment(new Date()).format("YYYY-MM-DD")).diff("2023-05-17", "days")
  );
  useEffect(() => {
    dispatch(navOff());
    document.body.style.overflow = "hidden";
  }, []);
  const dispatch = useDispatch();
  console.log(day);
  return (
    <div className={styles.home}>
      <motion.div
        initial={{ opacity: 0, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        whileHover={{
          scale: 1.2,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 10,
          },
        }}
        className={styles.heart}
        onMouseOver={() => {
          setHeartOn(true);
        }}
        onMouseOut={() => {
          setHeartOn(false);
        }}
      >
        <BsSuitHeartFill size={80} style={{ color: "rgb(240, 0, 0)" }} />
        <div className={heartOn ? `${styles.dayOn}` : `${styles.dayOff}`}>
          {day}
        </div>
      </motion.div>
    </div>
  );
}
