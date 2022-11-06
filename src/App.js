import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "jquery/dist/jquery";
import "bootstrap/dist/js/bootstrap";
import Question from "./features/question/Question";
import Demo from "./features/demo/Demo";

function App() {
    return (
        <div className="App">
            <header className="App-header"></header>
            <Demo />
        </div>
    );
}

export default App;
