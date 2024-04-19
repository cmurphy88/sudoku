import { createRoot } from "react-dom/client";
import Sudoku from "./components/Sudoku/Sudoku";
import styles from './App.module.scss';

const App = () => {
    return (
        <div className={styles.app}>
            <h1 className={styles.title}>Sudoku</h1>
            <Sudoku />
        </div>
    );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
