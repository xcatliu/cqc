function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

function App() {
    return (
        <div>
        <Welcome name="Sara" />
        <Welcome name="Cahal" />
        <Welcome name="Edite" />
        <HelloWorld/>
        </div>
    );

    function HelloWorld() {
        return (
            <div>
                Hello World 1
                Hello World 2
                Hello World 3
                Hello World 4
                Hello World 5
                Hello World 6
                Hello World 7
                Hello World 8
                Hello World 9
            </div>
        );
    };

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
