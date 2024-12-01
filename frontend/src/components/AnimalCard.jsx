import React from "react";
import styles from "./AnimalCard.module.css";

const AnimalCard = ({ name, species, age }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.name}>{name}</h3>
            </div>
            <div className={styles.content}>
                <p className={styles.species}>
                    <strong>Species:</strong> {species}
                </p>
                <p className={styles.age}>
                    <strong>Age:</strong> {age} years old
                </p>
            </div>
        </div>
    );
};

export default AnimalCard;

