import { createRoot } from "react-dom/client";
import Sudoku from "./components/Sudoku/Sudoku";

const App = () => {
    return (
        <div>
            <h1>Sudoku</h1>
            <Sudoku />
        </div>
    );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
