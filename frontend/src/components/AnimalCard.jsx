import React from "react";
import styles from "./AnimalCard.module.css";

const AnimalCard = ({ name, species, age }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.name}>{name}</h3> {/* Animal's name */}
            </div>
            <div className={styles.content}>
                <p className={styles.species}>
                    <strong>Species:</strong> {species} {/* Animal's species */}
                </p>
                <p className={styles.age}>
                    <strong>Age:</strong> {age} years old {/* Animal's age */}
                </p>
            </div>
        </div>
    );
};

export default AnimalCard;
