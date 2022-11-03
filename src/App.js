import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "jquery/dist/jquery";
import "bootstrap/dist/js/bootstrap";
import TestPage from "./TestPage/TestPage";
import QuestionPage from "./TestPage/QuestionPage";

function App() {
    return (
        <div className="App">
            <header className="App-header"></header>
            <QuestionPage />
        </div>
    );
}

export default App;
