'use client'

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import styles from "./StarField.module.sass";

const StarField = () => {
    const sizes = useMemo(() => [3, 3, 2, 2, 2, 1, 1, 1, 1, 1], []);

    const randomPosition = useCallback((min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }, []);

    const [stars, setStars] = useState<React.ReactElement[]>([]);

    useEffect(() => {
        const newStars = [];
        for (let i = 0; i < 200; i++) {
            const top = randomPosition(1, 100);
            const left = randomPosition(1, 100);
            const random = Math.floor(Math.random() * sizes.length);
            const randomSize = sizes[random];
            let className = "";

            if (i <= 20) {
                className = styles.star1;
            } else if (i <= 40) {
                className = styles.star2;
            } else if (i <= 60) {
                className = styles.star3;
            } else if (i <= 80) {
                className = styles.star4;
            } else if (i <= 100) {
                className = styles.star5;
            }

            newStars.push(
                <div
                    key={i}
                    className={cn(className, styles.star)}
                    style={{
                        top: `${top}%`,
                        left: `${left}%`,
                        height: `${randomSize}px`,
                        width: `${randomSize}px`,
                    }}
                />
            );
        }
        setStars(newStars);
    }, [randomPosition, sizes]);

    return <div className={styles.stars}>{stars}</div>;
};

export default StarField;
