import React, { useState, useEffect } from 'react';
import styles from './Sudoku.module.scss';
import { Grid } from "@mui/material";

function Sudoku() {
    // Define columns and rows
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // Function to generate a random number between 1 and 9
    const getRandomNumber = () => Math.floor(Math.random() * 9) + 1;

    // State to store the Sudoku grid
    const [grid, setGrid] = useState([]);

    // Function to initialize the Sudoku grid with random numbers
    const initializeGrid = () => {
        const newGrid = rows.map(row =>
            columns.map(column => ({
                row,
                column,
                value: getRandomNumber()
            }))
        );
        setGrid(newGrid);
    };

    // Use effect to initialize the grid when the component mounts
    useEffect(() => {
        initializeGrid();
    }, []);

    // Function to check if a number is valid in a given row
    const isNumberValidInRow = (number, row) => {
        return !grid[row - 1].some(cell => cell.value === number);
    };

    // Function to check if a number is valid in a given column
    const isNumberValidInColumn = (number, column) => {
        return !grid.some(row => row[column.charCodeAt(0) - 65].value === number);
    };

    // Function to check if a number is valid in a given square
    const isNumberValidInSquare = (number, row, column) => {
        const squareRow = Math.floor((row - 1) / 3) * 3;
        const squareColumn = Math.floor((column.charCodeAt(0) - 65) / 3) * 3;

        const numbersInSquare = [];
        for (let i = squareRow; i < squareRow + 3; i++) {
            for (let j = squareColumn; j < squareColumn + 3; j++) {
                const cellValue = grid[i][j].value;
                if (numbersInSquare.includes(cellValue)) {
                    return false; // If number is already in the square, it's invalid
                }
                if (cellValue !== '') {
                    numbersInSquare.push(cellValue);
                }
            }
        }
        return true;
    };

    // Function to validate if a number is valid in a cell
    const isNumberValid = (number, row, column) => {
        return (
            isNumberValidInRow(number, row) &&
            isNumberValidInColumn(number, column) &&
            isNumberValidInSquare(number, row, column)
        );
    };

    // Function to handle cell value change
    const handleCellValueChange = (newValue, row, column) => {
        if (isNumberValid(newValue, row, column)) {
            const updatedGrid = grid.map(gridRow =>
                gridRow.map(cell =>
                    cell.row === row && cell.column === column
                        ? { ...cell, value: newValue }
                        : cell
                )
            );
            setGrid(updatedGrid);
        } else {
            alert("Invalid move! This violates Sudoku rules.");
        }
    };

    return (
        <Grid className={styles.container} container spacing={2}>
            {grid.map(row => (
                <Grid key={row[0].row} className={styles.square} item xs={4}>
                    <Grid container spacing={1}>
                        {row.map(cell => (
                            <Grid key={cell.column} item xs={4}>
                                <div className={styles.cell}>
                                    <input
                                        type="text"
                                        value={cell.value}
                                        onChange={(e) => handleCellValueChange(e.target.value, cell.row, cell.column)}
                                        className={styles.input}
                                    />
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
}

export default Sudoku;