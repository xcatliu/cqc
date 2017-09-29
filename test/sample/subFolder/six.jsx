function Welcome(props) {
    if (foo1) {
        console.log(foo1);
    }
    if (foo2) {
        console.log(foo2);
    }
    if (foo3) {
        console.log(foo3);
    }
    if (foo4) {
        console.log(foo4);
    }
    if (foo5) {
        console.log(foo5);
    }
    if (foo6) {
        console.log(foo6);
    }
    if (foo7) {
        console.log(foo7);
    }
    if (foo8) {
        console.log(foo8);
    }
    if (foo9) {
        console.log(foo9);
    }
    if (foo10) {
        console.log(foo10);
    }
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
        for (i = foo; i < bar; i++) {
            console.log(i);
        }
        for (i = foo; i < bar; i++) {
            console.log(i);
        }
        for (i = foo; i < bar; i++) {
            console.log(i);
        }
        for (i = foo; i < bar; i++) {
            console.log(i);
        }
        for (i = foo; i < bar; i++) {
            console.log(i);
        }
        for (i = foo; i < bar; i++) {
            console.log(i);
        }
        for (i = foo; i < bar; i++) {
            console.log(i);
        }
        for (i = foo; i < bar; i++) {
            console.log(i);
        }
        for (i = foo; i < bar; i++) {
            console.log(i);
        }
        for (i = foo; i < bar; i++) {
            console.log(i);
        }
        for (i = foo; i < bar; i++) {
            console.log(i);
        }
        for (i = foo; i < bar; i++) {
            console.log(i);
        }
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
