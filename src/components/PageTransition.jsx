import React from 'react';
import { motion } from "framer-motion";

export default function PageTransition(props) {
    const vh = document.documentElement.clientHeight
    const vw = document.documentElement.clientWidth
    const dur = props.animated/2
    return(
        <motion.div
            initial={{
                top: '0',
                left: '0',
                scale: dur*3     
            }}
            animate={{ 
                top: props.isPresent ? (vh > vw ? -vh/2 : -vw/2) : (vh > vw ? vh/2 : (vh - vw/2)),
                left: props.isPresent ? (vh > vw ? (vw - 0.5*vh) : vw/2) : (vh > vw ? -vh/2 : -vw/2),
                scale: 0, 
                transition: { duration: dur } 
            }}
            exit={{
                top: '0',
                left: '0',
                scale: dur*3    ,
                transition: { duration: dur }
            }}
            className="vitto"
        />
    )
}   
// a